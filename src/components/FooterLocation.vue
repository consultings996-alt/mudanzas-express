<script setup>
</script>

<template>
  <footer class="site-footer">
    <div class="location-container">
      <div class="map-wrapper">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3763.298715104642!2d-99.1578335!3d19.3995874!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1ff0c13144a83%3A0xc47bcf1cc1795c64!2sPet%C3%A9n%20227%2C%20Narvarte%20Poniente%2C%20Benito%20Ju%C3%A1rez%2C%2003023%20Ciudad%20de%20M%C3%A9xico%2C%20CDMX!5e0!3m2!1ses-419!2smx!4v1700000000000!5m2!1ses-419!2smx"
          width="100%" 
          height="350" 
          style="border:0;" 
          allowfullscreen="" 
          loading="lazy" 
          referrerpolicy="no-referrer-when-downgrade">
        </iframe>
      </div>
      
      <div class="info-wrapper">
        <h2>Base Operativa Narvarte CDMX</h2>
        <p class="address"><strong>Dirección:</strong> Petén 227, Narvarte Poniente, Benito Juárez, 03023 Ciudad de México, CDMX</p>
        <p class="phone"><strong>Teléfono Principal:</strong> +52 55 3111 3181</p>
        <p class="hours"><strong>Horarios:</strong> Lunes a Domingo de 07:00 a 21:00 hrs.</p>
      </div>
    </div>

    <div class="directory-container">
      <div class="directory-grid">
        <div class="brand-column">
          <h3 class="footer-logo">Mudanzas Express</h3>
          <p>Empresa líder en transportes de mudanza locales y fletes urgentes en la Ciudad de México. Seguridad y confianza en cada viaje.</p>
        </div>
        
        <div class="links-column">
          <h4>SERVICIOS LOGÍSTICOS</h4>
          <ul>
            <li>Mudanza Residencial</li>
            <li>Fletes Express Urgentes</li>
            <li>Volado de Muebles CDMX</li>
          </ul>
        </div>
        
        <div class="links-column">
          <h4>ZONAS DE COBERTURA</h4>
          <ul>
            <li>Narvarte Poniente / Oriente</li>
            <li>Colonia Del Valle</li>
            <li>Alcaldía Benito Juárez / CDMX</li>
          </ul>
        </div>
      </div>
      
      <div class="footer-bottom">
        <p>© 2026 Mudanzas Express CDMX. Todos los derechos reservados. mudanzasexpress.mx</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.site-footer { background-color: #ffffff; color: #333; }

.location-container { display: flex; flex-wrap: wrap; max-width: 1200px; margin: 0 auto; padding: 5rem 2rem; gap: 4rem; align-items: center; }
.map-wrapper { flex: 1.2; min-width: 320px; border: 1px solid #e0e0e0; border-radius: 4px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.02); }
.info-wrapper { flex: 1; min-width: 320px; }
.info-wrapper h2 { font-size: 2.2rem; margin-bottom: 1.5rem; color: #111; line-height: 1.2; font-family: var(--font-title); }
.info-wrapper p { margin-bottom: 1.2rem; font-size: 1rem; color: #555; line-height: 1.6; font-family: var(--font-body); }
.info-wrapper strong { color: #111; }

.directory-container { background-color: var(--color-dark); color: #888; padding: 5rem 2rem 2rem 2rem; }
.directory-grid { max-width: 1200px; margin: 0 auto; display: flex; flex-wrap: wrap; gap: 3rem; justify-content: space-between; }
.brand-column { flex: 2; min-width: 260px; }
.brand-column p { line-height: 1.7; margin-top: 1.2rem; font-size: 0.95rem; color: #777; }
.footer-logo { color: #fff; font-size: 1.6rem; margin: 0; letter-spacing: 0.5px; font-family: var(--font-title); }

.links-column { flex: 1; min-width: 200px; }
.links-column h4 { color: #555; font-size: 0.8rem; letter-spacing: 1px; margin-bottom: 1.5rem; font-family: var(--font-body); font-weight: 700; }
.links-column ul { list-style: none; padding: 0; margin: 0; }
.links-column li { margin-bottom: 0.9rem; font-size: 0.9rem; color: #aaa; font-family: var(--font-body); }

.footer-bottom { max-width: 1200px; margin: 4rem auto 0 auto; padding-top: 1.5rem; border-top: 1px solid #222; font-size: 0.8rem; color: #444; text-align: center; font-family: var(--font-body); }

@media (max-width: 768px) {
  .location-container { padding: 4rem 1.5rem; gap: 2.5rem; flex-direction: column-reverse; }
  .info-wrapper h2 { font-size: 1.8rem; }
  .directory-grid { flex-direction: column; gap: 2.5rem; }
  .directory-container { padding: 4rem 1.5rem 2rem 1.5rem; }
}
</style>