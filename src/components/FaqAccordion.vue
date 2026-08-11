<script setup>
import { ref } from 'vue'

const preguntas = ref([
  {
    id: 1,
    abierta: true,
    titulo: '¿Cuánto cuesta un servicio de mudanza express básica en la CDMX?',
    respuesta: 'Los precios de un flete o mudanza express varían según la distancia entre puntos, el volumen de los objetos y si se requieren maniobras complejas (como escaleras o volado de muebles). Contáctanos por WhatsApp para recibir una cotización transparente y parametrizada de inmediato.'
  },
  {
    id: 2,
    abierta: false,
    titulo: '¿Cuáles son las zonas con mayor cobertura de Mudanzas Express?',
    respuesta: 'Tenemos cobertura total en la Ciudad de México y área metropolitana, con presencia diaria destacada en Benito Juárez, Narvarte Oriente, Narvarte Poniente y la colonia Del Valle, además de salidas a servicios foráneos.'
  },
  {
    id: 3,
    abierta: false,
    titulo: '¿Qué tipo de protección e insumos incluye el servicio de mudanza?',
    respuesta: 'Todos nuestros servicios estándar incluyen empaque de protección con película plástica elástica de alta resistencia (emplayado) y el uso de mantas para mudanza de protección industrial sin ningún costo adicional.'
  }
])

const togglePregunta = (id) => {
  preguntas.value = preguntas.value.map(p => 
    p.id === id ? { ...p, abierta: !p.abierta } : p
  )
}
</script>

<template>
  <section class="faq-section">
    <div class="container">
      <p class="tagline">RESPUESTAS SEMÁNTICAS DIRECTAS</p>
      <h2>Preguntas frecuentes sobre Mudanzas Express en CDMX</h2>
      
      <div class="faq-list">
        <div 
          v-for="item in preguntas" 
          :key="item.id" 
          class="faq-item"
          :class="{ 'item-abierto': item.abierta }"
        >
          <div class="faq-header" @click="togglePregunta(item.id)">
            <span class="faq-title" :class="{ 'title-active': item.abierta }">{{ item.titulo }}</span>
            <span class="faq-icon">{{ item.abierta ? '×' : '+' }}</span>
          </div>
          
          <div v-if="item.abierta" class="faq-body">
            <p>{{ item.respuesta }}</p>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<style scoped>
.faq-section { padding: 6rem 2rem; background-color: #ffffff; }
.container { max-width: 850px; margin: 0 auto; }

.tagline { color: var(--color-primary); font-weight: bold; font-size: 0.8rem; letter-spacing: 1px; margin-bottom: 1rem; }
h2 { font-size: 2.6rem; color: #111; margin-bottom: 3.5rem; line-height: 1.2; font-weight: 700; font-family: var(--font-title); }

.faq-list { display: flex; flex-direction: column; }
.faq-item { border-bottom: 1px solid #e0e0e0; padding: 1.8rem 0; transition: all 0.2s ease; }
.faq-item:first-child { border-top: 1px solid #e0e0e0; }

.faq-header { display: flex; justify-content: space-between; align-items: center; cursor: pointer; gap: 2rem; }
.faq-title { font-weight: bold; font-size: 1.15rem; color: #111; line-height: 1.4; font-family: var(--font-body); }

.item-abierto .faq-title { color: var(--color-primary); }

.faq-icon { font-size: 1.8rem; color: var(--color-primary); line-height: 1; font-weight: 300; width: 24px; text-align: center; }

.faq-body { margin-top: 1.2rem; color: #555; line-height: 1.7; font-size: 1rem; animation: fadeIn 0.3s ease-in-out; }

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-5px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 768px) {
  h2 { font-size: 2rem; margin-bottom: 2.5rem; }
  .faq-title { font-size: 1rem; }
  .faq-section { padding: 4rem 1.5rem; }
}
</style>