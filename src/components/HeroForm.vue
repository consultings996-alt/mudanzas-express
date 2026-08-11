<script setup>
import { ref, nextTick } from 'vue'
import L from 'leaflet'

const nombre = ref('')
const telefono = ref('')
const origenText = ref('')
const destinoText = ref('')
const servicio = ref('Mudanza Residencial Completa')
const detalles = ref('')

// Control del mapa modal y selección de campo activo
const mostrarMapaModal = ref(false)
const cargandoGPS = ref(false)
const campoActivo = ref('') 
let mapaInstancia = null
let marcadorInstancia = null

// Coordenadas reactivas para el pin móvil (uso temporal en el modal)
const latActual = ref(19.432608)
const lngActual = ref(-99.133208)

// NUEVO: Guardar coordenadas exactas de origen y destino para el cálculo
const origenCoords = ref(null)
const destinoCoords = ref(null)
const distanciaKm = ref(null)

// NUEVO: Función matemática para calcular distancia en KM (Fórmula de Haversine)
const calcularDistancia = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radio de la Tierra en km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return (R * c).toFixed(2); // Retorna la distancia con 2 decimales
}

// FUNCIÓN AL CLICKEAR LAS CAJAS DE TEXTO
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
        inicializarMapa()
      },
      (error) => {
        console.warn("GPS no disponible, usando centro por defecto:", error.message)
        cargandoGPS.value = false
        inicializarMapa()
      },
      { enableHighAccuracy: true, timeout: 8000, maximumAge: 0 }
    )
  } else {
    cargandoGPS.value = false
    inicializarMapa()
  }
}

const inicializarMapa = () => {
  nextTick(() => {
    if (mapaInstancia) {
      mapaInstancia.remove()
    }

    mapaInstancia = L.map('mapa-contenedor').setView([latActual.value, lngActual.value], 17)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap'
    }).addTo(mapaInstancia)

    marcadorInstancia = L.marker([latActual.value, lngActual.value], { draggable: true }).addTo(mapaInstancia)

    marcadorInstancia.on('dragend', () => {
      const posicion = marcadorInstancia.getLatLng()
      latActual.value = posicion.lat
      lngActual.value = posicion.lng
    })
  })
}

// CONFIRMAR LA UBICACIÓN
const confirmarUbicacion = async () => {
  let direccionEstablecida = false
  let textoFinal = ''

  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 1500)

    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latActual.value}&lon=${lngActual.value}&addressdetails=1`
    
    const respuesta = await fetch(url, {
      signal: controller.signal,
      headers: {
        'Accept-Language': 'es',
        'User-Agent': 'MudanzasExpressAppCDMX/3.0 (soporte@mudanzasexpress.mx)'
      }
    })
    
    clearTimeout(timeoutId)
    const datos = await respuesta.json()
    
    if (datos && datos.address) {
      const a = datos.address
      const calle = a.road || ''
      const numero = a.house_number || 'S/N'
      const colonia = a.suburb || a.neighbourhood || a.village || ''
      const ciudad = a.city || a.town || 'CDMX'
      
      if (calle) {
        textoFinal = `${calle} No. ${numero}, Col. ${colonia}, ${ciudad}`
        direccionEstablecida = true
      } else if (datos.display_name) {
        textoFinal = datos.display_name.split(',').slice(0, 3).join(',')
        direccionEstablecida = true
      }
    }
  } catch (error) {
    console.warn("Servidor ocupado. Aplicando respaldo inteligente.")
  } finally {
    if (!direccionEstablecida) {
      textoFinal = `📍 Ubicación Confirmada (Mapa)`
    }

    // ASIGNAR TEXTO Y COORDENADAS AL CAMPO CORRESPONDIENTE
    if (campoActivo.value === 'origen') {
      origenText.value = textoFinal
      origenCoords.value = { lat: latActual.value, lng: lngActual.value }
    } else {
      destinoText.value = textoFinal
      destinoCoords.value = { lat: latActual.value, lng: lngActual.value }
    }

    // SI YA TENEMOS AMBAS COORDENADAS, CALCULAMOS LA DISTANCIA
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
  if (mapaInstancia) {
    mapaInstancia.remove()
    mapaInstancia = null
  }
}

const enviarCotizacion = () => {
  const numeroEmpresa = '522381366979'
  
  // Generamos links individuales para el origen y el destino en Google Maps
  const linkOrigen = origenCoords.value ? `https://www.google.com/maps/search/?api=1&query=${origenCoords.value.lat},${origenCoords.value.lng}` : 'No definido'
  const linkDestino = destinoCoords.value ? `https://www.google.com/maps/search/?api=1&query=${destinoCoords.value.lat},${destinoCoords.value.lng}` : 'No definido'
  
  // Asignamos la distancia calculada
  const textoDistancia = distanciaKm.value ? `${distanciaKm.value} km aprox.` : 'No calculada'
  
  // Armamos el mensaje completo integrando TODOS los datos
  const mensaje = `¡Nueva solicitud de cotización!\n\n` +
                  `👤 *Cliente:* ${nombre.value}\n` +
                  `📞 *WhatsApp:* ${telefono.value}\n` +
                  `🛫 *Origen:* ${origenText.value}\n` +
                  `📍 *Mapa Origen:* ${linkOrigen}\n\n` +
                  `🛬 *Destino:* ${destinoText.value}\n` +
                  `📍 *Mapa Destino:* ${linkDestino}\n\n` +
                  `📏 *Total de kilómetros:* ${textoDistancia}\n` +
                  `📦 *Servicio requerido:* ${servicio.value}\n` +
                  `📝 *Detalles adicionales:* ${detalles.value}`

  // Abrimos WhatsApp asegurando que todo el bloque de texto se envíe completo
  window.open(`https://wa.me/${numeroEmpresa}?text=${encodeURIComponent(mensaje)}`, '_blank')
}
</script>

<template>
  <section class="hero-section">
    <div class="hero-container">
      
      <!-- Columna Izquierda -->
      <div class="hero-left">
        <p class="tagline">SERVICIO EXPRESS LOCAL Y FORÁNEO</p>
        <h1>Mudanzas sin estrés en la <span>CDMX.</span></h1>
        <p class="description">Llegamos a tiempo, protegemos tus pertenencias con empaque premium y garantizamos el mejor precio operativo.</p>
        <button type="button" class="btn-secondary">VER SERVICIOS DE MUDANZA</button>
        
        <div class="rating-box">
          <span class="score">4.7</span>
          <span class="stars">★★★★★</span>
          <span class="count">Más de 148 opiniones reales</span>
        </div>
      </div>

      <!-- Columna Derecha: Formulario -->
      <div class="hero-right">
        <div class="form-card">
          <h3>Cotiza tu Mudanza en 1 Minuto</h3>
          <p class="form-subtitle">Toca los campos de dirección para fijar tu ubicación en el mapa.</p>
          
          <form @submit.prevent="enviarCotizacion">
            <label>TU NOMBRE</label>
            <input v-model="nombre" type="text" placeholder="Romeo" required>

            <label>TELÉFONO / WHATSAPP</label>
            <input v-model="telefono" type="tel" placeholder="2221234545" required>

            <div class="split-row">
              <div class="map-input-box">
                <label>PUNTO DE ORIGEN</label>
                <input 
                  v-model="origenText" 
                  type="text" 
                  placeholder="📍 Toca para abrir mapa" 
                  @click="abrirSelectorMapa('origen')"
                  readonly
                  required
                >
              </div>

              <div class="map-input-box">
                <label>PUNTO DE DESTINO</label>
                <input 
                  v-model="destinoText" 
                  type="text" 
                  placeholder="📍 Toca para abrir mapa" 
                  @click="abrirSelectorMapa('destino')"
                  readonly
                  required
                >
              </div>
            </div>

            <!-- NUEVO: Alerta visual de la distancia calculada en pantalla -->
            <div v-if="distanciaKm" class="distance-badge">
              🛣️ Distancia estimada del trayecto: <strong>{{ distanciaKm }} km</strong>
            </div>

            <label>TIPO DE SERVICIO REQUERIDO</label>
            <select v-model="servicio">
              <option>Mudanza Residencial Completa</option>
              <option>Fletes y Traslados Express</option>
              <option>Maniobras y Volado de Muebles</option>
            </select>

            <label>DETALLES ADICIONALES (¿PISOS POR ESCALERA?, ¿VOLADO?)</label>
            <textarea v-model="detalles" placeholder="Menciona si hay muebles pesados o mudanzas de última hora..."></textarea>

            <button type="submit" class="btn-submit">
              COTIZAR VÍA WHATSAPP EXPRESS
            </button>
            <p class="caption">Respuesta inmediata de lunes a domingo.</p>
          </form>
        </div>
      </div>
      
    </div>
  </section>

  <!-- VENTANA FLOTANTE MODAL DEL MAPA -->
  <div v-if="mostrarMapaModal" class="modal-overlay">
    <div class="modal-card">
      <div class="modal-header">
        <h4>Fijar dirección de {{ campoActivo === 'origen' ? 'Origen' : 'Destino' }}</h4>
        <button type="button" class="close-btn" @click="cerrarModal">×</button>
      </div>
      
      <div class="modal-body">
        <div v-if="cargandoGPS" class="loader">Buscando señal de GPS...</div>
        <div id="mapa-contenedor" class="map-render"></div>
      </div>
      
      <div class="modal-footer">
        <p class="coordenadas-info">Lat: {{ latActual.toFixed(4) }}, Lng: {{ lngActual.toFixed(4) }}</p>
        <button type="button" class="btn-confirmar" @click="confirmarUbicacion">ACEPTAR DIRECCIÓN</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hero-section { background-color: var(--color-bg-light, #f9f9f9); padding: 5rem 2rem; position: relative; }
.hero-container { max-width: 1200px; margin: 0 auto; display: flex; flex-wrap: wrap; gap: 4rem; align-items: center; }
.hero-left, .hero-right { flex: 1; min-width: 320px; }

h1 { font-size: 3.8rem; line-height: 1.1; margin: 1.5rem 0; font-family: serif; }
h1 span { color: var(--color-primary, #c62828); font-style: italic; }
.description { color: #555; line-height: 1.7; margin-bottom: 2.5rem; }
.tagline { color: #888; font-weight: bold; font-size: 0.8rem; letter-spacing: 1px; }
.btn-secondary { background: #000; color: #fff; border: none; padding: 1.1rem 2rem; font-weight: bold; cursor: pointer; }

.form-card { background: #fff; padding: 2.5rem; border-radius: 4px; box-shadow: 0 10px 30px rgba(0,0,0,0.04); }
.form-card h3 { font-size: 2rem; margin: 0 0 1.5rem 0; font-family: serif; }

form label { display: block; font-size: 0.75rem; font-weight: bold; color: #444; margin-bottom: 0.6rem; }
form input, form select, form textarea { width: 100%; padding: 0.9rem; margin-bottom: 1.2rem; border: 1px solid #ddd; border-radius: 4px; box-sizing: border-box; font-size: 1rem; }
form textarea { height: 90px; resize: none; }

.split-row { display: flex; gap: 1rem; }
.split-row div { flex: 1; }

/* NUEVO: Estilos para el cartel de la distancia calculada */
.distance-badge {
  background-color: #f0fdf4;
  color: #166534;
  padding: 0.9rem;
  border-radius: 4px;
  margin-bottom: 1.2rem;
  font-size: 0.9rem;
  border: 1px solid #bbf7d0;
  text-align: center;
}

.btn-submit { width: 100%; background-color: var(--color-primary, #c62828); color: white; border: none; padding: 1.2rem; font-weight: bold; font-size: 1rem; border-radius: 4px; cursor: pointer; transition: background 0.3s; }
.btn-submit:hover { background-color: #a31f1f; }
.caption { font-size: 0.8rem; color: #777; margin-top: 0.5rem; text-align: center;}

/* ESTILOS DE LA VENTANA FLOTANTE DEL MAPA (MODAL) */
.modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.6); display: flex; align-items: center; justify-content: center; z-index: 2000; padding: 1rem; }
.modal-card { background: white; border-radius: 8px; width: 100%; max-width: 600px; box-shadow: 0 10px 25px rgba(0,0,0,0.2); overflow: hidden; display: flex; flex-direction: column; }
.modal-header { padding: 1.2rem; border-bottom: 1px solid #eee; display: flex; justify-content: space-between; align-items: center; }
.modal-header h4 { margin: 0; font-size: 1.1rem; color: #111; }
.close-btn { background: none; border: none; font-size: 1.8rem; cursor: pointer; color: #888; line-height: 1; }

.modal-body { position: relative; height: 350px; background: #e5e3df; }
.map-render { width: 100%; height: 100%; }
.loader { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba(255,255,255,0.8); display: flex; align-items: center; justify-content: center; font-weight: bold; z-index: 1001; color: #333; }
.modal-footer { padding: 1rem; background: #fff; display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #eee; }
.btn-confirmar { background: #000; color: white; padding: 0.8rem 1.5rem; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; }
.coordenadas-info { font-size: 0.8rem; color: #888; margin: 0;}
</style>