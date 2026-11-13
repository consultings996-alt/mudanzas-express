// src/config/rutaCotizada.js
// Estado compartido y reactivo con la última ruta cotizada en el HeroForm.
// TrackingView lo usa para animar el camión sobre la ruta que el cliente
// acaba de cotizar. Si no hay ruta cotizada, se usa la ruta demo de CDMX.
import { reactive } from 'vue'

export const rutaCotizada = reactive({
  origen: null, // { lat, lng, texto }
  destino: null, // { lat, lng, texto }
  distanciaKm: null, // string con 2 decimales
  servicio: ''
})

export const guardarRutaCotizada = ({ origen, destino, distanciaKm, servicio }) => {
  rutaCotizada.origen = origen
  rutaCotizada.destino = destino
  rutaCotizada.distanciaKm = distanciaKm
  rutaCotizada.servicio = servicio
}

export const limpiarRutaCotizada = () => {
  rutaCotizada.origen = null
  rutaCotizada.destino = null
  rutaCotizada.distanciaKm = null
  rutaCotizada.servicio = ''
}

// Ruta demo por defecto (Col. Del Valle → Coyoacán, CDMX)
export const RUTA_DEMO = {
  origen: { lat: 19.38, lng: -99.17, texto: 'Av. Insurgentes Sur 1234, Col. Del Valle, CDMX' },
  destino: { lat: 19.3467, lng: -99.1617, texto: 'Calle Felipe Carrillo Puerto, Coyoacán, CDMX' }
}
