/**
 * Unica fonte di verità del sito Spigolatrice di Lambrate.
 * Tre appartamenti in affitto breve a Milano, quartiere universitario Lambrate.
 */
export const site = {
  // ─── Identità ────────────────────────────────────────────────
  name: 'Spigolatrice di Lambrate',
  shortName: 'Spigolatrice',
  url: 'https://spigolatricedilambrate.com',

  // ─── Contatti ────────────────────────────────────────────────
  contact: {
    email: 'pamelapinna79@gmail.com',
    phone: '+39 339 4467784',
    address: 'Piazza Donegani, Milano',
    coordinates: { lat: 45.4845, lng: 9.2392 },
    whatsappMessage: {
      it: 'Ciao Pamela! Ti scrivo dal sito spigolatricedilambrate.com, vorrei informazioni sugli appartamenti.',
      en: "Hi Pamela! I'm writing from spigolatricedilambrate.com, I'd like info about the apartments.",
    },
  },

  // ─── Social ──────────────────────────────────────────────────
  social: {
    instagram: '',
    facebook: '',
    airbnbHost: 'https://www.airbnb.it/users/show/556885153',
  },

  // ─── SEO ─────────────────────────────────────────────────────
  seo: {
    keywords: [
      'affitti brevi milano',
      'appartamenti milano lambrate',
      'spigolatrice di lambrate',
      'casa vacanze milano',
      'milano quartiere universitario',
      'milan short term rental',
      'milan apartments lambrate',
      'lambrate apartments',
      'airbnb lambrate',
      'milano politecnico alloggio',
    ],
    ogImage: '/images/logo-og.png',
  },

  // ─── Navigazione ─────────────────────────────────────────────
  nav: [
    { href: '#case', label: { it: 'Le Case', en: 'Apartments' } },
    { href: '#chi-siamo', label: { it: 'Recensioni', en: 'Reviews' } },
    { href: '/quartiere', label: { it: 'Quartiere', en: 'Neighbourhood' } },
    { href: '/galleria', label: { it: 'Galleria', en: 'Gallery' } },
    { href: '#faq', label: { it: 'FAQ', en: 'FAQ' } },
    { href: '#contatti', label: { it: 'Contatti', en: 'Contact' } },
  ],

  // ─── Hero ────────────────────────────────────────────────────
  hero: {
    eyebrow: { it: 'Affitti brevi a Milano · Lambrate', en: 'Short-term stays in Milan · Lambrate' },
    title: {
      it: 'Tre case nel cuore universitario di Milano',
      en: "Three homes in Milan's university heart",
    },
    subtitle: {
      it: 'Spigolatrice di Lambrate è una piccola realtà di affitti brevi gestita con cura da Pamela. Tre appartamenti, lo stesso quartiere vivo a due passi dalla metro, a dieci minuti dal Duomo.',
      en: 'Spigolatrice di Lambrate is a small short-stay rental gently hosted by Pamela. Three apartments, the same lively neighbourhood two minutes from the metro, ten minutes from the Duomo.',
    },
    image: '/images/case/buschi/01.jpg',
    cta: { it: 'Scopri le case', en: 'Discover the homes' },
  },

  // ─── About ───────────────────────────────────────────────────
  about: {
    eyebrow: { it: 'Chi siamo', en: 'Who we are' },
    title: { it: 'Tre case, una sola cura per gli ospiti', en: 'Three homes, one care for guests' },
    image: '/images/case/donegani/02.jpg',
    body: [
      {
        it: 'Spigolatrice di Lambrate nasce dalla passione di Pamela per la sua città e per l\'accoglienza. Da oltre dieci anni accompagniamo viaggiatori, studenti, famiglie e professionisti che visitano Milano: oggi gestiamo tre appartamenti, tutti nel quartiere universitario di Lambrate, ciascuno con la sua personalità.',
        en: "Spigolatrice di Lambrate was born from Pamela's love for her city and for hospitality. For more than ten years we have hosted travellers, students, families and professionals visiting Milan. Today we run three apartments, all in Milan's Lambrate university district — each with its own personality.",
      },
      {
        it: 'Tre case "amate dagli ospiti" su Airbnb, con valutazioni medie tra 4,92 e 4,99 stelle. La differenza la fa l\'attenzione ai dettagli: check-in flessibile, comunicazione in tempo reale, case sempre pulite e attrezzate con tutto il necessario.',
        en: 'Three "Guest Favorite" homes on Airbnb, with average ratings between 4.92 and 4.99. The difference is in the details: flexible check-in, real-time communication, spotless homes equipped with everything you need.',
      },
    ],
  },

  // ─── Quartiere (condiviso fra le 3 case) ─────────────────────
  neighborhood: {
    eyebrow: { it: 'Lambrate · Milano', en: 'Lambrate · Milan' },
    title: { it: 'Un quartiere vivo, sicuro e ben collegato', en: 'A lively, safe and well-connected neighbourhood' },
    intro: {
      it: 'Lambrate è il quartiere universitario di Milano: vivace ma silenzioso quando serve, sicuro a tutte le ore, pieno di servizi sotto casa e a due passi dai principali punti di interesse della città.',
      en: 'Lambrate is the university district of Milan: lively but quiet when needed, safe at all hours, full of amenities on your doorstep and just steps from the city\'s main highlights.',
    },
    body: [
      {
        it: 'Tutte e tre le case si trovano nel quartiere universitario di Lambrate, una delle aree più vivaci di Milano: sicuro, ben servito, pieno di negozi, supermercati, ristoranti, bar e farmacie. Il supermercato Carrefour sotto casa è aperto dalle 7 a mezzanotte.',
        en: "All three apartments are in Milan's Lambrate university district — one of the city's liveliest, safest and best-served areas, full of shops, supermarkets, restaurants, bars and pharmacies. The Carrefour supermarket nearby is open 7 a.m. to midnight.",
      },
      {
        it: 'A due minuti a piedi dalla metropolitana M2 (linea verde) e dalla stazione FS di Lambrate: Piazza Duomo è a dieci minuti, la Stazione Centrale a dieci minuti, l\'aeroporto di Linate raggiungibile con un bus diretto.',
        en: 'Two minutes on foot to the M2 metro (green line) and the Lambrate railway station: ten minutes to Piazza Duomo, ten minutes to Milano Centrale, and a direct bus to Linate airport.',
      },
      {
        it: 'A pochi passi: Politecnico di Milano Campus Leonardo, Università Statale, CNR, East Market e Fuori Salone di via Ventura, Istituto Nazionale dei Tumori, Istituto Neurologico Besta, Istituto Clinico Città Studi. L\'auto non serve, ma se l\'avete c\'è un parcheggio custodito sotto casa.',
        en: 'A short walk away: Politecnico di Milano Leonardo Campus, Università Statale, CNR, East Market and Fuori Salone in Via Ventura, Istituto Nazionale dei Tumori, Istituto Neurologico Besta, Istituto Clinico Città Studi. You won\'t need a car — but if you have one, there\'s a guarded car park downstairs.',
      },
    ],
    // Feature compatte mostrate in home (Neighborhood section)
    features: [
      {
        icon: '🚇',
        title: { it: 'Super collegato', en: 'Well connected' },
        text: {
          it: 'Metro M2 a 2 minuti, stazione FS Lambrate a 2 minuti, dieci minuti a Piazza Duomo e dieci alla Stazione Centrale.',
          en: 'M2 metro 2 minutes away, Lambrate FS station 2 minutes, ten minutes to Piazza Duomo and ten to Milano Centrale.',
        },
      },
      {
        icon: '✈️',
        title: { it: 'Tutti e tre gli aeroporti', en: 'All three airports' },
        text: {
          it: 'Linate in ~15 min con bus diretto, Malpensa in ~50 min col Malpensa Express, Bergamo Orio in ~1h15.',
          en: 'Linate in ~15 min by direct bus, Malpensa in ~50 min via Malpensa Express, Bergamo Orio in ~1h15.',
        },
      },
      {
        icon: '🛒',
        title: { it: 'Servizi sotto casa', en: 'Everything at your doorstep' },
        text: {
          it: 'Supermercato Carrefour aperto dalle 7 a mezzanotte, farmacie, negozi, bar e ristoranti a pochi passi.',
          en: 'Carrefour supermarket open 7 a.m. to midnight, pharmacies, shops, bars and restaurants just steps away.',
        },
      },
      {
        icon: '🎓',
        title: { it: 'Cuore universitario', en: 'University heart' },
        text: {
          it: 'A piedi raggiungi Politecnico Campus Leonardo, Università Statale Città Studi e il CNR.',
          en: 'Walking distance to Politecnico Leonardo Campus, Università Statale Città Studi and the CNR.',
        },
      },
      {
        icon: '🌳',
        title: { it: 'Vivace e tranquillo', en: 'Lively yet quiet' },
        text: {
          it: 'Aperitivi, design week (Fuori Salone di via Ventura), East Market: tutto qui. E case silenziose quando torni a dormire.',
          en: 'Aperitivi, design week (Fuori Salone in Via Ventura), East Market: it all happens here. And homes that are quiet when you come back to sleep.',
        },
      },
      {
        icon: '🏥',
        title: { it: 'Strutture sanitarie', en: 'Healthcare' },
        text: {
          it: 'A due passi dall\'Istituto Nazionale dei Tumori, Istituto Neurologico Besta e Istituto Clinico Città Studi.',
          en: 'Steps away from Istituto Nazionale dei Tumori, Istituto Neurologico Besta and Istituto Clinico Città Studi.',
        },
      },
    ],
    // Gallery del quartiere: 6 foto locali (01-06) + 6 Wikimedia Commons (07-12).
    // Le attribuzioni Wikimedia sono in public/images/quartiere/credits.json.
    gallery: [
      { src: '/images/quartiere/01.jpg', alt: 'Stazione Lambrate FS',                      width: 1280, height: 720, layout: 'full' as const, caption: { it: 'Stazione FS Lambrate, a 2 minuti dalle case', en: 'Lambrate FS station, 2 minutes from the apartments' } },
      { src: '/images/quartiere/03.jpg', alt: 'Ingresso M2 Lambrate',                       width: 800,  height: 1200, layout: 'tall' as const, caption: { it: 'Ingresso metropolitana M2 Lambrate', en: 'M2 metro entrance, Lambrate' } },
      { src: '/images/quartiere/07.jpg', alt: 'Politecnico di Milano · Campus Leonardo',    width: 1200, height: 900, layout: 'half' as const, caption: { it: 'Politecnico di Milano · Campus Leonardo', en: 'Politecnico di Milano · Leonardo Campus' } },
      { src: '/images/quartiere/05.jpg', alt: 'Locale del quartiere con dehor',              width: 1200, height: 900, layout: 'half' as const, caption: { it: 'Locali e dehor a Lambrate', en: 'Bars and outdoor seating in Lambrate' } },
      { src: '/images/quartiere/04.jpg', alt: 'Fermata bus Airport Express',                 width: 1200, height: 900, layout: 'half' as const, caption: { it: 'Bus diretto per Linate dalla porta di casa', en: 'Direct bus to Linate from the doorstep' } },
      { src: '/images/quartiere/08.jpg', alt: 'Piazza Leonardo da Vinci',                    width: 1200, height: 900, layout: 'half' as const, caption: { it: 'Piazza Leonardo da Vinci', en: 'Piazza Leonardo da Vinci' } },
      { src: '/images/quartiere/09.jpg', alt: 'Chiesa SS. Nome di Maria, Lambrate',          width: 800,  height: 1200, layout: 'tall' as const, caption: { it: 'Chiesa del SS. Nome di Maria, Lambrate', en: 'Church of the Holy Name of Mary, Lambrate' } },
      { src: '/images/quartiere/06.jpg', alt: 'Strada di Lambrate',                          width: 1200, height: 900, layout: 'half' as const, caption: { it: 'Vita di quartiere', en: 'Neighbourhood life' } },
      { src: '/images/quartiere/10.jpg', alt: 'Piazza Vigili del Fuoco',                     width: 1200, height: 900, layout: 'half' as const, caption: { it: 'Piazza Vigili del Fuoco', en: 'Piazza Vigili del Fuoco' } },
      { src: '/images/quartiere/02.jpg', alt: 'Stazione Lambrate FS · frontale',             width: 1200, height: 900, layout: 'half' as const, caption: { it: 'Stazione FS Lambrate', en: 'Lambrate railway station' } },
      { src: '/images/quartiere/11.jpg', alt: 'Edificio storico del Politecnico',            width: 1200, height: 900, layout: 'half' as const, caption: { it: 'Politecnico · edificio storico', en: 'Politecnico · historical building' } },
      { src: '/images/quartiere/12.jpg', alt: 'Tram in centro Milano',                       width: 1200, height: 900, layout: 'half' as const, caption: { it: 'Tram per il centro', en: 'Tram to the centre' } },
    ],
  },

  // ─── Social proof (recensioni + post-it) ─────────────────────
  // Mostra rating aggregati delle 3 case + 4 recensioni hand-picked (varietà di lingue)
  // + mosaico di post-it scritti a mano lasciati dagli ospiti
  socialProof: {
    eyebrow: { it: 'Amati dagli ospiti', en: 'Guest favourites' },
    title: { it: '292 recensioni, 3 case Guest Favorite', en: '292 reviews, 3 Guest Favorite homes' },
    intro: {
      it: 'Le nostre tre case sono tra le più apprezzate di Airbnb a Milano. Quello che ci rende felici, però, sono i biglietti che gli ospiti lasciano sul muro.',
      en: 'Our three homes are among Airbnb\'s top-rated in Milan. What makes us happy, though, are the handwritten notes guests leave on the wall.',
    },
    // Selezione: 4 recensioni mix di lingue (IT, EN, PT, DE)
    featuredReviews: [
      { property: 'donegani' as const, author: 'Arianna' },
      { property: 'donegani' as const, author: 'Michelle' },
      { property: 'grossich' as const, author: 'Luciene' },
      { property: 'donegani' as const, author: 'Christiane' },
    ],
    postit: [
      { src: '/images/postit/01.jpg', alt: 'Cuore Kinder, biglietto ospite',     tilt: -3 },
      { src: '/images/postit/02.jpg', alt: 'Biglietto Veena & Venkat',           tilt: 2  },
      { src: '/images/postit/03.jpg', alt: 'Biglietto Superhost',                tilt: -2 },
      { src: '/images/postit/04.jpg', alt: 'Guestbook con disegni dei bambini',  tilt: 4  },
    ],
    ctaLabel: { it: 'Leggi tutte le recensioni su Airbnb', en: 'Read all reviews on Airbnb' },
  },

  // ─── Le tre case ─────────────────────────────────────────────
  // Ogni Property è una pagina dedicata in /[locale]/case/[slug]
  properties: [
    // ─── DONEGANI ──────────────────────────────────────────────
    {
      slug: 'donegani',
      name: { it: 'Casa Donegani', en: 'Donegani Apartment' },
      address: 'Piazza Donegani, Milano',
      airbnbUrl: 'https://airbnb.com/h/spigolatrice3',
      cardImage: '/images/case/donegani/01.jpg',
      heroImage: '/images/case/donegani/02.jpg',
      tagline: {
        it: 'Ristrutturato da poco, accogliente, ideale per coppie e piccole famiglie.',
        en: 'Recently renovated, cosy, ideal for couples and small families.',
      },
      features: {
        guests: 4,
        bedrooms: 1,
        beds: { it: '1 camera grande fino a 4 persone', en: '1 large bedroom up to 4 people' },
        bathrooms: 1,
        sqm: undefined as number | undefined,
        outdoor: undefined as { it: string; en: string } | undefined,
      },
      amenities: [
        { it: 'WiFi', en: 'Wi-Fi' },
        { it: 'Lavatrice', en: 'Washing machine' },
        { it: 'Asciugatrice', en: 'Dryer' },
        { it: 'Riscaldamento', en: 'Heating' },
        { it: 'Ventilatori a soffitto', en: 'Ceiling fans' },
        { it: 'Cucina attrezzata', en: 'Fully equipped kitchen' },
        { it: 'Asciugamani e lenzuola', en: 'Towels and linens' },
        { it: 'Ascensore', en: 'Elevator' },
      ],
      longDescription: [
        {
          it: 'Casa molto carina, ristrutturata da poco da un architetto esperto di design. C\'è una stanza da letto grande dove possono dormire fino a 4 persone, una bella cucina vivibile e un bagno.',
          en: "A very pretty home, recently renovated by an architect with a design eye. There is one large bedroom that sleeps up to four people, a generous kitchen and a bathroom.",
        },
        {
          it: 'L\'appartamento è nel quartiere universitario, con negozi, supermercati, bar, farmacie e ristoranti a due passi. La metropolitana è a due minuti, il modo migliore per muoversi a Milano. In dieci minuti si raggiunge Piazza Duomo.',
          en: 'The apartment sits in the university district, with shops, supermarkets, bars, pharmacies and restaurants on the doorstep. The metro is two minutes away — the best way to get around Milan. Piazza Duomo is a ten-minute ride.',
        },
        {
          it: 'La casa è completamente attrezzata. C\'è tutto per la cucina; gli ospiti ricevono asciugamani, lenzuola e coperte; in bagno trovate saponi e bagnoschiuma.',
          en: "The home is fully equipped. The kitchen has everything you need; guests receive towels, sheets and blankets; the bathroom is stocked with soap and shower gel.",
        },
      ],
      ratings: {
        overall: 4.99,
        count: 91,
        topPercent: 1,
        breakdown: { cleanliness: 5.0, accuracy: 5.0, checkin: 5.0, communication: 5.0, location: 4.9, value: 5.0 },
      },
      reviews: [
        {
          author: 'Arianna',
          location: '',
          date: 'Aprile 2026',
          text: "Pamela è una persona d'oro davvero, mi ha mandato tutti i dettagli per il self check-in e ha avuto premura che tutto fosse perfetto, rimanendo a disposizione durante il mio soggiorno.",
        },
        {
          author: 'Antonio',
          location: '',
          date: 'Novembre 2025',
          text: 'Appartamento pulito e ben organizzato in zona tranquilla dove è possibile trovare tutto nelle vicinanze. Metro linea verde ad un passo. Host gentile e disponibile. Super!',
        },
        {
          author: 'Michelle',
          location: 'Los Angeles, California',
          date: 'Marzo 2026',
          text: "This was our last stop on our trip and I'm glad it was! Plenty of space to organize ourselves for packing in this lovely apartment. There's an on-site elevator which was incredibly helpful.",
        },
        {
          author: 'Elsa',
          location: '',
          date: 'Aprile 2026',
          text: "Nous avons passé deux nuits chez Pamela. Le logement est très bien, fonctionnel, très propre et très confortable. Le quartier est calme et le métro à proximité.",
        },
        {
          author: 'Christiane',
          location: '',
          date: 'Aprile 2026',
          text: 'Kommunikation war ganz easy und unkompliziert, flexibler Check-in sehr praktisch. Die Gegend hatte eine gute Atmosphäre — ruhig aber zwischendurch auch viel los.',
        },
      ],
      // Tutte le foto della casa, in ordine narrativo. Layout per la pagina /galleria
      gallery: buildGallery('donegani', 33),
    },

    // ─── GROSSICH ──────────────────────────────────────────────
    {
      slug: 'grossich',
      name: { it: 'Casa Grossich', en: 'Grossich Apartment' },
      address: 'Via Grossich, Milano',
      airbnbUrl: 'https://airbnb.com/h/spigolatrice2',
      cardImage: '/images/case/grossich/01.jpg',
      heroImage: '/images/case/grossich/02.jpg',
      tagline: {
        it: 'Due camere, grande terrazzo, fino a cinque ospiti. Silenziosa e luminosa.',
        en: 'Two bedrooms, large terrace, sleeps up to five. Quiet and bright.',
      },
      features: {
        guests: 5,
        bedrooms: 2,
        beds: { it: '1 matrimoniale + 1 singolo · 2 singoli nell\'altra camera', en: '1 double + 1 single · 2 singles in the other room' },
        bathrooms: 1,
        sqm: undefined as number | undefined,
        outdoor: { it: 'Ampia terrazza', en: 'Large terrace' } as { it: string; en: string } | undefined,
      },
      amenities: [
        { it: 'WiFi', en: 'Wi-Fi' },
        { it: 'Aria condizionata in ogni camera', en: 'Air conditioning in every room' },
        { it: 'Lavatrice', en: 'Washing machine' },
        { it: 'Asciugatrice', en: 'Dryer' },
        { it: 'Lavastoviglie', en: 'Dishwasher' },
        { it: 'Riscaldamento', en: 'Heating' },
        { it: 'Cucina attrezzata', en: 'Fully equipped kitchen' },
        { it: 'Ferro da stiro', en: 'Iron' },
        { it: 'Phon', en: 'Hair dryer' },
        { it: 'Terrazza con sedie e tavolino', en: 'Terrace with table and chairs' },
        { it: 'Ascensore', en: 'Elevator' },
      ],
      longDescription: [
        {
          it: 'Casa accogliente e moderna, finemente ristrutturata. Due camere da letto, cucina completamente attrezzata, bagno e una grande terrazza con tavolino e sedie. In una delle due camere c\'è un letto matrimoniale e un terzo letto singolo; nell\'altra è possibile avere due letti singoli. Si arriva fino a cinque persone.',
          en: 'A cosy, modern, finely renovated home. Two bedrooms, fully equipped kitchen, bathroom and a large terrace with table and chairs. One bedroom has a double bed and a third single bed; the other can be set up with two singles. Sleeps up to five.',
        },
        {
          it: 'In cucina trovate bollitore, microonde, macchina del caffè, fornelli, frigorifero, lavastoviglie e pentole. In bagno doccia, bidet, lavatrice e asciugatrice, shampoo, bagnoschiuma e phon. L\'aria condizionata è in tutte e due le camere.',
          en: "The kitchen has kettle, microwave, coffee machine, hob, fridge, dishwasher and cookware. The bathroom has shower, bidet, washer and dryer, shampoo, shower gel and hair dryer. Air conditioning runs in both bedrooms.",
        },
        {
          it: 'L\'appartamento è molto silenzioso, ideale per godersi Milano dopo una giornata fuori. È nel quartiere universitario, a due minuti dalla metropolitana M2 e a dieci minuti da Piazza Duomo.',
          en: 'The apartment is very quiet, ideal to unwind after a day out in Milan. It sits in the university district, two minutes from the M2 metro and ten from Piazza Duomo.',
        },
      ],
      ratings: {
        overall: 4.92,
        count: 103,
        topPercent: 10,
        breakdown: { cleanliness: 4.9, accuracy: 4.9, checkin: 5.0, communication: 5.0, location: 4.9, value: 4.9 },
      },
      reviews: [
        {
          author: 'Diana',
          location: '',
          date: 'Marzo 2026',
          text: 'Host molto disponibile, davvero un posto carino e una bella, ampia cucina.',
        },
        {
          author: 'Emanuele',
          location: '',
          date: 'Aprile 2026',
          text: 'Comunicazione buonissima! Grazie mille!',
        },
        {
          author: 'Yemisi',
          location: 'Whitby, Canada',
          date: 'Aprile 2026',
          text: "We had a great visit to Milan at Pamela's unit. The location is close to the train station and easy to commute. The unit was very clean and Pamela was hospitable — she left some coffee.",
        },
        {
          author: 'Dominik',
          location: 'Zurigo, Svizzera',
          date: 'Marzo 2026',
          text: 'We loved our stay in Milan. Pamela was friendly and responded quickly. Her apartment was big enough for two couples. It is located a few minutes walk from the subway.',
        },
        {
          author: 'Lillian & Margaret',
          location: '',
          date: 'Febbraio 2026',
          text: 'This was a fantastic place to stay for both the price and the location. Was exactly like the description and pictures posted on the website. She was super flexible with our check-in.',
        },
        {
          author: 'Luciene',
          location: '',
          date: 'Maggio 2026',
          text: 'Excelente espaço. Anfitriã dedicada. Localização perfeita para se deslocar por Milão. Ambiente muito tranquilo e familiar. Metrô a poucos passos.',
        },
      ],
      gallery: buildGallery('grossich', 35),
    },

    // ─── BUSCHI ────────────────────────────────────────────────
    {
      slug: 'buschi',
      name: { it: 'Casa Buschi', en: 'Buschi Apartment' },
      address: 'Via Averardo Buschi, Milano',
      airbnbUrl: 'https://airbnb.com/h/spigolatrice1',
      cardImage: '/images/case/buschi/01.jpg',
      heroImage: '/images/case/buschi/02.jpg',
      tagline: {
        it: '70 mq spaziosi, due camere flessibili, fino a sette ospiti. Perfetta per gruppi e famiglie.',
        en: '70 sqm of space, two flexible bedrooms, sleeps up to seven. Perfect for groups and families.',
      },
      features: {
        guests: 7,
        bedrooms: 2,
        beds: { it: '1 matrimoniale + 1 singolo · fino a 4 letti nell\'altra camera', en: '1 double + 1 single · up to 4 beds in the other room' },
        bathrooms: 1,
        sqm: 70 as number | undefined,
        outdoor: { it: 'Balcone', en: 'Balcony' } as { it: string; en: string } | undefined,
      },
      amenities: [
        { it: 'WiFi super veloce', en: 'High-speed Wi-Fi' },
        { it: 'Aria condizionata', en: 'Air conditioning' },
        { it: 'Lavatrice', en: 'Washing machine' },
        { it: 'Asciugatrice', en: 'Dryer' },
        { it: 'Riscaldamento', en: 'Heating' },
        { it: 'Cucina ampia attrezzata', en: 'Large fully equipped kitchen' },
        { it: 'Ferro da stiro', en: 'Iron' },
        { it: 'Phon', en: 'Hair dryer' },
        { it: 'Balcone con sedie e tavolino', en: 'Balcony with table and chairs' },
        { it: 'Ripostiglio', en: 'Storage room' },
        { it: 'Ascensore', en: 'Elevator' },
      ],
      longDescription: [
        {
          it: 'Spaziosa e accogliente, circa 70 metri quadrati. Due camere da letto, una cucina grande, bagno e balcone. In una delle camere c\'è un letto matrimoniale ed è possibile aggiungere un letto singolo; nell\'altra puoi scegliere la soluzione con 2, 3 o 4 letti, singoli o matrimoniali. Si arriva fino a sette persone.',
          en: 'Spacious and welcoming, about 70 square metres. Two bedrooms, a large kitchen, bathroom and balcony. One bedroom has a double bed and an optional single bed; the other can be set up with two, three or four beds — single or double. Sleeps up to seven.',
        },
        {
          it: 'La cucina e il bagno sono ampi: è possibile pranzare insieme fino a sette persone. C\'è un bel balcone attrezzato. Trovate tutto il necessario in cucina e in bagno: shampoo, bagnoschiuma, asciugamani, asse e ferro da stiro.',
          en: 'The kitchen and bathroom are both large — you can comfortably dine seven at the table. There is a nice furnished balcony. Everything is provided in the kitchen and bathroom: shampoo, shower gel, towels, iron and ironing board.',
        },
        {
          it: 'Nel quartiere universitario, a due minuti dalla metropolitana M2 di Lambrate e dieci minuti da Piazza Duomo. Ideale per gruppi, famiglie numerose e amici in viaggio.',
          en: "In the university district, two minutes from M2 Lambrate metro and ten minutes from Piazza Duomo. Ideal for groups, larger families and friends travelling together.",
        },
      ],
      ratings: {
        overall: 4.92,
        count: 98,
        topPercent: 5,
        breakdown: { cleanliness: 4.9, accuracy: 4.9, checkin: 4.9, communication: 5.0, location: 4.9, value: 4.9 },
      },
      reviews: [
        {
          author: 'Ivana',
          location: '',
          date: 'Ottobre 2025',
          text: "Il soggiorno è stato molto piacevole, l'host Pamela sempre disponibile ad ogni richiesta o informazione, soprattutto in modo molto veloce. L'appartamento ha tutto ciò che occorre.",
        },
        {
          author: 'Matteo',
          location: '',
          date: 'Marzo 2026',
          text: 'Pamela è la migliore host che mi abbia mai accolto. La disponibilità in persona!!! Consigliatissimo.',
        },
        {
          author: 'Bojidara',
          location: '',
          date: 'Maggio 2026',
          text: "We had a great time staying at Pamela's place. It was big enough for five people, comfortable to reach the center of the city, next to a metro and train station.",
        },
        {
          author: 'Marian',
          location: 'Berrien Center, Michigan',
          date: 'Maggio 2026',
          text: 'The apartment is great, had everything you need. There was both a washer and dryer. The location was great with a short walk to the metro.',
        },
        {
          author: 'Zofia',
          location: '',
          date: 'Aprile 2026',
          text: 'Bardzo polecam zatrzymać się u Pameli podczas pobytu w Mediolanie. Apartament znajduje się 3 min od metra, niedaleko centrum, w spokojnej okolicy.',
        },
        {
          author: 'Ingrid',
          location: 'Città del Messico, Messico',
          date: 'Aprile 2026',
          text: "Pamela's place is good for families like mine or medium size groups. You can walk to the supermarket, the metro is just 3 min walk and you can find delicious local food around.",
        },
      ],
      gallery: buildGallery('buschi', 20),
    },
  ],

  // ─── Galleria (anteprima home — 5 foto top-pick) ─────────────
  gallery: {
    title: { it: 'Galleria', en: 'Gallery' },
    intro: {
      it: 'Uno sguardo dentro le tre case di Spigolatrice di Lambrate.',
      en: 'A glimpse inside the three Spigolatrice di Lambrate apartments.',
    },
    viewAll: { it: 'Vedi tutte le foto', en: 'View all photos' },
    images: [
      { src: '/images/case/buschi/02.jpg',  alt: 'Casa Buschi · cucina',         width: 1600, height: 900,  layout: 'full' as const, caption: { it: 'Casa Buschi · cucina e zona pranzo', en: 'Buschi · kitchen and dining' } },
      { src: '/images/case/donegani/02.jpg', alt: 'Casa Donegani · salotto',      width: 1200, height: 1200, layout: 'half' as const, caption: { it: 'Casa Donegani',                   en: 'Donegani' } },
      { src: '/images/case/grossich/01.jpg', alt: 'Casa Grossich · camera',       width: 1200, height: 1200, layout: 'half' as const, caption: { it: 'Casa Grossich',                   en: 'Grossich' } },
      { src: '/images/case/buschi/07.jpg',   alt: 'Casa Buschi · camera',         width: 1200, height: 1200, layout: 'half' as const, caption: { it: 'Casa Buschi · camera',            en: 'Buschi · bedroom' } },
      { src: '/images/case/donegani/22.jpg', alt: 'Casa Donegani · dettagli',     width: 1200, height: 1200, layout: 'half' as const, caption: { it: 'Tutta la galleria',               en: 'See the full gallery' } },
    ],
  },

  // ─── CTA banner ──────────────────────────────────────────────
  cta: {
    title: { it: 'Pronto a venire a Milano?', en: 'Ready to come to Milan?' },
    description: {
      it: 'Scrivici per qualsiasi domanda, oppure prenota direttamente su Airbnb. Rispondiamo entro poche ore.',
      en: "Drop us a line for any question, or book directly on Airbnb. We reply within a few hours.",
    },
    button: { it: 'Scrivici', en: 'Contact us' },
  },

  // ─── FAQ ─────────────────────────────────────────────────────
  faq: {
    title: { it: 'Domande frequenti', en: 'Frequently asked questions' },
    items: [
      {
        q: { it: 'Come funziona il check-in?', en: 'How does check-in work?' },
        a: {
          it: 'Self check-in con istruzioni inviate per tempo. Pamela resta in contatto via WhatsApp per qualsiasi necessità, anche fuori dagli orari standard.',
          en: 'Self check-in with instructions sent in advance. Pamela stays in touch on WhatsApp for anything you need, also outside standard hours.',
        },
      },
      {
        q: { it: 'Dove si trovano gli appartamenti?', en: 'Where are the apartments?' },
        a: {
          it: 'Tutte e tre le case sono nel quartiere universitario di Lambrate, Milano. A due minuti dalla metropolitana M2 e a dieci minuti da Piazza Duomo.',
          en: "All three apartments are in Milan's Lambrate university district. Two minutes from the M2 metro and ten from Piazza Duomo.",
        },
      },
      {
        q: { it: 'C\'è il parcheggio?', en: 'Is there parking?' },
        a: {
          it: 'In zona è facile parcheggiare gratuitamente sulla strada. In alternativa, sotto casa c\'è un parcheggio custodito a pagamento.',
          en: 'Free street parking is easy to find in the area. Alternatively, there is a paid guarded car park downstairs.',
        },
      },
      {
        q: { it: 'Quanti ospiti possono soggiornare?', en: 'How many guests can stay?' },
        a: {
          it: 'Donegani fino a 4 ospiti, Grossich fino a 5, Buschi fino a 7. Le configurazioni dei letti sono flessibili: scrivici per studiare quella migliore per te.',
          en: 'Donegani sleeps up to 4, Grossich up to 5, Buschi up to 7. Bed configurations are flexible — write us to plan the right one for you.',
        },
      },
      {
        q: { it: 'Cosa trovo in casa?', en: 'What will I find in the apartment?' },
        a: {
          it: 'Cucina completamente attrezzata, lavatrice (e asciugatrice in due delle tre case), WiFi, riscaldamento, aria condizionata o ventilatori. Asciugamani, lenzuola, shampoo, bagnoschiuma e phon sono già in casa.',
          en: 'Fully equipped kitchen, washing machine (and dryer in two of the three homes), Wi-Fi, heating, air conditioning or fans. Towels, sheets, shampoo, shower gel and hair dryer are already provided.',
        },
      },
      {
        q: { it: 'Accettate pagamenti in criptovalute?', en: 'Do you accept cryptocurrency payments?' },
        a: {
          it: 'Sì, oltre ai metodi standard di Airbnb accettiamo anche Bitcoin e altre criptovalute su accordo diretto. Scrivici per i dettagli.',
          en: 'Yes — in addition to Airbnb\'s standard methods we also accept Bitcoin and other cryptocurrencies by direct arrangement. Get in touch for details.',
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
        it: 'Messaggio inviato! Ti risponderemo a breve.',
        en: 'Message sent! We will get back to you soon.',
      },
      error: {
        it: 'Si è verificato un errore. Riprova o scrivici direttamente via email o WhatsApp.',
        en: 'An error occurred. Please try again or write us directly by email or WhatsApp.',
      },
    },
  },

  // ─── Footer ──────────────────────────────────────────────────
  footer: {
    rights: { it: 'Tutti i diritti riservati', en: 'All rights reserved' },
    host: { it: 'Host: Pamela Pinna', en: 'Host: Pamela Pinna' },
  },

  // ─── Theme toggle (a11y) ─────────────────────────────────────
  theme: {
    toggleDark: { it: 'Attiva modalità scura', en: 'Enable dark mode' },
    toggleLight: { it: 'Attiva modalità chiara', en: 'Enable light mode' },
  },
} as const

// ─── Helper: costruisce la gallery di una casa dalle foto in public/images/case/{slug}/01..N.jpg ──
// Il layout alterna in modo da generare un pattern Airbnb-style nella griglia masonry.
function buildGallery(slug: 'donegani' | 'grossich' | 'buschi', count: number) {
  const out: Array<{ src: string; alt: string; width: number; height: number; layout: 'full' | 'half' | 'tall'; caption: { it: string; en: string } }> = []
  for (let i = 1; i <= count; i++) {
    const n = String(i).padStart(2, '0')
    // Pattern: ogni 7 foto una full, ogni 5 una tall, le altre half
    const layout: 'full' | 'half' | 'tall' = i % 7 === 1 ? 'full' : i % 5 === 0 ? 'tall' : 'half'
    out.push({
      src: `/images/case/${slug}/${n}.jpg`,
      alt: `${slug} ${n}`,
      width: layout === 'tall' ? 800 : layout === 'full' ? 1600 : 1200,
      height: layout === 'tall' ? 1200 : layout === 'full' ? 900 : 1200,
      layout,
      caption: { it: '', en: '' },
    })
  }
  return out
}

// Tipo helper esportato (usato dai componenti per tipizzare singole property)
export type Property = (typeof site.properties)[number]
export type PropertySlug = Property['slug']
