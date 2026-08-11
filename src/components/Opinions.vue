<script setup>
</script>

<template>
  <section class="inner-page">
    <div class="content-box">
      <div class="opiniones-header">
        <div>
          <span class="section-tag-line">— REPUTACIÓN VERIFICADA DE CLIENTES</span>
          <h2>La experiencia de quienes ya se <span>mudaron con nosotros.</span></h2>
        </div>
        <div class="score-box-big">
          <span class="big-num">4.7</span>
          <span class="big-stars">★★★★★</span>
        </div>
      </div>

      <div class="cards-grid">
        <div class="service-card">
          <span class="card-stars-mini">★★★★★</span>
          <p>"Tenía una mudanza urgente de Narvarte a Polanco en sábado. Llegaron a la hora acordada, protegieron mi sala y pantallas a la perfección. Gran servicio técnico."</p>
          <strong>Carlos Mendoza</strong>
        </div>
        <div class="service-card">
          <span class="card-stars-mini">★★★★★</span>
          <p>"Excelente opción para mudanzas express en CDMX. El volado de mi refrigerador por el balcón lo hicieron súper rápido y sin ningún rasguño. Súper recomendados."</p>
          <strong>Laura Beltrán</strong>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.inner-page { padding: 4rem 5%; max-width: 1200px; margin: 0 auto; width: 100%; box-sizing: border-box; }
.section-tag-line { color: var(--color-primary); font-size: 0.75rem; font-weight: bold; letter-spacing: 1px; display: block; margin-bottom: 0.8rem; }
.opiniones-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 3rem; flex-wrap: wrap; gap: 1rem; }
.opiniones-header h2 { font-family: var(--font-title); font-size: 2.8rem; line-height: 1.2; }
.opiniones-header h2 span { color: var(--color-primary); font-style: italic; }
.score-box-big { text-align: right; }
.big-num { font-size: 3.5rem; font-weight: bold; font-family: var(--font-title); display: block; line-height: 1; }
.big-stars { color: #d4af37; letter-spacing: 3px; }
.cards-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; margin-bottom: 3rem; }
.service-card { border: 1px solid #e0e0e0; padding: 2.5rem 2rem; background: #fff; border-radius: 4px; }
.service-card p { color: #555; line-height: 1.6; margin-bottom: 1.5rem; font-size: 0.95rem; }
.card-stars-mini { color: #d4af37; letter-spacing: 2px; display: block; margin-bottom: 1rem; }
</style>