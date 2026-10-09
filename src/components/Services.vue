<script setup>
import { SITE_DATA } from '../config/siteData.js'
</script>

<template>
  <section class="services-section">
    <div class="container">
      <div class="header-block">
        <span class="tagline">{{ SITE_DATA.serviciosSection.tagline }}</span>
        <h2>{{ SITE_DATA.serviciosSection.titulo }}</h2>
        <p class="section-desc">{{ SITE_DATA.serviciosSection.descripcion }}</p>
      </div>
      
      <!-- Grid de Tarjetas de Servicio -->
      <div class="services-grid">
        <div
          v-for="item in SITE_DATA.serviciosSection.lista"
          :key="item.id"
          class="service-card"
        >
          <div class="card-icon">{{ item.icon }}</div>
          <h3>{{ item.titulo }}</h3>
          <p>{{ item.descripcion }}</p>

          <ul v-if="item.caracteristicas" class="feature-tags">
            <li v-for="(feat, fIdx) in item.caracteristicas" :key="fIdx">
              <span class="check">✓</span> {{ feat }}
            </li>
          </ul>
        </div>
      </div>

      <!-- Sección de Infraestructura y Flotas -->
      <div class="fleet-container">
        <div class="fleet-header">
          <h3>{{ SITE_DATA.serviciosSection.flotaTitulo }}</h3>
          <p class="fleet-subtitle">{{ SITE_DATA.serviciosSection.flotaSubtitulo }}</p>
        </div>
        
        <!-- Tabla en Escritorio -->
        <div class="table-responsive">
          <table class="fleet-table">
            <thead>
              <tr>
                <th>TIPO DE UNIDAD</th>
                <th>CAPACIDAD DE CARGA</th>
                <th>VOLUMEN INTERNO</th>
                <th>RECOMENDADO PARA</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(unidad, index) in SITE_DATA.serviciosSection.unidades" :key="index">
                <td class="unit-name">
                  <span class="unit-dot" :style="{ backgroundColor: unidad.badgeColor }"></span>
                  <strong>{{ unidad.tipo }}</strong>
                </td>
                <td>{{ unidad.capacidad }}</td>
                <td><span class="volume-badge">{{ unidad.volumen }}</span></td>
                <td><span class="ideal-tag">{{ unidad.ideal }}</span></td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Tarjetas para Dispositivos Móviles -->
        <div class="fleet-mobile-cards">
          <div
            v-for="(unidad, index) in SITE_DATA.serviciosSection.unidades"
            :key="index"
            class="fleet-card"
            :style="{ borderLeftColor: unidad.badgeColor }"
          >
            <div class="fleet-card-header">
              <h4>{{ unidad.tipo }}</h4>
              <span class="volume-badge">{{ unidad.volumen }}</span>
            </div>
            <div class="fleet-detail">
              <span>Capacidad:</span> <strong>{{ unidad.capacidad }}</strong>
            </div>
            <div class="fleet-detail">
              <span>Ideal para:</span> {{ unidad.ideal }}
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<style scoped>
.services-section {
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
  margin: 0 auto 4rem auto;
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

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
  gap: 2rem;
  margin-bottom: 5.5rem;
}

.service-card {
  padding: 2.2rem;
  background: var(--color-bg-light);
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  display: flex;
  flex-direction: column;
}

.service-card:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow-lg);
  background: #ffffff;
  border-color: rgba(220, 38, 38, 0.2);
}

.card-icon {
  font-size: 2.5rem;
  margin-bottom: 1.2rem;
  background: white;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
}

.service-card h3 {
  font-size: 1.4rem;
  margin-bottom: 0.8rem;
  color: var(--color-dark);
}

.service-card p {
  color: var(--color-text-muted);
  line-height: 1.65;
  font-size: 0.95rem;
  margin-bottom: 1.5rem;
  flex: 1;
}

.feature-tags {
  list-style: none;
  padding: 0;
  margin: 0;
  border-top: 1px solid var(--color-border);
  padding-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.feature-tags li {
  font-size: 0.85rem;
  color: var(--color-dark);
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.feature-tags .check {
  color: #10b981;
  font-weight: 800;
}

/* Sección de Flota */
.fleet-container {
  background: var(--color-bg-light);
  border-radius: var(--radius-xl);
  padding: 3rem;
  border: 1px solid var(--color-border);
}

.fleet-header {
  margin-bottom: 2rem;
}

.fleet-container h3 {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.fleet-subtitle {
  color: var(--color-text-muted);
  font-size: 1rem;
}

.table-responsive {
  overflow-x: auto;
}

.fleet-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  text-align: left;
}

.fleet-table th {
  padding: 1rem 1.2rem;
  background: #ffffff;
  border-bottom: 2px solid var(--color-border);
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.05em;
  color: var(--color-text-muted);
}

.fleet-table th:first-child { border-top-left-radius: var(--radius-md); }
.fleet-table th:last-child { border-top-right-radius: var(--radius-md); }

.fleet-table td {
  padding: 1.3rem 1.2rem;
  background: #ffffff;
  border-bottom: 1px solid var(--color-border);
  font-size: 0.95rem;
  color: var(--color-dark);
}

.unit-name {
  display: flex;
  align-items: center;
  gap: 0.7rem;
}

.unit-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  display: inline-block;
}

.volume-badge {
  background: #f1f5f9;
  color: var(--color-dark);
  padding: 0.3rem 0.7rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 700;
}

.ideal-tag {
  color: var(--color-text-muted);
  font-size: 0.9rem;
}

.fleet-mobile-cards {
  display: none;
}

@media (max-width: 992px) {
  .fleet-container {
    padding: 2rem 1.5rem;
  }

  .fleet-table { display: none; }

  .fleet-mobile-cards {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
  }

  .fleet-card {
    background: #ffffff;
    padding: 1.4rem;
    border-radius: var(--radius-md);
    border-left: 5px solid var(--color-primary);
    box-shadow: var(--shadow-sm);
  }

  .fleet-card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.8rem;
  }

  .fleet-card h4 {
    font-size: 1.2rem;
    margin: 0;
  }

  .fleet-detail {
    font-size: 0.9rem;
    color: var(--color-text-muted);
    margin-bottom: 0.4rem;
  }

  .fleet-detail span {
    font-weight: 700;
    color: var(--color-dark);
  }
}
</style>