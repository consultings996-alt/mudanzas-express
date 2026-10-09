<script setup>
import { ref } from 'vue'
import { SITE_DATA } from './config/siteData.js'
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
    <!-- Header principal con efecto Glassmorphism -->
    <header class="main-header">
      <div class="header-container">
        <div class="logo-wrapper" @click="cambiarVista('inicio')">
          <div class="logo-icon">🚛</div>
          <span class="logo-text">{{ SITE_DATA.empresa.nombre }}</span>
        </div>

        <button
          class="hamburger"
          :class="{ 'is-active': menuAbierto }"
          @click="menuAbierto = !menuAbierto"
          aria-label="Abrir menú"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav class="main-nav" :class="{ 'is-open': menuAbierto }">
          <a
            v-for="link in SITE_DATA.navegacion.links"
            :key="link.id"
            href="#"
            @click.prevent="cambiarVista(link.id)"
            :class="{ activo: vistaActual === link.id }"
          >
            {{ link.texto }}
          </a>

          <button class="btn-nav-cotizar" @click="cambiarVista('inicio')">
            {{ SITE_DATA.navegacion.botonCotizar }} ⚡
          </button>
        </nav>
      </div>

      <!-- Backdrop para menú móvil -->
      <div
        v-if="menuAbierto"
        class="menu-backdrop"
        @click="menuAbierto = false"
      ></div>
    </header>

    <!-- Contenido dinámico según vista -->
    <main class="main-content">
      <Transition name="fade" mode="out-in">
        <div :key="vistaActual" class="view-wrapper">
          <HeroForm v-if="vistaActual === 'inicio'" />
          <Services v-else-if="vistaActual === 'servicios'" />
          <Warranty v-else-if="vistaActual === 'garantia'" />
          <Opinions v-else-if="vistaActual === 'opiniones'" />
          <FaqAccordion v-else-if="vistaActual === 'preguntas'" />
        </div>
      </Transition>
    </main>

    <!-- Pie de página y Widget flotante de WhatsApp -->
    <FooterLocation @navigate="cambiarVista" />
    <WhatsappFloat />
  </div>
</template>

<style scoped>
.page-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  font-family: var(--font-body);
  background-color: #ffffff;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.view-wrapper {
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.main-header {
  position: sticky;
  top: 0;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(226, 232, 240, 0.8);
  box-shadow: 0 4px 20px rgba(15, 23, 42, 0.03);
}

.header-container {
  max-width: 1300px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.1rem 5%;
}

.logo-wrapper {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  cursor: pointer;
  user-select: none;
  transition: transform 0.2s ease;
}

.logo-wrapper:hover {
  transform: translateY(-1px);
}

.logo-icon {
  font-size: 1.8rem;
  line-height: 1;
}

.logo-text {
  font-size: 1.6rem;
  font-family: var(--font-title);
  font-weight: 800;
  color: var(--color-dark);
  letter-spacing: -0.03em;
}

.main-nav {
  display: flex;
  align-items: center;
  gap: 2.2rem;
}

.main-nav a {
  text-decoration: none;
  color: var(--color-text-muted);
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  transition: all 0.25s ease;
  position: relative;
  padding: 0.4rem 0;
}

.main-nav a::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0%;
  height: 2px;
  background-color: var(--color-primary);
  transition: width 0.3s ease;
  border-radius: 2px;
}

.main-nav a:hover, .main-nav a.activo {
  color: var(--color-dark);
}

.main-nav a.activo::after, .main-nav a:hover::after {
  width: 100%;
}

.btn-nav-cotizar {
  background: var(--color-dark);
  color: #ffffff;
  border: none;
  padding: 0.75rem 1.6rem;
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  cursor: pointer;
  border-radius: var(--radius-md);
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.15);
}

.btn-nav-cotizar:hover {
  background: var(--color-primary);
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(220, 38, 38, 0.35);
}

.hamburger {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 30px;
  height: 22px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 1002;
}

.hamburger span {
  width: 100%;
  height: 3px;
  background-color: var(--color-dark);
  border-radius: 3px;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  transform-origin: left center;
}

.hamburger.is-active span:nth-child(1) {
  transform: rotate(45deg);
}

.hamburger.is-active span:nth-child(2) {
  opacity: 0;
}

.hamburger.is-active span:nth-child(3) {
  transform: rotate(-45deg);
}

.menu-backdrop {
  display: none;
}

@media (max-width: 992px) {
  .hamburger {
    display: flex;
  }

  .menu-backdrop {
    display: block;
    position: fixed;
    inset: 0;
    background: rgba(15, 23, 42, 0.4);
    backdrop-filter: blur(4px);
    z-index: 999;
  }

  .main-nav {
    position: fixed;
    top: 0;
    right: -100%;
    width: 82%;
    max-width: 340px;
    height: 100vh;
    background-color: #ffffff;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 6rem 2rem 2.5rem 2rem;
    box-shadow: -10px 0 30px rgba(0, 0, 0, 0.15);
    transition: right 0.35s cubic-bezier(0.16, 1, 0.3, 1);
    gap: 1.2rem;
    z-index: 1000;
  }

  .main-nav.is-open {
    right: 0;
  }

  .main-nav a {
    font-size: 1.05rem;
    width: 100%;
    padding: 0.8rem 0;
    border-bottom: 1px solid #f1f5f9;
  }

  .btn-nav-cotizar {
    width: 100%;
    text-align: center;
    padding: 1rem;
    margin-top: 1rem;
  }
}
</style>