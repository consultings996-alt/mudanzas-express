<script setup>
import { ref, nextTick, onUnmounted } from 'vue'
import L from 'leaflet'
import { SITE_DATA } from '../config/siteData.js'

const nombre = ref('')
const telefono = ref('')
const origenText = ref('')
const destinoText = ref('')
const servicio = ref(SITE_DATA.hero.formulario.opcionesServicio[0])
const detalles = ref('')

const mostrarMapaModal = ref(false)
const cargandoGPS = ref(false)
const campoActivo = ref('') 
let mapaModalInstancia = null
let marcadorModalInstancia = null

const latActual = ref(19.432608)
const lngActual = ref(-99.133208)

const origenCoords = ref(null)
const destinoCoords = ref(null)
const distanciaKm = ref(null)

// Icono vectorial SVG profesional para el marcador GPS en Leaflet
const vectorPinIcon = L.divIcon({
  className: 'leaflet-vector-pin-container',
  html: `
    <div class="vector-pin-wrapper">
      <svg width="40" height="52" viewBox="0 0 40 52" fill="none" xmlns="http://www.w3.org/2000/svg" class="vector-pin-svg">
        <path d="M20 0C8.9543 0 0 8.9543 0 20C0 33.5 20 52 20 52C20 52 40 33.5 40 20C40 8.9543 31.0457 0 20 0Z" fill="url(#pinGrad)"/>
        <circle cx="20" cy="19" r="8" fill="#FFFFFF"/>
        <circle cx="20" cy="19" r="4.5" fill="#DC2626"/>
        <defs>
          <linearGradient id="pinGrad" x1="20" y1="0" x2="20" y2="52" gradientUnits="userSpaceOnUse">
            <stop stop-color="#EF4444"/>
            <stop offset="1" stop-color="#B91C1C"/>
          </linearGradient>
        </defs>
      </svg>
      <div class="vector-pin-shadow"></div>
    </div>
  `,
  iconSize: [40, 52],
  iconAnchor: [20, 52],
  popupAnchor: [0, -52]
})

const calcularDistancia = (lat1, lon1, lat2, lon2) => {
  const R = 6371; 
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return (R * c).toFixed(2);
}

const abrirSelectorMapa = (tipo) => {
  campoActivo.value = tipo
  mostrarMapaModal.value = true
  cargandoGPS.value = true

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        latActual.value = position.coords.latitude
        lngActual.value = position.coords.longitude
        cargandoGPS.value = false
        inicializarMapaModal()
      },
      (error) => {
        cargandoGPS.value = false
        inicializarMapaModal()
      },
      { enableHighAccuracy: true, timeout: 6000, maximumAge: 0 }
    )
  } else {
    cargandoGPS.value = false
    inicializarMapaModal()
  }
}

const inicializarMapaModal = () => {
  nextTick(() => {
    if (mapaModalInstancia) {
      mapaModalInstancia.remove()
    }
    mapaModalInstancia = L.map('mapa-modal-contenedor').setView([latActual.value, lngActual.value], 16)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap'
    }).addTo(mapaModalInstancia)

    marcadorModalInstancia = L.marker([latActual.value, lngActual.value], {
      draggable: true,
      icon: vectorPinIcon
    }).addTo(mapaModalInstancia)

    marcadorModalInstancia.on('dragend', () => {
      const posicion = marcadorModalInstancia.getLatLng()
      latActual.value = posicion.lat
      lngActual.value = posicion.lng
    })

    mapaModalInstancia.on('click', (e) => {
      latActual.value = e.latlng.lat
      lngActual.value = e.latlng.lng
      if (marcadorModalInstancia) {
        marcadorModalInstancia.setLatLng(e.latlng)
      }
    })
  })
}

const confirmarUbicacion = async () => {
  let direccionEstablecida = false
  let textoFinal = ''

  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 1800)
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latActual.value}&lon=${lngActual.value}&addressdetails=1`
    
    const respuesta = await fetch(url, {
      signal: controller.signal,
      headers: { 'Accept-Language': 'es', 'User-Agent': 'MudanzasExpressApp/3.0' }
    })
    
    clearTimeout(timeoutId)
    const datos = await respuesta.json()
    
    if (datos && datos.address) {
      const a = datos.address
      const calle = a.road || a.pedestrian || ''
      const numero = a.house_number || ''
      const colonia = a.suburb || a.neighbourhood || a.quarter || ''
      const ciudad = a.city || a.town || a.county || 'CDMX'
      if (calle) {
        textoFinal = `${calle} ${numero ? 'No. ' + numero : ''}${colonia ? ', Col. ' + colonia : ''}, ${ciudad}`
        direccionEstablecida = true
      }
    }
  } catch (error) {
    console.warn("Respaldo de dirección activado")
  } finally {
    if (!direccionEstablecida) {
      textoFinal = `📍 Coordenadas (${latActual.value.toFixed(4)}, ${lngActual.value.toFixed(4)})`
    }

    if (campoActivo.value === 'origen') {
      origenText.value = textoFinal
      origenCoords.value = { lat: latActual.value, lng: lngActual.value }
    } else {
      destinoText.value = textoFinal
      destinoCoords.value = { lat: latActual.value, lng: lngActual.value }
    }

    if (origenCoords.value && destinoCoords.value) {
      distanciaKm.value = calcularDistancia(
        origenCoords.value.lat, origenCoords.value.lng,
        destinoCoords.value.lat, destinoCoords.value.lng
      )
    }
    cerrarModal()
  }
}

const cerrarModal = () => {
  mostrarMapaModal.value = false
  if (mapaModalInstancia) {
    mapaModalInstancia.remove()
    mapaModalInstancia = null
  }
}

onUnmounted(() => {
  if (mapaModalInstancia) {
    mapaModalInstancia.remove()
    mapaModalInstancia = null
  }
})

const enviarCotizacion = () => {
  const linkOrigen = origenCoords.value ? `https://www.google.com/maps/search/?api=1&query=${origenCoords.value.lat},${origenCoords.value.lng}` : 'No especificado'
  const linkDestino = destinoCoords.value ? `https://www.google.com/maps/search/?api=1&query=${destinoCoords.value.lat},${destinoCoords.value.lng}` : 'No especificado'
  const textoDistancia = distanciaKm.value ? `${distanciaKm.value} km aprox.` : 'No calculada'
  
  const mensaje = `¡Nueva solicitud de cotización!\n\n` +
                  `👤 *Cliente:* ${nombre.value}\n` +
                  `📞 *WhatsApp:* ${telefono.value}\n` +
                  `🛫 *Origen:* ${origenText.value}\n` +
                  `📍 *Mapa Origen:* ${linkOrigen}\n\n` +
                  `🛬 *Destino:* ${destinoText.value}\n` +
                  `📍 *Mapa Destino:* ${linkDestino}\n\n` +
                  `📏 *Distancia estimada:* ${textoDistancia}\n` +
                  `📦 *Servicio:* ${servicio.value}\n` +
                  `📝 *Detalles:* ${detalles.value || 'Ninguno'}`

  window.open(`https://wa.me/${SITE_DATA.empresa.whatsappNumero}?text=${encodeURIComponent(mensaje)}`, '_blank')
}
</script>

<template>
  <section class="hero-section">
    <div class="hero-container">
      <!-- Columna Izquierda: Mensaje principal y propuesta de valor -->
      <div class="hero-left">
        <div class="tagline-badge">
          <span>{{ SITE_DATA.hero.tagline }}</span>
        </div>

        <h1 class="hero-title">
          {{ SITE_DATA.hero.tituloParte1 }}
          <span class="highlight">{{ SITE_DATA.hero.tituloDestacado }}</span>
        </h1>

        <p class="description">
          {{ SITE_DATA.hero.descripcion }}
        </p>
        
        <!-- Píldora de Calificación y Prueba Social -->
        <div class="rating-box">
          <div class="score-pill">
            <span class="score-number">{{ SITE_DATA.hero.calificacionScore }}</span>
            <div class="stars-col">
              <span class="stars">{{ SITE_DATA.hero.estrellas }}</span>
              <span class="reviews-count">{{ SITE_DATA.hero.resenasTexto }}</span>
            </div>
          </div>
          <div class="quality-badge">
            <span class="badge-icon">🛡️</span>
            <span>{{ SITE_DATA.hero.mencionCalidad }}</span>
          </div>
        </div>
      </div>

      <!-- Columna Derecha: Tarjeta de Formulario Interactivo -->
      <div class="hero-right">
        <div class="form-card">
          <div class="form-header">
            <h3>{{ SITE_DATA.hero.formulario.titulo }}</h3>
            <p class="form-subtitle">{{ SITE_DATA.hero.formulario.subtitulo }}</p>
          </div>
          
          <form @submit.prevent="enviarCotizacion" class="quote-form">
            <div class="form-group">
              <label>{{ SITE_DATA.hero.formulario.labelNombre }}</label>
              <input
                v-model="nombre"
                type="text"
                :placeholder="SITE_DATA.hero.formulario.placeholderNombre"
                required
              >
            </div>

            <div class="form-group">
              <label>{{ SITE_DATA.hero.formulario.labelTelefono }}</label>
              <input
                v-model="telefono"
                type="tel"
                :placeholder="SITE_DATA.hero.formulario.placeholderTelefono"
                required
              >
            </div>

            <div class="split-row">
              <div class="form-group" style="flex:1">
                <label>{{ SITE_DATA.hero.formulario.labelOrigen }}</label>
                <div class="map-input-wrapper">
                  <input
                    v-model="origenText"
                    type="text"
                    :placeholder="SITE_DATA.hero.formulario.placeholderOrigen"
                    @click="abrirSelectorMapa('origen')"
                    readonly
                    required
                  >
                  <span class="input-icon">🗺️</span>
                </div>
              </div>

              <div class="form-group" style="flex:1">
                <label>{{ SITE_DATA.hero.formulario.labelDestino }}</label>
                <div class="map-input-wrapper">
                  <input
                    v-model="destinoText"
                    type="text"
                    :placeholder="SITE_DATA.hero.formulario.placeholderDestino"
                    @click="abrirSelectorMapa('destino')"
                    readonly
                    required
                  >
                  <span class="input-icon">📍</span>
                </div>
              </div>
            </div>

            <!-- Insignia de distancia en Km si ambos se calcularon -->
            <Transition name="fade">
              <div v-if="distanciaKm" class="distance-badge">
                <span class="badge-icon">DISTANCIA ESTIMADA</span>
                <span><strong>{{ distanciaKm }} km</strong></span>
              </div>
            </Transition>

            <div class="form-group">
              <label>{{ SITE_DATA.hero.formulario.labelServicio }}</label>
              <select v-model="servicio">
                <option v-for="(opc, idx) in SITE_DATA.hero.formulario.opcionesServicio" :key="idx" :value="opc">
                  {{ opc }}
                </option>
              </select>
            </div>

            <div class="form-group">
              <label>{{ SITE_DATA.hero.formulario.labelDetalles }}</label>
              <textarea
                v-model="detalles"
                :placeholder="SITE_DATA.hero.formulario.placeholderDetalles"
              ></textarea>
            </div>

            <button type="submit" class="btn-submit">
              {{ SITE_DATA.hero.formulario.botonTexto }}
            </button>
            <p class="form-footer-note">{{ SITE_DATA.hero.formulario.notaPie }}</p>
          </form>
        </div>
      </div>
    </div>

    <!-- Modal Interactivo para Selección de Dirección con Mapa Leaflet -->
    <Transition name="fade">
      <div v-if="mostrarMapaModal" class="modal-overlay" @click.self="cerrarModal">
        <div class="modal-card">
          <div class="modal-header">
            <h4>Fijar dirección de {{ campoActivo === 'origen' ? 'Origen' : 'Destino' }}</h4>
            <button type="button" class="close-btn" @click="cerrarModal">×</button>
          </div>

          <div class="modal-body">
            <div v-if="cargandoGPS" class="loader">
              <div class="spinner"></div>
              <span>Obteniendo tu ubicación actual por GPS...</span>
            </div>
            <div id="mapa-modal-contenedor" class="map-render"></div>
            <p class="map-tip">💡 Puedes arrastrar el marcador rojo o hacer clic sobre el mapa para fijar la ubicación exacta.</p>
          </div>

          <div class="modal-footer">
            <p class="coordenadas-info">
              Lat: {{ latActual.toFixed(4) }}, Lng: {{ lngActual.toFixed(4) }}
            </p>
            <button type="button" class="btn-confirmar" @click="confirmarUbicacion">
              CONFIRMAR UBICACIÓN
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </section>
</template>

<style scoped>
.hero-section {
  flex: 1;
  display: flex;
  align-items: center;
  background: linear-gradient(180deg, var(--color-bg-light) 0%, #ffffff 100%);
  padding: 4.5rem 5%;
  box-sizing: border-box;
  width: 100%;
  position: relative;
}

.hero-container {
  max-width: 1300px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  gap: 3.5rem;
  align-items: center;
}

.hero-left {
  flex: 1.1;
  min-width: 320px;
}

.hero-right {
  flex: 0.9;
  min-width: 320px;
}

.tagline-badge {
  display: inline-block;
  background-color: var(--color-primary-light);
  color: var(--color-primary);
  font-size: 0.8rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  padding: 0.4rem 1rem;
  border-radius: 50px;
  margin-bottom: 1.2rem;
  border: 1px solid rgba(220, 38, 38, 0.15);
}

.hero-title {
  font-size: 3.4rem;
  line-height: 1.12;
  margin-bottom: 1.2rem;
  color: var(--color-dark);
}

.hero-title .highlight {
  color: var(--color-primary);
  position: relative;
  font-style: italic;
}

.description {
  color: var(--color-text-muted);
  line-height: 1.7;
  margin-bottom: 2.2rem;
  font-size: 1.1rem;
  max-width: 580px;
}

.rating-box {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1.5rem;
}

.score-pill {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  background: #ffffff;
  padding: 0.6rem 1.2rem;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--color-border);
}

.score-number {
  font-size: 1.6rem;
  font-weight: 800;
  color: var(--color-dark);
  font-family: var(--font-title);
}

.stars-col {
  display: flex;
  flex-direction: column;
}

.stars {
  color: #f59e0b;
  letter-spacing: 2px;
  font-size: 0.9rem;
}

.reviews-count {
  font-size: 0.78rem;
  color: var(--color-text-muted);
  font-weight: 600;
}

.quality-badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--color-dark);
  background: rgba(16, 185, 129, 0.1);
  padding: 0.6rem 1.1rem;
  border-radius: var(--radius-lg);
  border: 1px solid rgba(16, 185, 129, 0.2);
}

.form-card {
  background: #ffffff;
  padding: 2.2rem;
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-xl);
  border: 1px solid rgba(226, 232, 240, 0.8);
  transition: transform 0.3s ease;
}

.form-header h3 {
  font-size: 1.7rem;
  margin-bottom: 0.3rem;
}

.form-subtitle {
  color: var(--color-text-muted);
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
}

.form-group {
  margin-bottom: 1.1rem;
}

.form-group label {
  display: block;
  font-size: 0.75rem;
  font-weight: 800;
  color: var(--color-dark);
  margin-bottom: 0.4rem;
  letter-spacing: 0.04em;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 0.85rem 1rem;
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-md);
  box-sizing: border-box;
  font-size: 0.95rem;
  font-family: var(--font-body);
  background: #f8fafc;
  color: var(--color-dark);
  transition: all 0.2s ease;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--color-primary);
  background: #ffffff;
  box-shadow: 0 0 0 4px rgba(220, 38, 38, 0.1);
}

.map-input-wrapper {
  position: relative;
  cursor: pointer;
}

.map-input-wrapper input {
  cursor: pointer;
  padding-right: 2.5rem;
  text-overflow: ellipsis;
}

.input-icon {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  font-size: 1rem;
}

.split-row {
  display: flex;
  gap: 1rem;
}

.distance-badge {
  background-color: #ecfdf5;
  color: #065f46;
  padding: 0.8rem;
  border-radius: var(--radius-md);
  margin-bottom: 1.1rem;
  font-size: 0.88rem;
  border: 1px solid #a7f3d0;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.form-group textarea {
  height: 70px;
  resize: none;
}

.btn-submit {
  width: 100%;
  background: linear-gradient(135deg, var(--color-primary) 0%, #b91c1c 100%);
  color: white;
  border: none;
  padding: 1.1rem;
  font-weight: 800;
  font-size: 1rem;
  border-radius: var(--radius-md);
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(220, 38, 38, 0.35);
  transition: all 0.25s ease;
  letter-spacing: 0.02em;
}

.btn-submit:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(220, 38, 38, 0.45);
}

.form-footer-note {
  text-align: center;
  color: var(--color-text-muted);
  font-size: 0.8rem;
  margin-top: 0.9rem;
  font-weight: 600;
}

/* Modal del Mapa */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(15, 23, 42, 0.65);
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 1rem;
}

.modal-card {
  background: white;
  border-radius: var(--radius-xl);
  width: 100%;
  max-width: 650px;
  box-shadow: var(--shadow-xl);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.modal-header {
  padding: 1.2rem 1.5rem;
  border-bottom: 1px solid var(--color-border);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h4 {
  margin: 0;
  font-size: 1.2rem;
  color: var(--color-dark);
}

.close-btn {
  background: #f1f5f9;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #64748b;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-body {
  position: relative;
  height: 360px;
  background: #e2e8f0;
}

.map-render {
  width: 100%;
  height: 100%;
}

.map-tip {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(15, 23, 42, 0.85);
  color: white;
  padding: 0.4rem 1rem;
  border-radius: 20px;
  font-size: 0.78rem;
  z-index: 1000;
  white-space: nowrap;
  pointer-events: none;
}

.loader {
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  font-weight: 700;
  z-index: 1001;
  color: var(--color-dark);
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid var(--color-border);
  border-top-color: var(--color-primary);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.modal-footer {
  padding: 1.1rem 1.5rem;
  background: #ffffff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid var(--color-border);
}

.btn-confirmar {
  background: var(--color-dark);
  color: white;
  padding: 0.85rem 1.6rem;
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  font-weight: 800;
  font-size: 0.9rem;
  transition: all 0.2s ease;
}

.btn-confirmar:hover {
  background: var(--color-primary);
}

.coordenadas-info {
  font-size: 0.82rem;
  color: var(--color-text-muted);
  font-weight: 600;
}

/* Estilos de la Píldora Vectorial SVG de Leaflet */
:deep(.leaflet-vector-pin-container) {
  background: transparent !important;
  border: none !important;
}

:deep(.vector-pin-wrapper) {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: grab;
  transition: transform 0.2s ease;
}

:deep(.vector-pin-wrapper:active) {
  cursor: grabbing;
  transform: scale(1.15) translateY(-6px);
}

:deep(.vector-pin-svg) {
  display: block;
  filter: drop-shadow(0 6px 12px rgba(220, 38, 38, 0.45));
  animation: bounce-pin 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

:deep(.vector-pin-shadow) {
  width: 18px;
  height: 6px;
  background: rgba(15, 23, 42, 0.35);
  border-radius: 50%;
  margin-top: -4px;
  filter: blur(2px);
}

@keyframes bounce-pin {
  0% { transform: translateY(-24px); opacity: 0; }
  60% { transform: translateY(4px); opacity: 1; }
  100% { transform: translateY(0); }
}

@media (max-width: 992px) {
  .hero-section {
    padding: 2.5rem 4%;
  }

  .hero-title {
    font-size: 2.5rem;
  }

  .split-row {
    flex-direction: column;
    gap: 0;
  }

  .modal-card {
    max-width: 95%;
  }

  .map-tip {
    display: none;
  }
}
</style>