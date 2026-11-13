<script setup>
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue'
import L from 'leaflet'
import { SITE_DATA } from '../config/siteData.js'
import { rutaCotizada, RUTA_DEMO, limpiarRutaCotizada } from '../config/rutaCotizada.js'

// ---------------------------------------------------------------------------
// Estado de la demo de rastreo
// ---------------------------------------------------------------------------
const folio = ref(SITE_DATA.rastreoSection.folioEjemplo)
const folioBuscado = ref(SITE_DATA.rastreoSection.folioEjemplo)
const folioValido = ref(true)
const reproduciendo = ref(false)
const progreso = ref(0.32) // 0..1 — arranca en "Cargando" para que la demo se vea viva
const velocidad = ref(1)
const verRutaDemo = ref(false)

let mapa = null
let marcadorCamion = null
let intervalo = null

// Ruta activa: la cotizada por el cliente, o la demo de CDMX
const rutaActiva = computed(() => {
  if (!verRutaDemo.value && rutaCotizada.origen && rutaCotizada.destino) {
    return { origen: rutaCotizada.origen, destino: rutaCotizada.destino }
  }
  return RUTA_DEMO
})
const usaRutaCotizada = computed(
  () => !verRutaDemo.value && !!(rutaCotizada.origen && rutaCotizada.destino)
)

// Puntos de la ruta: curva Bézier cuadrática para que no sea una línea recta
const puntosRuta = computed(() => {
  const o = rutaActiva.value.origen
  const d = rutaActiva.value.destino
  const mx = (o.lat + d.lat) / 2
  const my = (o.lng + d.lng) / 2
  const dx = d.lat - o.lat
  const dy = d.lng - o.lng
  const dist = Math.hypot(dx, dy) || 0.001
  const cx = mx + (-dy / dist) * dist * 0.25
  const cy = my + (dx / dist) * dist * 0.25
  const pts = []
  const N = 80
  for (let i = 0; i <= N; i++) {
    const t = i / N
    const lat = (1 - t) * (1 - t) * o.lat + 2 * (1 - t) * t * cx + t * t * d.lat
    const lng = (1 - t) * (1 - t) * o.lng + 2 * (1 - t) * t * cy + t * t * d.lng
    pts.push([lat, lng])
  }
  return pts
})

// Distancia total de la ruta (Haversine sobre la polilínea)
const distanciaKm = computed(() => {
  const R = 6371
  let total = 0
  const pts = puntosRuta.value
  for (let i = 1; i < pts.length; i++) {
    const dLat = (pts[i][0] - pts[i - 1][0]) * (Math.PI / 180)
    const dLon = (pts[i][1] - pts[i - 1][1]) * (Math.PI / 180)
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(pts[i - 1][0] * (Math.PI / 180)) *
        Math.cos(pts[i][0] * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2)
    total += R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  }
  return total
})

// Estado actual según el avance: 0 confirmado, 1 en camino, 2 cargando,
// 3 en tránsito, 4 entregado
const estadoActual = computed(() => {
  const p = progreso.value
  if (p >= 0.92) return 4
  if (p >= 0.38) return 3
  if (p >= 0.22) return 2
  if (p >= 0.08) return 1
  return 0
})

const estadosTimeline = computed(() =>
  SITE_DATA.rastreoSection.estados.map((e, i) => ({
    ...e,
    clase: i < estadoActual.value ? 'completado' : i === estadoActual.value ? 'actual' : 'pendiente'
  }))
)

const etaTexto = computed(() => {
  if (estadoActual.value >= 4) return 'Entregado'
  const restantes = distanciaKm.value * (1 - progreso.value)
  const minutos = Math.max(1, Math.round((restantes / 28) * 60))
  return `Llega en ~${minutos} min`
})
const kmRestantes = computed(() => (distanciaKm.value * (1 - progreso.value)).toFixed(1))

const posicionCamion = computed(() => {
  const pts = puntosRuta.value
  const idx = Math.min(pts.length - 1, Math.floor(progreso.value * (pts.length - 1)))
  return pts[idx]
})

// ---------------------------------------------------------------------------
// Mapa Leaflet
// ---------------------------------------------------------------------------
const iconoCamion = L.divIcon({
  className: 'leaflet-truck-marker',
  html: '<div class="truck-marker">🚛</div>',
  iconSize: [44, 44],
  iconAnchor: [22, 22]
})

const iconoPunto = (letra, color) =>
  L.divIcon({
    className: 'leaflet-route-marker',
    html: `<div class="route-marker" style="background:${color}">${letra}</div>`,
    iconSize: [30, 30],
    iconAnchor: [15, 15]
  })

const inicializarMapa = () => {
  nextTick(() => {
    if (mapa) {
      mapa.remove()
      mapa = null
      marcadorCamion = null
    }
    const o = rutaActiva.value.origen
    const d = rutaActiva.value.destino
    mapa = L.map('mapa-rastreo').setView([(o.lat + d.lat) / 2, (o.lng + d.lng) / 2], 13)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap'
    }).addTo(mapa)

    L.polyline(puntosRuta.value, { color: '#dc2626', weight: 4, opacity: 0.9 }).addTo(mapa)
    L.marker([o.lat, o.lng], { icon: iconoPunto('A', '#059669') })
      .addTo(mapa)
      .bindPopup(`<strong>Origen</strong><br>${o.texto}`)
    L.marker([d.lat, d.lng], { icon: iconoPunto('B', '#dc2626') })
      .addTo(mapa)
      .bindPopup(`<strong>Destino</strong><br>${d.texto}`)

    marcadorCamion = L.marker(posicionCamion.value, { icon: iconoCamion }).addTo(mapa)
    mapa.fitBounds(L.latLngBounds(puntosRuta.value).pad(0.25))
  })
}

watch(posicionCamion, (pos) => {
  if (marcadorCamion) marcadorCamion.setLatLng(pos)
})
watch(rutaActiva, () => {
  inicializarMapa()
})

// ---------------------------------------------------------------------------
// Simulación (play / pausa / velocidad / deslizador)
// ---------------------------------------------------------------------------
const avanzar = () => {
  progreso.value = Math.min(1, progreso.value + 0.002 * velocidad.value)
  if (progreso.value >= 1) pausar()
}

const reproducir = () => {
  if (progreso.value >= 1) progreso.value = 0.05
  reproduciendo.value = true
  clearInterval(intervalo)
  intervalo = setInterval(avanzar, 100)
}

const pausar = () => {
  reproduciendo.value = false
  clearInterval(intervalo)
  intervalo = null
}

const alternarReproduccion = () => {
  if (reproduciendo.value) pausar()
  else reproducir()
}

const buscarFolio = () => {
  const valor = folio.value.trim()
  if (valor.length < 4) {
    folioValido.value = false
    return
  }
  folioValido.value = true
  folioBuscado.value = valor.toUpperCase()
  progreso.value = 0.05
  reproducir()
}

const mostrarRutaDemo = () => {
  verRutaDemo.value = true
  progreso.value = 0.32
  inicializarMapa()
}

const mostrarRutaCotizada = () => {
  verRutaDemo.value = false
  progreso.value = 0.32
  inicializarMapa()
}

onMounted(() => {
  inicializarMapa()
})

onUnmounted(() => {
  pausar()
  if (mapa) {
    mapa.remove()
    mapa = null
  }
})
</script>

<template>
  <section class="tracking-section">
    <div class="container">
      <div class="header-block">
        <span class="tagline">{{ SITE_DATA.rastreoSection.tagline }}</span>
        <h2>{{ SITE_DATA.rastreoSection.titulo }}</h2>
        <p class="section-desc">{{ SITE_DATA.rastreoSection.descripcion }}</p>
        <p class="demo-note">🧪 {{ SITE_DATA.rastreoSection.notaDemo }}</p>
      </div>

      <!-- Buscador de folio -->
      <form class="folio-form" @submit.prevent="buscarFolio">
        <input
          v-model="folio"
          type="text"
          placeholder="Escribe tu folio, ej. MX-2026-0042"
          aria-label="Folio de servicio"
        />
        <button type="submit" class="btn-primary">RASTREAR 📍</button>
      </form>
      <p v-if="!folioValido" class="folio-error">
        Escribe un folio válido (mínimo 4 caracteres). Prueba con el de ejemplo:
        {{ SITE_DATA.rastreoSection.folioEjemplo }}
      </p>

      <div class="tracking-grid">
        <!-- Mapa con la ruta y el camión -->
        <div class="map-card">
          <div id="mapa-rastreo" class="tracking-map"></div>
          <div class="route-labels">
            <span><strong class="punto-a">A</strong> {{ rutaActiva.origen.texto }}</span>
            <span><strong class="punto-b">B</strong> {{ rutaActiva.destino.texto }}</span>
          </div>
          <p v-if="usaRutaCotizada" class="route-chip">
            ✅ Esta es la ruta de tu última cotización.
            <button type="button" class="link-btn" @click="mostrarRutaDemo">Ver ruta demo</button>
          </p>
          <p v-else-if="rutaCotizada.origen" class="route-chip">
            Estás viendo la ruta demo.
            <button type="button" class="link-btn" @click="mostrarRutaCotizada">
              Usar mi ruta cotizada
            </button>
            <button type="button" class="link-btn" @click="limpiarRutaCotizada">Limpiar</button>
          </p>
        </div>

        <!-- Panel de estado -->
        <aside class="status-panel">
          <div class="folio-card">
            <span class="folio-label">FOLIO DE SERVICIO</span>
            <strong class="folio-numero">{{ folioBuscado }}</strong>
            <div class="folio-datos">
              <div><span>Unidad:</span> Camión mediano · 3.5 t · GPS activo</div>
              <div><span>Servicio:</span> {{ rutaCotizada.servicio || 'Mudanza Residencial Completa' }}</div>
              <div><span>Distancia:</span> {{ distanciaKm.toFixed(1) }} km · faltan {{ kmRestantes }} km</div>
            </div>
          </div>

          <div class="eta-box">
            <span class="eta-estado">{{ estadosTimeline[estadoActual].titulo }}</span>
            <strong class="eta-tiempo">{{ etaTexto }}</strong>
          </div>

          <!-- Línea de tiempo de estados -->
          <ol class="timeline">
            <li
              v-for="estado in estadosTimeline"
              :key="estado.id"
              :class="estado.clase"
            >
              <span class="timeline-dot">{{ estado.clase === 'completado' ? '✓' : '' }}</span>
              <div>
                <strong>{{ estado.titulo }}</strong>
                <p>{{ estado.descripcion }}</p>
              </div>
            </li>
          </ol>

          <!-- Controles de la simulación -->
          <div class="sim-controls">
            <button type="button" class="btn-sim" @click="alternarReproduccion">
              {{ reproduciendo ? '⏸ Pausar recorrido' : '▶ Reproducir recorrido' }}
            </button>
            <div class="speed-row">
              <label>Velocidad:</label>
              <button
                v-for="v in [1, 2, 4]"
                :key="v"
                type="button"
                :class="['speed-btn', { activo: velocidad === v }]"
                @click="velocidad = v"
              >
                {{ v }}x
              </button>
            </div>
            <input
              v-model.number="progreso"
              type="range"
              min="0"
              max="1"
              step="0.01"
              class="progress-slider"
              aria-label="Avance del recorrido"
            />
            <p class="sim-note">Desliza para ver cualquier momento del recorrido.</p>
          </div>
        </aside>
      </div>
    </div>
  </section>
</template>

<style scoped>
.tracking-section {
  padding: 5.5rem 2rem;
  background-color: #ffffff;
}

.container {
  max-width: 1250px;
  margin: 0 auto;
}

.header-block {
  text-align: center;
  max-width: 750px;
  margin: 0 auto 2.5rem auto;
}

.tagline {
  color: var(--color-primary);
  font-weight: 800;
  font-size: 0.8rem;
  letter-spacing: 0.1em;
  display: block;
  margin-bottom: 0.6rem;
}

h2 {
  font-size: 2.8rem;
  line-height: 1.18;
  color: var(--color-dark);
  margin-bottom: 1rem;
}

.section-desc {
  color: var(--color-text-muted);
  font-size: 1.05rem;
  line-height: 1.6;
}

.demo-note {
  margin-top: 1rem;
  background: #fffbeb;
  border: 1px solid #fde68a;
  color: #92400e;
  font-size: 0.88rem;
  line-height: 1.55;
  padding: 0.8rem 1.1rem;
  border-radius: var(--radius-md);
  text-align: left;
}

.folio-form {
  display: flex;
  gap: 0.8rem;
  max-width: 640px;
  margin: 0 auto 0.6rem auto;
}

.folio-form input {
  flex: 1;
  padding: 0.9rem 1.1rem;
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-md);
  font-size: 1rem;
  font-family: var(--font-body);
  background: #f8fafc;
  color: var(--color-dark);
  text-transform: uppercase;
}

.folio-form input:focus {
  outline: none;
  border-color: var(--color-primary);
  background: #ffffff;
  box-shadow: 0 0 0 4px rgba(220, 38, 38, 0.1);
}

.folio-error {
  max-width: 640px;
  margin: 0 auto 1rem auto;
  color: #b91c1c;
  font-size: 0.88rem;
  font-weight: 600;
}

.tracking-grid {
  display: grid;
  grid-template-columns: 1.7fr 1fr;
  gap: 1.8rem;
  margin-top: 2rem;
  align-items: start;
}

.map-card {
  background: var(--color-bg-light);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: 1rem;
}

.tracking-map {
  height: 480px;
  width: 100%;
  border-radius: var(--radius-lg);
  z-index: 1;
}

.route-labels {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  padding: 1rem 0.4rem 0.2rem 0.4rem;
  font-size: 0.88rem;
  color: var(--color-text);
}

.punto-a,
.punto-b {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  color: #fff;
  font-size: 0.72rem;
  margin-right: 0.35rem;
}

.punto-a {
  background: #059669;
}

.punto-b {
  background: #dc2626;
}

.route-chip {
  padding: 0.8rem 0.4rem 0.2rem 0.4rem;
  font-size: 0.88rem;
  color: var(--color-text-muted);
}

.link-btn {
  background: none;
  border: none;
  color: var(--color-primary);
  font-weight: 700;
  font-size: 0.88rem;
  cursor: pointer;
  padding: 0;
  margin-left: 0.4rem;
  text-decoration: underline;
}

.status-panel {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.folio-card {
  background: var(--color-dark);
  color: #ffffff;
  border-radius: var(--radius-lg);
  padding: 1.4rem;
}

.folio-label {
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  color: #94a3b8;
  display: block;
  margin-bottom: 0.2rem;
}

.folio-numero {
  font-size: 1.5rem;
  font-family: var(--font-title);
  letter-spacing: 0.02em;
}

.folio-datos {
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  font-size: 0.88rem;
  color: #e2e8f0;
  border-top: 1px solid rgba(255, 255, 255, 0.15);
  padding-top: 1rem;
}

.folio-datos span {
  color: #94a3b8;
  font-weight: 700;
}

.eta-box {
  background: #ecfdf5;
  border: 1px solid #a7f3d0;
  border-radius: var(--radius-lg);
  padding: 1.1rem 1.4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.eta-estado {
  font-weight: 700;
  color: #065f46;
  font-size: 0.95rem;
}

.eta-tiempo {
  font-size: 1.25rem;
  color: #065f46;
  font-family: var(--font-title);
  white-space: nowrap;
}

.timeline {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0;
}

.timeline li {
  display: flex;
  gap: 0.9rem;
  padding: 0.7rem 0;
  position: relative;
}

.timeline li:not(:last-child)::before {
  content: '';
  position: absolute;
  left: 14px;
  top: 34px;
  bottom: -4px;
  width: 2px;
  background: var(--color-border);
}

.timeline li.completado:not(:last-child)::before {
  background: #10b981;
}

.timeline-dot {
  flex-shrink: 0;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.85rem;
  font-weight: 800;
  color: #fff;
  background: #cbd5e1;
  border: 2px solid #fff;
  box-shadow: var(--shadow-sm);
  z-index: 1;
}

.timeline li.completado .timeline-dot {
  background: #10b981;
}

.timeline li.actual .timeline-dot {
  background: var(--color-primary);
  animation: pulse-dot 1.6s ease-in-out infinite;
}

@keyframes pulse-dot {
  0%, 100% { box-shadow: 0 0 0 0 rgba(220, 38, 38, 0.35); }
  50% { box-shadow: 0 0 0 7px rgba(220, 38, 38, 0); }
}

.timeline li strong {
  font-size: 0.95rem;
  color: var(--color-dark);
}

.timeline li p {
  font-size: 0.85rem;
  color: var(--color-text-muted);
  margin-top: 0.1rem;
}

.timeline li.pendiente {
  opacity: 0.55;
}

.sim-controls {
  background: var(--color-bg-light);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 1.2rem;
}

.btn-sim {
  width: 100%;
  background: var(--color-dark);
  color: #fff;
  border: none;
  padding: 0.85rem;
  font-weight: 700;
  font-size: 0.95rem;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-sim:hover {
  background: var(--color-primary);
}

.speed-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
  font-size: 0.88rem;
  font-weight: 700;
  color: var(--color-dark);
}

.speed-btn {
  border: 1.5px solid var(--color-border);
  background: #fff;
  border-radius: 20px;
  padding: 0.3rem 0.85rem;
  font-weight: 700;
  font-size: 0.85rem;
  cursor: pointer;
  color: var(--color-text-muted);
}

.speed-btn.activo {
  background: var(--color-primary);
  border-color: var(--color-primary);
  color: #fff;
}

.progress-slider {
  width: 100%;
  margin-top: 1rem;
  accent-color: var(--color-primary);
}

.sim-note {
  font-size: 0.8rem;
  color: var(--color-text-muted);
  margin-top: 0.5rem;
}

@media (max-width: 992px) {
  .tracking-grid {
    grid-template-columns: 1fr;
  }

  .tracking-map {
    height: 380px;
  }

  h2 {
    font-size: 2.2rem;
  }

  .folio-form {
    flex-direction: column;
  }
}
</style>

<style>
/* Marcadores del mapa de rastreo (sin scoped: Leaflet los pone fuera del componente) */
.truck-marker {
  font-size: 2rem;
  line-height: 1;
  filter: drop-shadow(0 4px 6px rgba(15, 23, 42, 0.35));
}

.route-marker {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  color: #fff;
  font-weight: 800;
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #fff;
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.3);
}
</style>
