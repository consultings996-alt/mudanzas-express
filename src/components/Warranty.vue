<script setup>
import { SITE_DATA } from '../config/siteData.js'
</script>

<template>
  <section class="warranty-section">
    <div class="container">
      <div class="content-wrapper">
        <span class="tagline">{{ SITE_DATA.garantiaSection.tagline }}</span>
        <h2>
          {{ SITE_DATA.garantiaSection.titulo }}
          <span class="highlight">{{ SITE_DATA.garantiaSection.tituloDestacado }}</span>
        </h2>
        <p class="intro">
          {{ SITE_DATA.garantiaSection.intro }}
        </p>

        <!-- Lista de Protocolos de Seguridad -->
        <div class="protocols-grid">
          <div
            v-for="(item, index) in SITE_DATA.garantiaSection.protocolos"
            :key="index"
            class="protocol-card"
          >
            <div class="card-number-badge">{{ item.numero }}</div>
            <div class="protocol-text">
              <h3>{{ item.titulo }}</h3>
              <p>{{ item.descripcion }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.warranty-section { 
  background-color: var(--color-dark); 
  color: #ffffff; 
  padding: 6rem 2rem;
  position: relative;
  overflow: hidden;
}

.container {
  max-width: 1250px;
  margin: 0 auto; 
}

.content-wrapper {
  max-width: 1000px;
  margin: 0 auto;
}

.tagline { 
  color: var(--color-primary);
  font-weight: 800;
  font-size: 0.8rem; 
  letter-spacing: 0.12em;
  display: block;
  margin-bottom: 0.8rem;
}

h2 {
  font-size: 3.2rem;
  line-height: 1.15;
  color: #ffffff;
  margin-bottom: 1.2rem;
}

h2 .highlight {
  font-style: italic; 
  color: var(--color-primary); 
}

.intro {
  color: #94a3b8;
  max-width: 700px;
  margin-bottom: 4rem; 
  line-height: 1.7; 
  font-size: 1.1rem;
}

.protocols-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.protocol-card {
  background: var(--color-dark-surface);
  border: 1px solid rgba(255, 255, 255, 0.08);
  padding: 2.2rem;
  border-radius: var(--radius-lg);
  transition: all 0.3s ease;
  position: relative;
  display: flex;
  flex-direction: column;
}

.protocol-card:hover {
  transform: translateY(-5px);
  border-color: rgba(220, 38, 38, 0.4);
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);
}

.card-number-badge {
  background: linear-gradient(135deg, var(--color-primary) 0%, #b91c1c 100%);
  color: #ffffff;
  width: 44px;
  height: 44px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 1.1rem;
  font-family: var(--font-title);
  margin-bottom: 1.4rem;
  box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3);
}

.protocol-text h3 {
  font-size: 1.3rem; 
  margin-bottom: 0.8rem;
  color: #ffffff;
  font-family: var(--font-title);
  font-weight: 700;
}

.protocol-text p {
  color: #cbd5e1;
  line-height: 1.65;
  font-size: 0.95rem; 
}

@media (max-width: 768px) {
  h2 { font-size: 2.3rem; }
  .warranty-section { padding: 4rem 1.5rem; }
  .intro { font-size: 1rem; }
}
</style>