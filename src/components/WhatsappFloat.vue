<script setup>
import { ref, onMounted } from 'vue'
import { SITE_DATA } from '../config/siteData.js'

const mostrarGlobo = ref(false)
const mensajeTexto = SITE_DATA.whatsappFlotante.mensajePredeterminado
const enlaceWhatsApp = `https://wa.me/${SITE_DATA.empresa.whatsappNumero}?text=${encodeURIComponent(mensajeTexto)}`

onMounted(() => {
  setTimeout(() => {
    mostrarGlobo.value = true
  }, 2500)
})
</script>

<template>
  <div class="whatsapp-float-container">
    <Transition name="fade-pop">
      <a 
        v-if="mostrarGlobo" 
        :href="enlaceWhatsApp" 
        target="_blank" 
        rel="noopener noreferrer" 
        class="whatsapp-badge"
      >
        <p>{{ SITE_DATA.whatsappFlotante.badgeTexto }}</p>
        <button type="button" class="close-badge-btn" @click.prevent.stop="mostrarGlobo = false" aria-label="Cerrar aviso">×</button>
      </a>
    </Transition>

    <a 
      :href="enlaceWhatsApp" 
      target="_blank" 
      rel="noopener noreferrer" 
      class="btn-whatsapp-float" 
      title="Chatear por WhatsApp"
      aria-label="Contactar por WhatsApp"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="whatsapp-svg-icon">
        <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
      </svg>
      <div class="pulse-ring"></div>
    </a>
  </div>
</template>

<style scoped>
.whatsapp-float-container {
  position: fixed;
  bottom: 28px;
  right: 28px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  z-index: 9999;
  gap: 12px;
  font-family: var(--font-body);
}

.btn-whatsapp-float {
  position: relative;
  width: 62px;
  height: 62px;
  background-color: #25d366;
  border-radius: 50%;
  box-shadow: 0 8px 24px rgba(37, 211, 102, 0.45);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.btn-whatsapp-float:hover {
  transform: scale(1.12);
  background-color: #20ba5a;
}

.whatsapp-svg-icon {
  width: 34px;
  height: 34px;
  fill: #ffffff;
}

.pulse-ring {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 2px solid #25d366;
  border-radius: 50%;
  box-sizing: border-box;
  animation: whatsapp-pulse 2s infinite ease-out;
  pointer-events: none;
}

@keyframes whatsapp-pulse {
  0% { transform: scale(1); opacity: 1; }
  100% { transform: scale(1.45); opacity: 0; }
}

.whatsapp-badge {
  background-color: #ffffff;
  color: var(--color-dark);
  padding: 12px 36px 12px 16px;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-xl);
  font-size: 0.9rem;
  font-weight: 700;
  max-width: 250px;
  position: relative;
  cursor: pointer;
  border-left: 5px solid #25d366;
  text-decoration: none;
  display: block;
}

.whatsapp-badge p {
  margin: 0;
  line-height: 1.4;
}

.close-badge-btn {
  position: absolute;
  top: 6px;
  right: 8px;
  background: none;
  border: none;
  font-size: 1.2rem;
  color: var(--color-text-muted);
  cursor: pointer;
}

.close-badge-btn:hover { color: var(--color-dark); }

.fade-pop-enter-active, .fade-pop-leave-active {
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.fade-pop-enter-from, .fade-pop-leave-to {
  opacity: 0;
  transform: translateY(15px) scale(0.9);
}

@media (max-width: 768px) {
  .whatsapp-float-container { bottom: 20px; right: 20px; }
  .btn-whatsapp-float { width: 56px; height: 56px; }
  .whatsapp-svg-icon { width: 30px; height: 30px; }
  .whatsapp-badge { font-size: 0.85rem; max-width: 210px; }
}
</style>