<script setup>
import { SITE_DATA } from '../config/siteData.js'
</script>

<template>
  <section class="opinions-section">
    <div class="container">
      <div class="opiniones-header">
        <div class="header-text">
          <span class="section-tag-line">{{ SITE_DATA.opinionesSection.tagline }}</span>
          <h2>
            {{ SITE_DATA.opinionesSection.titulo }}
            <span class="highlight">{{ SITE_DATA.opinionesSection.tituloDestacado }}</span>
          </h2>
        </div>

        <div class="score-card">
          <span class="big-num">{{ SITE_DATA.opinionesSection.scorePromedio }}</span>
          <div class="score-details">
            <span class="big-stars">{{ SITE_DATA.opinionesSection.estrellas }}</span>
            <span class="total-reviews">{{ SITE_DATA.opinionesSection.resenasTotal }}</span>
          </div>
        </div>
      </div>

      <!-- Grid de Testimonios de Clientes -->
      <div class="cards-grid">
        <div
          v-for="item in SITE_DATA.opinionesSection.testimonios"
          :key="item.id"
          class="review-card"
        >
          <div class="card-top">
            <span class="card-stars">{{ item.estrellas }}</span>
            <span class="review-date">{{ item.fecha }}</span>
          </div>

          <p class="comment-text">"{{ item.comentario }}"</p>

          <div class="author-info">
            <div class="avatar-circle">{{ item.nombre.charAt(0) }}</div>
            <div class="author-meta">
              <strong>{{ item.nombre }}</strong>
              <div class="location-badge">📍 {{ item.ubicacion }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.opinions-section {
  padding: 5.5rem 2rem;
  background-color: var(--color-bg-light);
}

.container {
  max-width: 1250px;
  margin: 0 auto;
}

.section-tag-line {
  color: var(--color-primary);
  font-size: 0.8rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  display: block;
  margin-bottom: 0.6rem;
}

.opiniones-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 3.5rem;
  flex-wrap: wrap;
  gap: 2rem;
}

.header-text h2 {
  font-size: 2.8rem;
  line-height: 1.18;
  max-width: 650px;
}

.header-text h2 .highlight {
  color: var(--color-primary);
  font-style: italic;
}

.score-card {
  display: flex;
  align-items: center;
  gap: 1.2rem;
  background: #ffffff;
  padding: 1.2rem 1.8rem;
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-md);
  border: 1px solid var(--color-border);
}

.big-num {
  font-size: 3.2rem;
  font-weight: 800;
  font-family: var(--font-title);
  color: var(--color-dark);
  line-height: 1;
}

.score-details {
  display: flex;
  flex-direction: column;
}

.big-stars {
  color: #f59e0b;
  letter-spacing: 2px;
  font-size: 1.1rem;
}

.total-reviews {
  font-size: 0.82rem;
  color: var(--color-text-muted);
  font-weight: 700;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.8rem;
}

.review-card {
  border: 1px solid var(--color-border);
  padding: 2rem;
  background: #ffffff;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
}

.review-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-lg);
  border-color: rgba(220, 38, 38, 0.2);
}

.card-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.2rem;
}

.card-stars {
  color: #f59e0b;
  letter-spacing: 2px;
  font-size: 0.95rem;
}

.review-date {
  font-size: 0.78rem;
  color: var(--color-text-muted);
  font-weight: 600;
}

.comment-text {
  color: var(--color-text);
  line-height: 1.65;
  margin-bottom: 1.8rem;
  font-size: 0.98rem;
  font-style: italic;
  flex: 1;
}

.author-info {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  border-top: 1px solid var(--color-border);
  padding-top: 1rem;
}

.avatar-circle {
  width: 42px;
  height: 42px;
  background: linear-gradient(135deg, var(--color-dark) 0%, var(--color-dark-surface) 100%);
  color: #ffffff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 1.1rem;
  font-family: var(--font-title);
}

.author-meta {
  display: flex;
  flex-direction: column;
}

.author-meta strong {
  font-size: 0.95rem;
  color: var(--color-dark);
}

.location-badge {
  font-size: 0.78rem;
  color: var(--color-text-muted);
  font-weight: 600;
}

@media (max-width: 768px) {
  .header-text h2 { font-size: 2.2rem; }
  .opiniones-header { flex-direction: column; align-items: flex-start; }
  .score-card { width: 100%; justify-content: center; }
}
</style>