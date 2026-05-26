# Siti boilerplate — Tier 1

Base riutilizzabile per piccoli siti informativi (B&B, attività locali, hobby, piccole aziende).
Next.js 16 · TypeScript · Tailwind v4 · PWA installabile.

> ⚙️ **Workflow previsto**: questo template è pensato per essere usato **tramite Claude Code**.
> Le istruzioni operative per Claude stanno in [`CLAUDE.md`](./CLAUDE.md) e vengono caricate
> automaticamente nel suo contesto quando apri Claude Code in questa cartella.

---

## ✨ Features incluse

- 🌐 **i18n IT/EN** type-safe inline (no JSON, no librerie)
- 🌓 **Dark mode** nativo (next-themes)
- 🎬 **Hero Ken Burns** (animazione CSS, no video)
- 🖼️ **Gallery Airbnb-style**:
  - Home: swipe carousel mobile + bento 1+4 desktop
  - `/galleria`: CSS Grid module-based (full/half/tall)
  - Lightbox con frecce, swipe, keyboard nav, caption
- 🗺️ **Mappa** OpenStreetMap (CartoDB Voyager tile, no API key)
- 💬 **WhatsApp** link (numero derivato auto da `contact.phone`)
- 📱 **PWA installabile** (icona su home telefono, fullscreen)
- 🎨 **Tipografia Geist + Fraunces** (serif elegante per i titoli)
- 🔍 **SEO completo**: metadata, hreflang, sitemap.xml, robots.txt, JSON-LD LocalBusiness
- 📨 **Form contatti** + API route (console.log; pronto per Resend)

---

## 🚀 Quick start

```bash
npm install
npm run dev                 # http://localhost:3000
```

Per testare su telefono nella stessa WiFi:

```bash
# Trova IP del Mac
ipconfig getifaddr en0
# Aggiungi in next.config.ts: allowedDevOrigins: ['192.168.x.x']
npm run dev -- -H 0.0.0.0 -p 3000
# Apri http://192.168.x.x:3000 sul telefono
```

Per testare l'**installazione PWA** sul telefono (serve build production):

```bash
npm run build && npm start -- -H 0.0.0.0 -p 3000
```

---

## 📁 Struttura

```
content/site.ts              ← ⭐ unica fonte di verità
core/
├── components/              ← componenti riutilizzabili
└── lib/
    ├── i18n.ts              ← t() helper bilingue
    └── metadata.ts          ← SEO metadata builder
templates/informative/       ← sezioni del template (Hero, About, Services)
app/
├── [locale]/                ← /it, /en
│   ├── page.tsx             ← homepage
│   └── galleria/page.tsx    ← gallery dedicata
├── api/contact/route.ts     ← form handler
├── manifest.ts              ← PWA
├── sitemap.ts               ← SEO
├── robots.ts                ← SEO
├── layout.tsx
└── globals.css
public/
├── icons/                   ← icone PWA (SVG sorgente + PNG generati)
└── sw.js                    ← service worker
scripts/
└── generate-icons.mjs       ← rigenera icone da SVG
middleware.ts                ← redirect / → /it
```

---

## 🎯 Come creare un sito nuovo

### Workflow con Claude Code (consigliato)

1. Copia/clona la cartella in una nuova posizione:
   ```bash
   cp -R tier1 ../colombaia
   cd ../colombaia
   rm -rf node_modules .next .git
   git init -b main
   npm install
   ```

2. Apri Claude Code nella nuova cartella. Il file `CLAUDE.md` viene caricato in automatico.

3. Dai un brief tipo:
   > *"Crea il sito per la colombaia di Mario Rossi. Indirizzo: Via Roma 10, Asti. Email: info@lacolombaia.it. Telefono: +39 333 1234567. Coordinate: 44.9, 8.2. Le foto sono in ./assets/. Brand: lettere LC, colore deep red."*

4. Claude aggiorna `content/site.ts`, sostituisce icone, configura tutto.

### Workflow manuale (se non vuoi Claude)

Modifica solo questi file:

| File | Cosa cambiare |
|---|---|
| `content/site.ts` | Tutti i testi, dati, contatti, FAQ, gallery |
| `public/icons/icon.svg` | Lettere monogramma + colori brand |
| `public/images/` | Sostituire foto reali (o lasciare i picsum) |
| `app/manifest.ts` | `theme_color` se cambi palette |
| `app/globals.css` | `html { background-color }` se cambi palette |

Poi: `node scripts/generate-icons.mjs` per rigenerare le icone PNG.

---

## 🌐 Deploy

Pensato per **Vercel**:

```bash
git remote add origin <tuo-repo-github>
git push origin main
# Su vercel.com → import repo → deploy
```

Zero configurazione extra: Vercel rileva Next.js automaticamente.

> ⚠️ Quando deployi in produzione: `next.config.ts` ha `dangerouslyAllowSVG: true` per i placeholder SVG.
> **Rimuovilo** quando sostituisci tutti i placeholder con foto vere `.jpg/.webp`.

---

## 🛠️ Comandi utili

```bash
npm run dev                        # dev server
npm run build                      # build production
npm start                          # serve la build (necessario per testare PWA install)
node scripts/generate-icons.mjs    # rigenera icone PWA da SVG
```

---

## 📚 Per Claude Code

Le istruzioni operative dettagliate (regole, convenzioni, cosa NON fare, pattern, workflow) sono in **[`CLAUDE.md`](./CLAUDE.md)**.

Quel file viene caricato automaticamente nel contesto di Claude Code quando apri questo progetto. Se lavori tramite Claude, non ti serve leggerlo manualmente.
