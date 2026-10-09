<script setup>
import { SITE_DATA } from '../config/siteData.js'

const emit = defineEmits(['navigate'])

const irA = (vista) => {
  emit('navigate', vista)
}
</script>

<template>
  <footer class="site-footer">
    <!-- Contenedor de Ubicación y Mapa Interactivo Embed -->
    <div class="location-container">
      <div class="map-wrapper">
        <iframe 
          :src="SITE_DATA.empresa.mapaEmbedUrl"
          width="100%" 
          height="360"
          style="border:0;" 
          allowfullscreen="" 
          loading="lazy" 
          referrerpolicy="no-referrer-when-downgrade"
          title="Ubicación Base Operativa"
        ></iframe>
      </div>
      
      <div class="info-wrapper">
        <div class="info-badge">📍 UBICACIÓN ESTRATÉGICA</div>
        <h2>{{ SITE_DATA.empresa.baseOperativa }}</h2>

        <div class="info-list">
          <div class="info-item">
            <span class="info-icon">🏢</span>
            <div>
              <strong>Dirección Principal:</strong>
              <p>{{ SITE_DATA.empresa.direccion }}</p>
            </div>
          </div>

          <div class="info-item">
            <span class="info-icon">📞</span>
            <div>
              <strong>Teléfono y Atención:</strong>
              <p>{{ SITE_DATA.empresa.telefonoContacto }}</p>
            </div>
          </div>

          <div class="info-item">
            <span class="info-icon">🕒</span>
            <div>
              <strong>Horarios de Servicio:</strong>
              <p>{{ SITE_DATA.empresa.horarioAtencion }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Directorio y Navegación del Footer -->
    <div class="directory-container">
      <div class="directory-grid">
        <div class="brand-column">
          <div class="footer-logo-wrapper" @click="irA('inicio')">
            <span class="logo-icon">🚛</span>
            <h3 class="footer-logo">{{ SITE_DATA.empresa.nombre }}</h3>
          </div>
          <p>{{ SITE_DATA.footer.bioEmpresa }}</p>
        </div>
        
        <div class="links-column">
          <h4>{{ SITE_DATA.footer.tituloServicios }}</h4>
          <ul>
            <li v-for="(item, idx) in SITE_DATA.footer.serviciosDirectorio" :key="idx" @click="irA('servicios')">
              {{ item }}
            </li>
          </ul>
        </div>
        
        <div class="links-column">
          <h4>{{ SITE_DATA.footer.tituloCobertura }}</h4>
          <ul>
            <li v-for="(item, idx) in SITE_DATA.footer.coberturaDirectorio" :key="idx">
              {{ item }}
            </li>
          </ul>
        </div>
      </div>
      
      <div class="footer-bottom">
        <p>{{ SITE_DATA.footer.copyright }}</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  background-color: #ffffff;
  color: var(--color-text);
}

.location-container {
  display: flex;
  flex-wrap: wrap;
  max-width: 1250px;
  margin: 0 auto;
  padding: 5rem 2rem;
  gap: 4rem;
  align-items: center;
}

.map-wrapper {
  flex: 1.2;
  min-width: 320px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  overflow: hidden;
  box-shadow: var(--shadow-lg);
}

.info-wrapper {
  flex: 1;
  min-width: 320px;
}

.info-badge {
  display: inline-block;
  font-size: 0.78rem;
  font-weight: 800;
  color: var(--color-primary);
  background: var(--color-primary-light);
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  margin-bottom: 1rem;
}

.info-wrapper h2 {
  font-size: 2.2rem;
  margin-bottom: 1.8rem;
  color: var(--color-dark);
  line-height: 1.2;
}

.info-list {
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
}

.info-item {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}

.info-icon {
  font-size: 1.4rem;
  background: var(--color-bg-light);
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-md);
  flex-shrink: 0;
}

.info-item strong {
  display: block;
  font-size: 0.85rem;
  color: var(--color-dark);
  font-weight: 800;
  margin-bottom: 0.2rem;
}

.info-item p {
  font-size: 0.95rem;
  color: var(--color-text-muted);
  line-height: 1.5;
  margin: 0;
}

.directory-container {
  background-color: var(--color-dark);
  color: #94a3b8;
  padding: 5rem 2rem 2.5rem 2rem;
}

.directory-grid {
  max-width: 1250px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  gap: 3.5rem;
  justify-content: space-between;
}

.brand-column {
  flex: 2;
  min-width: 280px;
}

.footer-logo-wrapper {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  cursor: pointer;
  margin-bottom: 1rem;
}

.logo-icon {
  font-size: 1.8rem;
}

.footer-logo {
  color: #ffffff;
  font-size: 1.6rem;
  margin: 0;
  font-family: var(--font-title);
}

.brand-column p {
  line-height: 1.7;
  font-size: 0.95rem;
  color: #94a3b8;
  max-width: 450px;
}

.links-column {
  flex: 1;
  min-width: 200px;
}

.links-column h4 {
  color: #ffffff;
  font-size: 0.82rem;
  letter-spacing: 0.08em;
  margin-bottom: 1.4rem;
  font-weight: 800;
}

.links-column ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.links-column li {
  margin-bottom: 0.8rem;
  font-size: 0.92rem;
  color: #cbd5e1;
  cursor: pointer;
  transition: color 0.2s ease;
}

.links-column li:hover {
  color: var(--color-primary);
}

.footer-bottom {
  max-width: 1250px;
  margin: 4rem auto 0 auto;
  padding-top: 2rem;
  border-top: 1px solid var(--color-dark-surface);
  font-size: 0.85rem;
  color: #64748b;
  text-align: center;
}

@media (max-width: 768px) {
  .location-container { padding: 3.5rem 1.5rem; gap: 2.5rem; flex-direction: column-reverse; }
  .info-wrapper h2 { font-size: 1.8rem; }
  .directory-grid { flex-direction: column; gap: 2.5rem; }
  .directory-container { padding: 4rem 1.5rem 2rem 1.5rem; }
}
</style>