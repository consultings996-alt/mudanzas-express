<script setup>
import { ref } from 'vue'
import HeroForm from './components/HeroForm.vue'
import Services from './components/Services.vue'
import Warranty from './components/Warranty.vue'
import Opinions from './components/Opinions.vue'
import FaqAccordion from './components/FaqAccordion.vue'
import FooterLocation from './components/FooterLocation.vue'
import WhatsappFloat from './components/WhatsappFloat.vue'

const vistaActual = ref('inicio')
const menuAbierto = ref(false)

const cambiarVista = (vista) => {
  vistaActual.value = vista
  menuAbierto.value = false
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <div class="page-layout">
    
    <header class="main-header">
      <div class="logo" @click="cambiarVista('inicio')">Mudanzas Express</div>
      
      <button class="hamburger" @click="menuAbierto = !menuAbierto" aria-label="Abrir menú">
        <span></span>
        <span></span>
        <span></span>
      </button>

      <nav class="main-nav" :class="{ 'is-open': menuAbierto }">
        <a href="#" @click.prevent="cambiarVista('servicios')" :class="{ activo: vistaActual === 'servicios' }">SERVICIOS</a>
        <a href="#" @click.prevent="cambiarVista('garantia')" :class="{ activo: vistaActual === 'garantia' }">GARANTÍA</a>
        <a href="#" @click.prevent="cambiarVista('opiniones')" :class="{ activo: vistaActual === 'opiniones' }">OPINIONES</a>
        <a href="#" @click.prevent="cambiarVista('preguntas')" :class="{ activo: vistaActual === 'preguntas' }">PREGUNTAS</a>
        <button class="btn-nav-cotizar" @click="cambiarVista('inicio')">COTIZAR</button>
      </nav>
    </header>

    <main class="main-content">
      <HeroForm v-if="vistaActual === 'inicio'" />
      <Services v-if="vistaActual === 'servicios'" />
      <Warranty v-if="vistaActual === 'garantia'" />
      <Opinions v-if="vistaActual === 'opiniones'" />
      <FaqAccordion v-if="vistaActual === 'preguntas'" />
    </main>

    <FooterLocation />
    <WhatsappFloat />

  </div>
</template>

<style scoped>
.page-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  font-family: var(--font-body);
  background-color: #fff;
}
.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.main-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.2rem 5%;
  background-color: #ffffff;
  border-bottom: 1px solid #eaeaea;
  position: sticky;
  top: 0;
  z-index: 1000;
}
.logo {
  font-size: 1.8rem;
  font-family: var(--font-title);
  font-weight: 700;
  color: #000;
  cursor: pointer;
  letter-spacing: -0.5px;
}
.main-nav {
  display: flex;
  align-items: center;
  gap: 2.5rem;
}
.main-nav a {
  text-decoration: none;
  color: #666;
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.5px;
  transition: color 0.3s ease;
  padding-bottom: 4px;
}
.main-nav a:hover, .main-nav a.activo {
  color: #000;
  border-bottom: 2px solid #000;
}
.btn-nav-cotizar {
  background-color: var(--color-dark);
  color: #ffffff;
  border: none;
  padding: 0.8rem 1.8rem;
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 1px;
  cursor: pointer;
  border-radius: 2px;
}

.hamburger {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 28px;
  height: 21px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 1001;
}
.hamburger span {
  width: 100%;
  height: 3px;
  background-color: #000;
  border-radius: 2px;
  transition: all 0.3s ease;
}

@media (max-width: 1024px) {
  .hamburger {
    display: flex;
  }
  .main-nav {
    position: fixed;
    top: 0;
    right: -100%;
    width: 75%;
    max-width: 320px;
    height: 100vh;
    background-color: #ffffff;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 5rem 2rem 2rem 2rem;
    box-shadow: -5px 0 25px rgba(0,0,0,0.1);
    transition: right 0.35s ease-in-out;
    gap: 1.5rem;
    z-index: 1000;
  }
  .main-nav.is-open {
    right: 0;
  }
  .main-nav a {
    font-size: 1rem;
    width: 100%;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid #f0f0f0;
  }
  .main-nav a.activo {
    border-bottom: 2px solid #000;
  }
  .btn-nav-cotizar {
    width: 100%;
    text-align: center;
    padding: 0.9rem;
  }
}
</style>