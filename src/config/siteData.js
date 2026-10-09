/**
 * ==============================================================================
 * ARCHIVO PRINCIPAL DE CONFIGURACIÓN Y TEXTOS (SITE DATA)
 * ==============================================================================
 * Este archivo contiene TODOS los textos, datos de contacto, enlaces, precios,
 * testimonios, preguntas frecuentes y configuración general del sitio web.
 *
 * Si necesitas personalizar esta página para otra empresa o cliente,
 * SOLO EDITA LOS VALORES DE ESTE ARCHIVO sin modificar el código de la aplicación.
 * ==============================================================================
 */

export const SITE_DATA = {
  // ----------------------------------------------------
  // 1. INFORMACIÓN DE LA EMPRESA Y CONTACTO
  // ----------------------------------------------------
  empresa: {
    nombre: 'Mudanzas Express',
    slogan: 'SERVICIO EXPRESS LOCAL Y FORÁNEO',
    telefonoContacto: '+52 55 3111 3181',
    whatsappNumero: '5212381476695', // Número con código de país sin signo + ni espacios (Ej. 5215531113181)
    whatsappFormato: '55 3111 3181',
    emailContacto: 'contacto@mudanzasexpress.mx',
    horarioAtencion: 'Lunes a Domingo de 07:00 a 21:00 hrs',
    baseOperativa: 'Base Operativa Narvarte CDMX',
    direccion: 'Petén 227, Narvarte Poniente, Benito Juárez, 03023 Ciudad de México, CDMX',
    mapaEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3763.298715104642!2d-99.1578335!3d19.3995874!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1ff0c13144a83%3A0xc47bcf1cc1795c64!2sPet%C3%A9n%20227%2C%20Narvarte%20Poniente%2C%20Benito%20Ju%C3%A1rez%2C%2003023%20Ciudad%20de%20M%C3%A9xico%2C%20CDMX!5e0!3m2!1ses-419!2smx!4v1700000000000!5m2!1ses-419!2smx',
    colores: {
      primario: '#dc2626',       // Rojo corporativo vibrante
      primarioHover: '#b91c1c',  // Rojo más oscuro para hovers
      secundario: '#0f172a',     // Azul muy oscuro / Slate para encabezados y fondos oscuros
      fondoClaro: '#f8fafc',     // Fondo neutro suave
      acento: '#10b981'          // Verde esmeralda para badges y confirmaciones
    }
  },

  // ----------------------------------------------------
  // 2. NAVEGACIÓN PRINCIPAL
  // ----------------------------------------------------
  navegacion: {
    links: [
      { id: 'inicio', texto: 'INICIO' },
      { id: 'servicios', texto: 'SERVICIOS' },
      { id: 'garantia', texto: 'GARANTÍA' },
      { id: 'opiniones', texto: 'OPINIONES' },
      { id: 'preguntas', texto: 'PREGUNTAS' }
    ],
    botonCotizar: 'COTIZAR AHORA'
  },

  // ----------------------------------------------------
  // 3. HERO / PORTADA Y FORMULARIO DE COTIZACIÓN
  // ----------------------------------------------------
  hero: {
    tagline: '⚡ FLETES & MUDANZAS CDMX Y NACIONAL',
    tituloParte1: 'Mudanzas sin estrés en la ',
    tituloDestacado: 'CDMX.',
    descripcion: 'Llegamos a tiempo, protegemos tus pertenencias con empaque premium y garantizamos el mejor precio operativo en Narvarte, Del Valle y toda la Ciudad de México.',
    calificacionScore: '4.9',
    estrellas: '★★★★★',
    resenasTexto: 'Más de 250+ opiniones reales en Google Maps',
    mencionCalidad: '100% Satisfacción garantizada',
    formulario: {
      titulo: 'Cotiza tu Mudanza en 1 Minuto',
      subtitulo: 'La opción más rápida, segura y transparente de CDMX.',
      labelNombre: 'TU NOMBRE COMPLETO',
      placeholderNombre: 'Ej. Roberto Aguilar',
      labelTelefono: 'TELÉFONO / WHATSAPP',
      placeholderTelefono: 'Ej. 55 1234 5678',
      labelOrigen: 'ORIGEN',
      placeholderOrigen: '📍 Toca para elegir en mapa',
      labelDestino: 'DESTINO',
      placeholderDestino: '📍 Toca para elegir en mapa',
      labelServicio: 'TIPO DE SERVICIO REQUERIDO',
      labelDetalles: 'DETALLES ADICIONALES (¿PISOS POR ESCALERA?, ¿VOLADO?)',
      placeholderDetalles: 'Menciona si hay muebles pesados, cajas o mudanzas de última hora...',
      botonTexto: 'COTIZAR VÍA WHATSAPP EXPRESS 💬',
      notaPie: '⚡ Respuesta inmediata y presupuesto sin compromiso.',
      opcionesServicio: [
        'Mudanza Residencial Completa',
        'Fletes y Traslados Express Urgentes',
        'Maniobras Complejas y Volado de Muebles',
        'Mudanza Corporativa y de Oficinas',
        'Traslado Foráneo Nacional'
      ]
    }
  },

  // ----------------------------------------------------
  // 4. SECCIÓN DE SERVICIOS E INFRAESTRUCTURA (FLOTA)
  // ----------------------------------------------------
  serviciosSection: {
    tagline: 'NUESTRAS ESPECIALIDADES',
    titulo: 'Servicios logísticos a la medida de tus necesidades',
    descripcion: 'Ofrecemos soluciones personalizadas para traslados habitacionales, comerciales e industriales con personal altamente calificado.',
    lista: [
      {
        id: 'residencial',
        icon: '📦',
        titulo: 'Mudanza Residencial',
        descripcion: 'Servicio completo para casas y departamentos. Incluye empaque premium de muebles, protección de electrónicos y acomodo estratégico.',
        caracteristicas: ['Empaque con emplaye', 'Mantas de alto impacto', 'Carga y descarga cuidadosa']
      },
      {
        id: 'express',
        icon: '⚡',
        titulo: 'Fletes y Traslados Express',
        descripcion: 'Ideal para mover pocos objetos, mercancías o compras de última hora con salidas inmediatas dentro de la CDMX y área metropolitana.',
        caracteristicas: ['Salida inmediata', 'Precios por viaje', 'Unidades ágiles']
      },
      {
        id: 'volado',
        icon: '🏗️',
        titulo: 'Maniobras y Volado',
        descripcion: 'Contamos con equipo certificado, arneses y personal capacitado para el volado de muebles por fachadas, balcones o ventanas.',
        caracteristicas: ['Poleas y arneses de carga', 'Personal certificado', 'Cero daños garantizados']
      },
      {
        id: 'oficinas',
        icon: '🏢',
        titulo: 'Mudanzas Corporativas',
        descripcion: 'Traslado ágil de mobiliario de oficina, equipos de cómputo y archivo muerto con mínimo impacto en tu operación.',
        caracteristicas: ['Etiquetado de inventario', 'Atención fines de semana', 'Facturación disponible']
      }
    ],

    flotaTitulo: 'Nuestra Infraestructura de Carga',
    flotaSubtitulo: 'Contamos con unidades monitoreadas en tiempo real con GPS y adaptadas para proteger tu patrimonio en cada traslado.',
    unidades: [
      {
        tipo: 'Nissan Copetona',
        capacidad: '1.5 Toneladas',
        volumen: '14 m³',
        ideal: 'Fletes express y departamentos pequeños (1 recámara)',
        badgeColor: '#2563eb'
      },
      {
        tipo: 'Camión Ford 350',
        capacidad: '3.5 Toneladas',
        volumen: '26 m³',
        ideal: 'Casas medianas o departamentos de 2 a 3 recámaras',
        badgeColor: '#059669'
      },
      {
        tipo: 'Camión Rabón Cerrado',
        capacidad: '8.0 Toneladas',
        volumen: '50 m³',
        ideal: 'Residencias grandes, corporativos o traslados foráneos',
        badgeColor: '#7c3aed'
      }
    ]
  },

  // ----------------------------------------------------
  // 5. GARANTÍAS Y PROTOCOLOS DE SEGURIDAD
  // ----------------------------------------------------
  garantiaSection: {
    tagline: 'PROTOCOLO DE CUIDADO DE ACTIVOS',
    titulo: '¿Por qué nuestra empresa es la opción ',
    tituloDestacado: 'más confiable?',
    intro: 'Construimos procesos claros de mudanza basados en la honestidad, la puntualidad y la seguridad física de tu patrimonio en cada kilómetro del trayecto.',
    protocolos: [
      {
        numero: '01',
        titulo: 'Emplayado e Inventariado Sistemático',
        descripcion: 'Toda tu carga viaja completamente protegida con película plástica de alta resistencia y mantas de protección industrial sin ningún costo adicional.'
      },
      {
        numero: '02',
        titulo: 'Operadores Identificados y Monitoreados',
        descripcion: 'Contamos con un equipo humano de absoluta confianza, con años de experiencia operando rutas críticas y maniobras de carga en la Ciudad de México.'
      },
      {
        numero: '03',
        titulo: 'Flota con Rastreo Satelital Activo GPS',
        descripcion: 'Nuestras unidades de transporte integran sistemas de geolocalización en tiempo real para brindarte monitoreo continuo durante todo el traslado.'
      },
      {
        numero: '04',
        titulo: 'Cotizaciones Claras Sin Costos Ocultos',
        descripcion: 'Respetamos el precio pactado desde el inicio sin sorpresas al finalizar el servicio. Transparencia total garantizada.'
      }
    ]
  },

  // ----------------------------------------------------
  // 6. TESTIMONIOS Y REPUTACIÓN
  // ----------------------------------------------------
  opinionesSection: {
    tagline: '— REPUTACIÓN VERIFICADA DE CLIENTES',
    titulo: 'La experiencia de quienes ya se ',
    tituloDestacado: 'mudaron con nosotros.',
    scorePromedio: '4.9',
    estrellas: '★★★★★',
    resenasTotal: '250+ Calificaciones Reales',
    testimonios: [
      {
        id: 1,
        nombre: 'Carlos Mendoza',
        ubicacion: 'Narvarte Poniente',
        comentario: 'Tenía una mudanza urgente de Narvarte a Polanco en sábado. Llegaron a la hora acordada, protegieron mi sala y pantallas a la perfección. Gran servicio técnico.',
        estrellas: '★★★★★',
        fecha: 'Hace 1 semana',
        servicio: 'Mudanza Residencial'
      },
      {
        id: 2,
        nombre: 'Laura Beltrán',
        ubicacion: 'Colonia Del Valle',
        comentario: 'Excelente opción para mudanzas express en CDMX. El volado de mi refrigerador por el balcón lo hicieron súper rápido y sin ningún rasguño. Súper recomendados.',
        estrellas: '★★★★★',
        fecha: 'Hace 2 semanas',
        servicio: 'Volado de Muebles'
      },
      {
        id: 3,
        nombre: 'Ing. Fernando Rios',
        ubicacion: 'Condesa / Roma',
        comentario: 'Contratamos el servicio para mover la oficina corporativa. Puntuales, atentos y con facturación inmediata. Las unidades muy limpias y con GPS.',
        estrellas: '★★★★★',
        fecha: 'Hace 1 mes',
        servicio: 'Mudanza Corporativa'
      },
      {
        id: 4,
        nombre: 'Sofia Hernández',
        ubicacion: 'Coyoacán',
        comentario: 'Todo llegó impecable. El personal fue sumamente respetuoso y cuidadoso con mis cosas frágiles. Volvería a contratarlos sin duda.',
        estrellas: '★★★★★',
        fecha: 'Hace 1 mes',
        servicio: 'Flete Express'
      }
    ]
  },

  // ----------------------------------------------------
  // 7. PREGUNTAS FRECUENTES (FAQ)
  // ----------------------------------------------------
  faqSection: {
    tagline: 'TRANSPARENCIA Y RESPUESTAS DIRECTAS',
    titulo: 'Preguntas frecuentes sobre Mudanzas Express en CDMX',
    preguntas: [
      {
        id: 1,
        abierta: true,
        titulo: '¿Cuánto cuesta un servicio de mudanza express básica en la CDMX?',
        respuesta: 'Los precios de un flete o mudanza express varían según la distancia entre puntos, el volumen de los objetos y si se requieren maniobras complejas (como escaleras o volado de muebles). Contáctanos por WhatsApp para recibir una cotización transparente y parametrizada de inmediato.'
      },
      {
        id: 2,
        abierta: false,
        titulo: '¿Cuáles son las zonas con mayor cobertura de Mudanzas Express?',
        respuesta: 'Tenemos cobertura total en la Ciudad de México y área metropolitana, con presencia diaria destacada en Benito Juárez, Narvarte Oriente, Narvarte Poniente, Colonia Del Valle, Roma, Condesa, Coyoacán, Polanco, además de salidas a servicios foráneos a todo el país.'
      },
      {
        id: 3,
        abierta: false,
        titulo: '¿Qué tipo de protección e insumos incluye el servicio de mudanza?',
        respuesta: 'Todos nuestros servicios estándar incluyen empaque de protección con película plástica elástica de alta resistencia (emplayado) y el uso de mantas para mudanza de protección industrial sin ningún costo adicional.'
      },
      {
        id: 4,
        abierta: false,
        titulo: '¿Con cuánto tiempo de anticipación debo agendar mi mudanza?',
        respuesta: 'Recomendamos agendar con 2 a 5 días de anticipación para garantizar el horario de tu preferencia; sin embargo, contamos con unidades ágiles disponibles para servicios express urgentes el mismo día.'
      }
    ]
  },

  // ----------------------------------------------------
  // 8. FOOTER Y DIRECTORIO
  // ----------------------------------------------------
  footer: {
    bioEmpresa: 'Empresa líder en transportes de mudanza locales y fletes urgentes en la Ciudad de México. Seguridad, puntualidad y confianza en cada viaje.',
    tituloServicios: 'SERVICIOS LOGÍSTICOS',
    serviciosDirectorio: [
      'Mudanza Residencial Completa',
      'Fletes Express Urgentes',
      'Volado de Muebles CDMX',
      'Mudanza Corporativa'
    ],
    tituloCobertura: 'ZONAS DE COBERTURA',
    coberturaDirectorio: [
      'Narvarte Poniente / Oriente',
      'Colonia Del Valle / Roma / Condesa',
      'Alcaldía Benito Juárez / CDMX',
      'Servicios Foráneos Nacionales'
    ],
    copyright: '© 2026 Mudanzas Express CDMX. Todos los derechos reservados.'
  },

  // ----------------------------------------------------
  // 9. WIDGET FLOTANTE WHATSAPP
  // ----------------------------------------------------
  whatsappFlotante: {
    badgeTexto: '¿Necesitas cotizar rápido? ⚡',
    mensajePredeterminado: '¡Hola! Estoy visitando su página web y me gustaría solicitar información sobre un flete o mudanza express.'
  }
}
