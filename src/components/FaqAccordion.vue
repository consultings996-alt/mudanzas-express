<script setup>
import { ref } from 'vue'
import { SITE_DATA } from '../config/siteData.js'

// Inicializar lista de preguntas reactiva basada en SITE_DATA
const preguntas = ref(SITE_DATA.faqSection.preguntas.map(p => ({ ...p })))

const togglePregunta = (id) => {
  preguntas.value = preguntas.value.map(p => 
    p.id === id ? { ...p, abierta: !p.abierta } : p
  )
}
</script>

<template>
  <section class="faq-section">
    <div class="container">
      <div class="header-block">
        <span class="tagline">{{ SITE_DATA.faqSection.tagline }}</span>
        <h2>{{ SITE_DATA.faqSection.titulo }}</h2>
      </div>

      <!-- Lista de Preguntas Frecuentes Accordion -->
      <div class="faq-list">
        <div 
          v-for="item in preguntas" 
          :key="item.id" 
          class="faq-item"
          :class="{ 'item-abierto': item.abierta }"
        >
          <div class="faq-header" @click="togglePregunta(item.id)">
            <span class="faq-title" :class="{ 'title-active': item.abierta }">
              {{ item.titulo }}
            </span>
            <div class="faq-icon-badge" :class="{ active: item.abierta }">
              {{ item.abierta ? '−' : '+' }}
            </div>
          </div>

          <Transition name="expand">
            <div v-if="item.abierta" class="faq-body">
              <p>{{ item.respuesta }}</p>
            </div>
          </Transition>
        </div>
      </div>

    </div>
  </section>
</template>

<style scoped>
.faq-section {
  padding: 5.5rem 2rem;
  background-color: #ffffff;
}

.container {
  max-width: 900px;
  margin: 0 auto;
}

.header-block {
  text-align: center;
  margin-bottom: 3.5rem;
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
  font-size: 2.6rem;
  color: var(--color-dark);
  line-height: 1.2;
  font-weight: 800;
}

.faq-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.faq-item {
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 1.4rem 1.8rem;
  transition: all 0.25s ease;
  background: #ffffff;
}

.faq-item.item-abierto {
  border-color: rgba(220, 38, 38, 0.3);
  box-shadow: var(--shadow-md);
  background: #fdfdfd;
}

.faq-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  gap: 1.5rem;
}

.faq-title {
  font-weight: 700;
  font-size: 1.1rem;
  color: var(--color-dark);
  line-height: 1.4;
  transition: color 0.2s ease;
}

.item-abierto .faq-title {
  color: var(--color-primary);
}

.faq-icon-badge {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--color-bg-light);
  color: var(--color-dark);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
  font-weight: 800;
  line-height: 1;
  flex-shrink: 0;
  transition: all 0.25s ease;
}

.faq-icon-badge.active {
  background: var(--color-primary);
  color: #ffffff;
}

.faq-body {
  margin-top: 1.2rem;
  padding-top: 1rem;
  border-top: 1px dashed var(--color-border);
  color: var(--color-text-muted);
  line-height: 1.7;
  font-size: 1rem;
}

.expand-enter-active,
.expand-leave-active {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  max-height: 300px;
  opacity: 1;
  overflow: hidden;
}

.expand-enter-from,
.expand-leave-to {
  max-height: 0;
  opacity: 0;
  margin-top: 0;
  padding-top: 0;
  border-top-color: transparent;
}

@media (max-width: 768px) {
  h2 { font-size: 2rem; }
  .faq-title { font-size: 1rem; }
  .faq-section { padding: 4rem 1.5rem; }
  .faq-item { padding: 1.2rem; }
}
</style>