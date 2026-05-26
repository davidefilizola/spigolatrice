# Istruzioni per Claude Code

Questo file viene caricato in automatico nel contesto. Sono le **regole della casa** quando lavori in questo progetto.

---

## Cos'è questo progetto

Boilerplate Next.js per piccoli **siti informativi locali** (B&B, hobby, attività, piccole aziende). Pensato per essere **copiato/incollato** per ogni nuovo sito e personalizzato cambiando praticamente solo `content/site.ts`.

L'utente NON modifica codice a mano. Tutto deve essere fattibile tramite Claude Code.

---

## Stack (NON cambiare, NON aggiungere senza necessità reale)

- Next.js 16 App Router + TypeScript + Tailwind CSS v4
- `framer-motion` (animazioni scroll-reveal)
- `next-themes` (dark mode)
- `leaflet` + `react-leaflet` (mappa OpenStreetMap, no API key)
- `sharp` (generazione icone PWA, già transitivo da Next)

**NON aggiungere mai**: zod, react-hook-form, headless UI, librerie i18n esterne, CMS, ORM, state managers, animation libraries oltre framer-motion. Se sei tentato di aggiungere una dipendenza, prima cerca se il problema si risolve con CSS o codice nativo.

---

## Architettura — la mappa che conta

```
content/site.ts          ← UNICA FONTE DI VERITÀ. Tutti i testi, dati, foto, FAQ, etc.
core/components/         ← Componenti riusabili tra TUTTI i siti futuri
core/lib/i18n.ts         ← Locale + helper t() — niente file JSON di traduzioni
core/lib/metadata.ts     ← Helper SEO metadata
templates/informative/   ← Sezioni del template "informativo" (Hero, About, Services)
app/[locale]/            ← Routing IT/EN (NON aggiungere altre lingue senza chiedere)
app/[locale]/galleria/   ← Pagina dedicata gallery (Airbnb-style)
app/manifest.ts          ← PWA manifest
public/icons/            ← Icone PWA (SVG sorgente + PNG generati)
public/sw.js             ← Service worker minimale (PWA installabile)
scripts/generate-icons.mjs ← Rigenera PNG da SVG quando cambia brand
middleware.ts            ← Redirect / → /it
```

**Regola di taglio**: se serve aggiungere un componente nuovo, decidi:
- È riusabile tra siti diversi? → `core/components/`
- È specifico di "informative"? → `templates/informative/`

---

## i18n — pattern obbligatorio

Tutto il contenuto bilingue ha questa forma in `site.ts`:

```ts
title: { it: 'Ciao', en: 'Hi' }
```

Si legge nei componenti con:

```tsx
import { t, type Locale } from '@/core/lib/i18n'
{t(site.section.title, locale)}
```

**NON creare mai** file `content/translations/*.json`. **NON aggiungere mai** librerie come `next-intl`, `react-i18next`, etc. L'unico tipo bilingue è `{ it: T, en: T }`. Se serve una terza lingua, vai in `core/lib/i18n.ts` e aggiungila al tipo `Locale` e all'array `locales`.

---

## Workflow tipico: l'utente apre Claude Code in una copia del template per fare un nuovo sito

Aspettati un prompt del tipo: *"Crea il sito per X, ecco i dati: Y"*.

Procedi così, **senza chiedere conferma per ogni step**:

1. **`content/site.ts`** — aggiorna TUTTO:
   - `name`, `url`
   - `contact.{email,phone,address,coordinates,whatsappMessage}`
   - `social.{instagram,facebook}` (rimuovi quelli non usati)
   - `seo.{keywords,ogImage}`
   - `nav` (rimuovi/aggiungi sezioni se serve)
   - `hero.{eyebrow,title,subtitle,cta}` bilingue
   - `about.{eyebrow,title,body}` (array di paragrafi bilingui)
   - `services.items[]` (aggiungi/rimuovi quante ne servono)
   - `gallery.images[]` (mantieni layout: full|half|tall, sostituisci src)
   - `faq.items[]` (aggiungi/rimuovi)
   - `cta.{title,description,button}`

2. **Foto**: se l'utente le fornisce, sostituisci i `picsum.photos` URLs con path locali `/images/foto.jpg`. Se non ne fornisce, lascia picsum con seed nuovi.

3. **Icona PWA**:
   - Modifica `public/icons/icon.svg` (lettere monogramma + colori)
   - Esegui: `node scripts/generate-icons.mjs`
   - Se cambi colore brand, aggiorna anche `theme_color` in `app/manifest.ts` e i colori in `app/globals.css` (`html { background-color }`)

4. **Test**: `npm run build` (verifica TypeScript), poi `npm run dev`.

5. **NON committare automaticamente** — l'utente farà commit/push quando vorrà. (A meno che esplicitamente richiesto.)

---

## Convenzioni di codice

- TypeScript strict. Usa types, non `any`.
- Componenti server di default. `'use client'` solo se serve (state, effects, browser APIs).
- Niente CSS file extra. Tailwind v4 + classi inline. Custom CSS solo in `app/globals.css` (keyframes, utilities globali).
- Dark mode: classe `dark` su `<html>` (gestita da `next-themes`). Usa `dark:` Tailwind prefix.
- Mobile-first sempre: scrivi prima le classi mobile, poi `sm:`/`md:`/`lg:` per scaling up.
- Toccare punti (44×44 min su mobile).
- A11y: `aria-label` su bottoni icona-only, `aria-expanded`, focus-visible ring sui bottoni.

---

## Pattern visivi importanti

- **Tipografia**: `font-serif` (Fraunces) per `h1`/`h2` e titoli editorial. `font-sans` (Geist) di default per body.
- **Colori**: stone (base warm) + amber/orange (accenti terracotta). Background `#fcf8f0` light / `#0e0b08` dark.
- **Animazioni**: Framer Motion `Section` component con `useInView` per fade-in scroll. Stagger opzionale per griglie.
- **Hero**: Ken Burns CSS animation (classe `.kenburns` in globals.css). NON aggiungere video, NON usare librerie di parallax.
- **Gallery home**: mobile = swipe carousel (CSS scroll-snap), desktop = bento 1+4. Stile Airbnb.
- **Gallery /galleria**: CSS Grid 2-col con `layout: 'full'|'half'|'tall'` per ogni foto. L'utente compone il ritmo.
- **Lightbox**: componente unico `Lightbox.tsx`, riutilizzato in home e /galleria.

---

## Cosa NON fare mai (errori comuni)

- ❌ Creare file di traduzione separati (JSON, properties, etc.)
- ❌ Aggiungere CMS o backend per il contenuto (è statico, vive in site.ts)
- ❌ Aggiungere react-hook-form/zod per il form contatti (HTML5 validation basta)
- ❌ Aggiungere librerie carousel (Embla, Swiper, etc.) — basta CSS scroll-snap
- ❌ Aggiungere librerie animation oltre framer-motion
- ❌ Duplicare `navLinks` tra Header e Footer — leggono da `site.nav`
- ❌ Hardcodare testi nei componenti — sempre da site.ts
- ❌ Usare `hash` o vecchi nomi: il campo nav è `href` (anchor o path assoluto)
- ❌ Generare PNG icone scrivendoli a mano — usa `scripts/generate-icons.mjs`
- ❌ Modificare `core/components/` per personalizzazioni di un singolo sito — quei componenti sono condivisi

## Cosa fare se l'utente chiede una cosa "non prevista"

- Vuole una nuova sezione (es. "Testimonianze")? → componente nuovo in `core/components/` (se riusabile) o `templates/informative/` (se specifico), poi import in `app/[locale]/page.tsx`
- Vuole una pagina nuova (es. "/menu" per ristorante)? → `app/[locale]/menu/page.tsx`
- Vuole un campo nuovo nei dati? → aggiungilo a `site.ts` come bilingue se è testo
- Vuole una terza lingua? → aggiorna `core/lib/i18n.ts` (tipo + array), poi aggiungi le traduzioni a tutti i campi `{ it, en, fr }`
- Vuole le foto in /galleria organizzate per categoria? → aggiungi `category` field a ogni image, raggruppale nel rendering

---

## Comandi da ricordare

```bash
npm run dev                        # dev server (porta 3000)
npm run dev -- -p 3001             # porta custom
npm run dev -- -H 0.0.0.0 -p 3000  # accessibile da LAN (mobile testing)
npm run build                      # build di produzione
npm start -- -H 0.0.0.0 -p 3000    # serve la build (necessario per testare PWA install)
node scripts/generate-icons.mjs    # rigenera icone PWA da SVG
```

Per il dev server su LAN: aggiungi l'IP del Mac in `next.config.ts` (`allowedDevOrigins: ['192.168.x.x']`).

---

## Files che l'utente sostituirà spesso (e che tu modifichi)

1. `content/site.ts` — ogni nuovo cliente
2. `public/icons/icon.svg` — ogni nuovo brand
3. `app/manifest.ts` — eventualmente theme color
4. `app/globals.css` — solo colori html bg/text se cambia la palette
5. `app/[locale]/page.tsx` — solo se aggiungi/rimuovi sezioni dal template

Tutto il resto è infrastruttura che resta invariata. Non toccarla "per pulizia" se non serve.

---

## SEO already wired

- Metadata + OpenGraph: derivati da `site.ts` via `core/lib/metadata.ts`
- hreflang IT/EN automatici
- `sitemap.xml` e `robots.txt` autogenerati
- JSON-LD `LocalBusiness` schema iniettato in `app/[locale]/page.tsx`

Quando cambi brand: assicurati che `site.url` punti al dominio definitivo (es. `https://lacolombaia.it`) — i metadata base ne dipendono.

---

## PWA

- Manifest: `app/manifest.ts`
- Service Worker: `public/sw.js` (passthrough, livello A: solo installabile, no offline)
- Registrazione: `core/components/PWARegister.tsx` (solo in production)
- Icone: `public/icons/{icon.svg,icon-192.png,icon-512.png,apple-touch-icon.png}`
- iOS meta tags: in `app/layout.tsx` via `metadata.appleWebApp`

Per testare l'installazione su mobile serve `npm run build && npm start` (il SW è disabilitato in dev).

---

## Contatti form

`app/api/contact/route.ts` fa `console.log`. Non è connesso a un mailer.

Quando l'utente vuole mandare email vere:
1. `npm install resend`
2. Aggiungi `RESEND_API_KEY=...` a `.env.local`
3. Decommenta e completa il codice in `route.ts` (è già scaffold con commento)

Non installare Resend a priori — l'utente decide se serve.
