# Boilerplate — Siti informativi

Base riutilizzabile per piccoli siti informativi (B&B, attività locali, hobby, piccole aziende).

**Stack**: Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion · Leaflet · next-themes

---

## ✨ Cosa include

- ✅ **i18n IT/EN** semplice (no librerie esterne)
- ✅ **Dark mode** nativo con toggle
- ✅ **Animazioni** scroll-reveal eleganti
- ✅ **Mappa** OpenStreetMap (zero API key)
- ✅ **SEO completo**: metadata, hreflang, sitemap.xml, robots.txt, JSON-LD LocalBusiness
- ✅ **Mobile-first** responsive
- ✅ **Tipografia** Geist (sans) + Fraunces (serif elegante)
- ✅ **Contact form** con API route
- ✅ **Lightbox** galleria
- ✅ **Accessibilità**: focus-visible, aria-*, struttura semantica

---

## 🚀 Quick start

```bash
npm install
npm run dev          # http://localhost:3000
```

---

## 📁 Struttura

```
boilerplate/
├── app/
│   ├── [locale]/         # /it, /en
│   ├── api/contact/      # form handler
│   ├── sitemap.ts        # SEO
│   ├── robots.ts         # SEO
│   ├── layout.tsx        # root (fonts + theme)
│   └── globals.css
├── core/
│   ├── components/       # 11 componenti riutilizzabili
│   └── lib/              # i18n.ts, metadata.ts
├── templates/
│   └── informative/      # Hero, About, Services
├── content/
│   └── site.ts           # ← UNICA FONTE DI VERITÀ
├── public/images/        # placeholder SVG (da sostituire)
└── middleware.ts         # redirect / → /it
```

---

## 🎯 Come creare un nuovo sito

### Step 1 — Copia il boilerplate

```bash
cp -r boilerplate mio-nuovo-sito
cd mio-nuovo-sito
rm -rf node_modules .next
npm install
```

### Step 2 — Modifica `content/site.ts`

È l'**unico file** da modificare per la maggior parte dei casi:

```typescript
export const site = {
  name: 'La Mia Colombaia',
  url: 'https://miacolombaia.it',

  contact: {
    email: 'info@miacolombaia.it',
    phone: '+39 333 1234567',
    address: 'Via Roma 10, 00100 Roma',
    coordinates: { lat: 41.9028, lng: 12.4964 },
  },

  hero: {
    title: {
      it: 'La passione per i colombi',
      en: 'A passion for pigeons',
    },
    subtitle: {
      it: 'Una colombaia tradizionale immersa nel verde.',
      en: 'A traditional pigeon loft in the countryside.',
    },
    // ...
  },

  // Aggiungere una FAQ:
  faq: {
    items: [
      {
        q: { it: 'Posso visitarvi?', en: 'Can I visit?' },
        a: { it: 'Certo, contattaci.', en: 'Sure, contact us.' },
      },
      // ...
    ],
  },
}
```

Tutti i testi sono **bilingui** con type-safety: TypeScript ti forza a fornire sia `it` che `en`.

### Step 3 — Sostituisci le immagini

In `public/images/` ci sono SVG placeholder. Sostituiscili con foto reali (`.jpg` / `.webp`) e aggiorna i path in `site.ts`:

```typescript
hero: { image: '/images/foto-vera.jpg', ... }
```

> ⚠️ Quando sostituisci le immagini, **rimuovi** `dangerouslyAllowSVG` da `next.config.ts`.

### Step 4 — Deploy

```bash
git init && git add . && git commit -m "init"
git push origin main
```

Su [Vercel](https://vercel.com) collega il repo: deploy automatico, zero configurazione.

### Step 5 — (Opzionale) Email reali dal form

Il form attualmente fa `console.log`. Per inviare email vere:

1. `npm install resend`
2. Decommenta il codice in `app/api/contact/route.ts`
3. Aggiungi `RESEND_API_KEY` in `.env.local` (e nelle env vars di Vercel)

---

## 🧩 Come funziona la riusabilità

**Per il primo sito** (es. colombaia):
- Modifichi solo `content/site.ts`
- Sostituisci immagini in `public/images/`

**Per il secondo sito** (es. ristorante):
- Stesso processo. Stessa struttura.

**Per un terzo sito che ha sezioni DIVERSE** (es. Airbnb):
- Crei un nuovo template in `templates/accommodation/`
- Lì dentro metti i componenti specifici (Rooms, Amenities, HouseRules...)
- I componenti `core/` rimangono identici (Header, Footer, FAQ, Gallery, Contact, ...)
- In `app/[locale]/page.tsx` assembli i pezzi del nuovo template

---

## 🛠️ Personalizzazioni comuni

### Aggiungere una lingua (es. francese)

1. `core/lib/i18n.ts` → aggiungi `'fr'` a `locales`
2. `content/site.ts` → aggiungi `fr: '...'` a tutti i campi i18n
3. Il type-checking TypeScript ti aiuterà a non dimenticare nessun campo

### Cambiare i colori del tema

Il tema usa la palette **stone** (neutri caldi) + **amber** (accenti) di Tailwind.

Per cambiare: cerca-e-sostituisci globale (es. `amber-700` → `emerald-700`).

### Aggiungere una sezione nuova

1. Crea il componente in `core/components/` (se riusabile) o `templates/informative/` (se specifico)
2. Importalo in `app/[locale]/page.tsx`
3. Aggiungi il link in `site.nav` (apparirà in Header e Footer)

### Aggiungere/rimuovere servizi, FAQ, gallery

Solo `content/site.ts`. Aggiungi/rimuovi oggetti dall'array corrispondente.

---

## 📋 Scripts

```bash
npm run dev      # dev server
npm run build    # build di produzione
npm run start    # serve la build
```

---

## 🌐 Routing

- `/` → redirect a `/it` (lingua default)
- `/it` → versione italiana
- `/en` → versione inglese

Il middleware (`middleware.ts`) detecta `Accept-Language` per il primo redirect.

---

## 📝 SEO

Già pronto in produzione:
- `metadataBase` impostato da `site.url`
- `<title>`, `<meta description>`, OpenGraph
- `hreflang` automatico per IT/EN
- `sitemap.xml` auto-generato (a `/sitemap.xml`)
- `robots.txt` auto-generato (a `/robots.txt`)
- **JSON-LD LocalBusiness** per SEO locale (Google Business)
