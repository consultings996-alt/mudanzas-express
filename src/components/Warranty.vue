<script setup>
import { ref } from 'vue'

// Protocolos de seguridad dinámicos para facilitar su mantenimiento
const protocolos = ref([
  {
    titulo: 'Emplayado e Inventariado Sistemático',
    descripcion: 'Toda tu carga viaja completamente protegida con película plástica de alta resistencia y mantas de protección industrial sin ningún costo adicional.'
  },
  {
    titulo: 'Operadores Identificados y Monitoreados',
    descripcion: 'Contamos con un equipo humano de absoluta confianza, con años de experiencia operando rutas críticas y maniobras de carga en la Ciudad de México.'
  },
  {
    titulo: 'Flota con Rastreo Satelital Activo',
    descripcion: 'Nuestras unidades de transporte integran sistemas de geolocalización en tiempo real para brindarte monitoreo continuo durante todo el traslado.'
  }
])
</script>

<template>
  <section class="warranty-section">
    <div class="container">
      <div class="content-wrapper">
        <p class="tagline">PROTOCOLO DE CUIDADO DE ACTIVOS</p>
        <h2>¿Por qué Mudanzas Express es la opción <span>más confiable?</span></h2>
        <p class="intro">
          Construimos procesos claros de mudanza basados en la honestidad, la puntualidad y la seguridad física de tu patrimonio en cada kilómetro del trayecto.
        </p>
        
        <!-- Lista de Protocolos con Icono de Verificación -->
        <div class="protocols-list">
          <div v-for="(item, index) in protocolos" :key="index" class="protocol-item">
            <span class="check-icon">✓</span>
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
/* Fondo oscuro contrastante basado en tu diseño */
.warranty-section { 
  background-color: var(--color-dark, #0c0c0c); 
  color: #ffffff; 
  padding: 6rem 2rem; 
}
.container { 
  max-width: 1200px; 
  margin: 0 auto; 
}
.content-wrapper { 
  max-width: 900px; 
}

.tagline { 
  color: #888; 
  font-weight: bold; 
  font-size: 0.8rem; 
  letter-spacing: 2px; 
  margin-bottom: 1rem; 
}
h2 { 
  font-size: 3rem; 
  line-height: 1.2; 
  margin: 1rem 0 1.5rem 0; 
  font-weight: normal;
}
h2 span { 
  font-style: italic; 
  color: var(--color-primary, #c62828); 
}
.intro { 
  color: #aaa; 
  max-width: 650px; 
  margin-bottom: 4rem; 
  line-height: 1.7; 
  font-size: 1.05rem; 
}

/* Contenedor de la lista */
.protocols-list { 
  display: flex; 
  flex-direction: column; 
  gap: 2.5rem; 
}
.protocol-item { 
  display: flex; 
  gap: 1.5rem; 
  border-bottom: 1px solid #222; 
  padding-bottom: 2rem; 
}
.protocol-item:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

/* Icono de check estilizado con el color de la marca */
.check-icon { 
  color: var(--color-primary, #c62828); 
  font-weight: bold; 
  font-size: 1.3rem; 
  margin-top: 0.2rem;
}
.protocol-text h3 { 
  font-size: 1.3rem; 
  margin-bottom: 0.6rem; 
  color: #fff;
  font-family: var(--font-body); /* Mantenemos fuente limpia en subtítulos internos */
  font-weight: 600;
}
.protocol-text p { 
  color: #999; 
  line-height: 1.6; 
  font-size: 0.95rem; 
}

/* Adaptabilidad para pantallas móviles */
@media (max-width: 768px) {
  h2 { font-size: 2.2rem; }
  .warranty-section { padding: 4rem 1.5rem; }
  .protocol-item { gap: 1rem; }
}
</style>
