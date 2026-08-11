<script setup>
import { ref } from 'vue'

// Datos dinámicos de los servicios principales
const servicios = ref([
  {
    titulo: 'Mudanza Residencial',
    descripcion: 'Servicio completo para casas y departamentos. Incluye empaque premium de muebles, protección de electrónicos y acomodo estratégico.'
  },
  {
    titulo: 'Fletes y Traslados Express',
    descripcion: 'Ideal para mover pocos objetos, mercancías o compras de última hora con salidas inmediatas dentro de la CDMX.'
  },
  {
    titulo: 'Maniobras y Volado',
    descripcion: 'Contamos con equipo certificado y personal capacitado para el volado de muebles por fachadas, ventanas o espacios reducidos.'
  }
])

// Datos dinámicos de la infraestructura de unidades
const unidades = ref([
  { tipo: 'Nissan Copetona', capacidad: '1.5 Toneladas', volumen: '14 m³', ideal: 'Fletes express y departamentos pequeños' },
  { tipo: 'Camión Ford 350', capacidad: '3.5 Toneladas', volumen: '26 m³', ideal: 'Casas medianas o mudanzas estándar' },
  { tipo: 'Camión Rabón', capacidad: '8.0 Toneladas', volumen: '50 m³', ideal: 'Residencias grandes o traslados foráneos' }
])
</script>

<template>
  <section class="services-section">
    <div class="container">
      <p class="tagline">NUESTRAS ESPECIALIDADES</p>
      <h2>Servicios logísticos a la medida de tus necesidades</h2>
      
      <!-- Bloque de Tarjetas de Servicio -->
      <div class="services-grid">
        <div v-for="(item, index) in servicios" :key="index" class="service-card">
          <div class="card-icon">📦</div>
          <h3>{{ item.titulo }}</h3>
          <p>{{ item.descripcion }}</p>
        </div>
      </div>

      <!-- Bloque de Infraestructura de Unidades (Mejora UX Adaptativa) -->
      <div class="fleet-container">
        <h3>Nuestra Infraestructura de Carga</h3>
        <p class="fleet-subtitle">Contamos con unidades monitoreadas y adaptadas para proteger tu patrimonio en cada traslado.</p>
        
        <!-- Vista de Tabla (Computadoras) -->
        <table class="fleet-table">
          <thead>
            <tr>
              <th>TIPO DE UNIDAD</th>
              <th>CAPACIDAD</th>
              <th>VOLUMEN</th>
              <th>IDEAL PARA</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(unidad, index) in unidades" :key="index">
              <td><strong>{{ unidad.tipo }}</strong></td>
              <td>{{ unidad.capacidad }}</td>
              <td>{{ unidad.volumen }}</td>
              <td><span class="tag-table">{{ unidad.ideal }}</span></td>
            </tr>
          </tbody>
        </table>

        <!-- Vista de Tarjetas (Mutación automática para Celulares) -->
        <div class="fleet-mobile-cards">
          <div v-for="(unidad, index) in unidades" :key="index" class="fleet-card">
            <h4>{{ unidad.tipo }}</h4>
            <div class="fleet-detail"><span>Capacidad:</span> {{ unidad.capacidad }}</div>
            <div class="fleet-detail"><span>Volumen:</span> {{ unidad.volumen }}</div>
            <div class="fleet-detail"><span>Ideal:</span> {{ unidad.ideal }}</div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<style scoped>
.services-section { padding: 6rem 2rem; background-color: #ffffff; }
.container { max-width: 1200px; margin: 0 auto; }

.tagline { color: #888; font-weight: bold; font-size: 0.8rem; letter-spacing: 1px; margin-bottom: 1rem; }
h2 { font-size: 2.8rem; line-height: 1.2; color: #111; margin-bottom: 4rem; max-width: 700px; }

/* Grilla de servicios */
.services-grid { display: flex; flex-wrap: wrap; gap: 2rem; margin-bottom: 6rem; }
.service-card { flex: 1; min-width: 280px; padding: 2.5rem; background: var(--color-bg-light, #f9f9f9); border-radius: 4px; transition: transform 0.2s, box-shadow 0.2s; }
.service-card:hover { transform: translateY(-5px); box-shadow: 0 10px 25px rgba(0,0,0,0.05); }
.card-icon { font-size: 2rem; margin-bottom: 1.5rem; }
.service-card h3 { font-size: 1.5rem; margin-bottom: 1rem; color: #111; }
.service-card p { color: #666; line-height: 1.6; font-size: 0.95rem; }

/* Contenedor de Flota/Tabla */
.fleet-container { margin-top: 4rem; background: #fff; }
.fleet-container h3 { font-size: 2rem; margin-bottom: 0.5rem; }
.fleet-subtitle { color: #666; margin-bottom: 2.5rem; font-size: 1rem; }

/* Estilos de la tabla estándar */
.fleet-table { width: 100%; border-collapse: collapse; text-align: left; margin-top: 1.5rem; }
.fleet-table th { padding: 1.2rem; border-bottom: 2px solid #eee; font-size: 0.8rem; font-weight: bold; letter-spacing: 0.5px; color: #555; }
.fleet-table td { padding: 1.5rem 1.2rem; border-bottom: 1px solid #eee; font-size: 1rem; color: #444; }
.tag-table { background: #f0f0f0; padding: 0.4rem 0.8rem; border-radius: 20px; font-size: 0.85rem; color: #555; }

/* Elementos móviles ocultos por defecto */
.fleet-mobile-cards { display: none; }

/* 📱 Magia de Adaptabilidad (Media Queries) */
@media (max-width: 768px) {
  h2 { font-size: 2.2rem; }
  .services-grid { flex-direction: column; }
  
  /* Ocultamos la tabla en pantallas chicas */
  .fleet-table { display: none; }
  
  /* Activamos las tarjetas deslizables verticales en celular */
  .fleet-mobile-cards { display: flex; flex-direction: column; gap: 1.5rem; }
  .fleet-card { background: #f9f9f9; padding: 1.5rem; border-radius: 4px; border-left: 4px solid var(--color-primary, #c62828); }
  .fleet-card h4 { font-size: 1.2rem; margin-bottom: 0.8rem; color: #111; }
  .fleet-detail { font-size: 0.95rem; margin-bottom: 0.4rem; color: #555; }
  .fleet-detail span { font-weight: bold; color: #111; }
}
</style>
