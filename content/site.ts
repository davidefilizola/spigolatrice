/**
 * Unica fonte di verità del sito.
 * Per creare un nuovo sito basta modificare questo file.
 * Tutti i testi sono bilingui (it / en).
 */
export const site = {
  // ─── Identità ────────────────────────────────────────────────
  name: 'Casa Esempio',
  url: 'https://casaesempio.it',

  // ─── Contatti ────────────────────────────────────────────────
  contact: {
    email: 'info@casaesempio.it',
    phone: '+39 000 000 0000',
    address: 'Via Esempio 1, 00000 Città (XX)',
    coordinates: { lat: 41.9028, lng: 12.4964 },
    // Messaggio precompilato per WhatsApp. Il numero viene derivato da `phone`.
    whatsappMessage: {
      it: 'Ciao! Vorrei avere informazioni.',
      en: 'Hi! I would like some information.',
    },
  },

  // ─── Social ──────────────────────────────────────────────────
  social: {
    instagram: 'https://instagram.com/',
    facebook: 'https://facebook.com/',
  },

  // ─── SEO ─────────────────────────────────────────────────────
  seo: {
    keywords: ['parola chiave 1', 'parola chiave 2', 'parola chiave 3'],
    ogImage: '/images/og-image.svg',
  },

  // ─── Navigazione (Header + Footer) ───────────────────────────
  // `href` può essere un anchor (#chi-siamo) o un path assoluto sotto il locale (/galleria).
  nav: [
    { href: '#chi-siamo', label: { it: 'Chi siamo', en: 'About' } },
    { href: '#servizi', label: { it: 'Servizi', en: 'Services' } },
    { href: '/galleria', label: { it: 'Galleria', en: 'Gallery' } },
    { href: '#faq', label: { it: 'FAQ', en: 'FAQ' } },
    { href: '#contatti', label: { it: 'Contatti', en: 'Contact' } },
  ],

  // ─── Hero ────────────────────────────────────────────────────
  hero: {
    eyebrow: { it: 'Benvenuti', en: 'Welcome' },
    title: {
      it: 'Benvenuti nel nostro mondo',
      en: 'Welcome to our world',
    },
    subtitle: {
      it: 'Un posto autentico dove scoprire qualcosa di unico. Vieni a trovarci e lasciati sorprendere.',
      en: 'An authentic place to discover something unique. Come visit us and let yourself be surprised.',
    },
    image: 'https://picsum.photos/seed/casa-hero/1920/1080',
    cta: { it: 'Scrivici ora', en: 'Get in touch' },
  },

  // ─── About ───────────────────────────────────────────────────
  about: {
    eyebrow: { it: 'La nostra storia', en: 'Our story' },
    title: { it: 'Chi siamo e cosa facciamo', en: 'Who we are and what we do' },
    image: 'https://picsum.photos/seed/casa-about/1200/900',
    body: [
      {
        it: "Siamo una piccola realtà nata dalla passione e dall'amore per quello che facciamo. Ogni giorno ci impegniamo per offrire il meglio a chi ci sceglie, con cura per ogni dettaglio.",
        en: 'We are a small reality born from passion and love for what we do. Every day we strive to offer the best to those who choose us, with care for every detail.',
      },
      {
        it: 'La nostra filosofia è semplice: qualità, autenticità e rispetto. Valori che trasmettiamo in ogni cosa che facciamo.',
        en: 'Our philosophy is simple: quality, authenticity and respect. Values we convey in everything we do.',
      },
    ],
  },

  // ─── Servizi ─────────────────────────────────────────────────
  services: {
    eyebrow: { it: 'Quello che offriamo', en: 'What we offer' },
    title: { it: 'I nostri servizi', en: 'Our services' },
    items: [
      {
        icon: '🌿',
        image: 'https://picsum.photos/seed/casa-service1/800/600',
        title: { it: 'Primo Servizio', en: 'First Service' },
        description: {
          it: 'Una descrizione breve e chiara del primo servizio che offriamo. Cambia questo testo con quello che fa al caso tuo.',
          en: 'A short and clear description of the first service we offer. Replace this text with what suits your business.',
        },
      },
      {
        icon: '🏡',
        image: 'https://picsum.photos/seed/casa-service2/800/600',
        title: { it: 'Secondo Servizio', en: 'Second Service' },
        description: {
          it: 'Una descrizione breve e chiara del secondo servizio. Puoi aggiungere o rimuovere elementi liberamente.',
          en: 'A short and clear description of the second service. You can freely add or remove elements.',
        },
      },
      {
        icon: '✨',
        image: 'https://picsum.photos/seed/casa-service3/800/600',
        title: { it: 'Terzo Servizio', en: 'Third Service' },
        description: {
          it: 'Una descrizione breve e chiara del terzo servizio. Il design si adatta automaticamente al numero di elementi.',
          en: 'A short and clear description of the third service. The design automatically adapts to the number of items.',
        },
      },
    ],
  },

  // ─── Galleria ────────────────────────────────────────────────
  // width/height: dimensioni dell'immagine (servono al masonry layout).
  // caption: opzionale, appare nel lightbox.
  // Le prime 5 vengono mostrate in homepage (bento). Tutte appaiono su /galleria (masonry).
  gallery: {
    title: { it: 'Galleria', en: 'Gallery' },
    intro: {
      it: 'Uno sguardo attraverso il nostro mondo, raccolto in immagini.',
      en: 'A glimpse through our world, collected in images.',
    },
    viewAll: { it: 'Vedi tutta la galleria', en: 'View all photos' },
    images: [
      // layout: 'full' (span 2 cols, landscape) | 'half' (1 col, square-ish) | 'tall' (1 col × 2 rows, portrait)
      // Sequenza demo: pattern variato che mostra tutti i tipi di moduli Airbnb-style
      { src: 'https://picsum.photos/seed/casa-g1/1600/900',  alt: 'Vista panoramica', width: 1600, height: 900,  layout: 'full', caption: { it: 'Vista panoramica al tramonto', en: 'Panoramic sunset view' } },
      { src: 'https://picsum.photos/seed/casa-g2/800/800',   alt: 'Cortile',           width: 800,  height: 800,  layout: 'half', caption: { it: 'Primavera nel cortile',        en: 'Spring in the courtyard' } },
      { src: 'https://picsum.photos/seed/casa-g3/800/800',   alt: 'Dettaglio antico',  width: 800,  height: 800,  layout: 'half', caption: { it: 'Particolare antico',           en: 'Antique detail' } },
      { src: 'https://picsum.photos/seed/casa-g4/800/800',   alt: 'Salone',            width: 800,  height: 800,  layout: 'half', caption: { it: 'Il salone principale',         en: 'The main hall' } },
      { src: 'https://picsum.photos/seed/casa-g5/800/1200',  alt: 'Facciata',          width: 800,  height: 1200, layout: 'tall', caption: { it: 'Dettaglio della facciata',     en: 'Façade detail' } },
      { src: 'https://picsum.photos/seed/casa-g6/800/800',   alt: 'Cucina',            width: 800,  height: 800,  layout: 'half', caption: { it: 'Cucina tradizionale',          en: 'Traditional kitchen' } },
      { src: 'https://picsum.photos/seed/casa-g7/1600/800',  alt: 'Notturno',          width: 1600, height: 800,  layout: 'full', caption: { it: 'Notturno',                      en: 'Nighttime' } },
      { src: 'https://picsum.photos/seed/casa-g8/800/800',   alt: 'Giardino',          width: 800,  height: 800,  layout: 'half', caption: { it: 'Il giardino',                   en: 'The garden' } },
      { src: 'https://picsum.photos/seed/casa-g9/800/800',   alt: 'Angolo lettura',    width: 800,  height: 800,  layout: 'half', caption: { it: "L'angolo lettura",             en: 'The reading nook' } },
      { src: 'https://picsum.photos/seed/casa-g10/800/1200', alt: 'Lucernario',        width: 800,  height: 1200, layout: 'tall', caption: { it: 'Lucernario al mattino',         en: 'Morning skylight' } },
      { src: 'https://picsum.photos/seed/casa-g11/800/800',  alt: 'Scala',             width: 800,  height: 800,  layout: 'half', caption: { it: 'Scala in legno',               en: 'Wooden staircase' } },
      { src: 'https://picsum.photos/seed/casa-g12/800/800',  alt: 'Ingresso',          width: 800,  height: 800,  layout: 'half', caption: { it: "L'ingresso",                   en: 'The entrance' } },
    ],
  },

  // ─── CTA banner ──────────────────────────────────────────────
  cta: {
    title: { it: 'Vuoi saperne di più?', en: 'Want to know more?' },
    description: {
      it: 'Contattaci, saremo felici di rispondere a ogni tua domanda.',
      en: "Contact us, we'll be happy to answer any of your questions.",
    },
    button: { it: 'Scrivici ora', en: 'Get in touch' },
  },

  // ─── FAQ ─────────────────────────────────────────────────────
  faq: {
    title: { it: 'Domande frequenti', en: 'Frequently asked questions' },
    items: [
      {
        q: { it: 'Come posso contattarvi?', en: 'How can I contact you?' },
        a: {
          it: 'Puoi contattarci via email o telefono. Risponderemo entro 24 ore dalla tua richiesta.',
          en: 'You can contact us by email or phone. We will respond within 24 hours of your request.',
        },
      },
      {
        q: { it: 'Dove siete situati?', en: 'Where are you located?' },
        a: {
          it: 'Siamo facilmente raggiungibili. Puoi trovare la nostra posizione esatta nella sezione contatti con la mappa.',
          en: 'We are easily reachable. You can find our exact location in the contact section with the map.',
        },
      },
      {
        q: { it: 'Quali sono gli orari?', en: 'What are your hours?' },
        a: {
          it: 'Siamo operativi dal lunedì al venerdì dalle 9 alle 18. Il sabato mattina su appuntamento.',
          en: 'We are open Monday to Friday from 9am to 6pm. Saturday morning by appointment.',
        },
      },
      {
        q: {
          it: 'Come posso prenotare o richiedere informazioni?',
          en: 'How can I book or request information?',
        },
        a: {
          it: 'Usa il modulo di contatto, oppure scrivici direttamente via email o telefono.',
          en: 'Use the contact form, or write to us directly by email or phone.',
        },
      },
    ],
  },

  // ─── Sezione contatti (form) ─────────────────────────────────
  contactSection: {
    title: { it: 'Contattaci', en: 'Contact us' },
    form: {
      name: { it: 'Il tuo nome', en: 'Your name' },
      email: { it: 'La tua email', en: 'Your email' },
      message: { it: 'Il tuo messaggio', en: 'Your message' },
      send: { it: 'Invia messaggio', en: 'Send message' },
      success: {
        it: 'Messaggio inviato! Ti risponderemo presto.',
        en: 'Message sent! We will get back to you soon.',
      },
      error: {
        it: 'Si è verificato un errore. Riprova o scrivici via email.',
        en: 'An error occurred. Please try again or write to us by email.',
      },
    },
  },

  // ─── Footer ──────────────────────────────────────────────────
  footer: {
    rights: { it: 'Tutti i diritti riservati', en: 'All rights reserved' },
  },

  // ─── Theme toggle (a11y) ─────────────────────────────────────
  theme: {
    toggleDark: { it: 'Attiva modalità scura', en: 'Enable dark mode' },
    toggleLight: { it: 'Attiva modalità chiara', en: 'Enable light mode' },
  },
} as const
