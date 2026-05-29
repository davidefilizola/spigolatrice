# Deploy & SEO — checklist post-implementazione

Step-by-step da fare nell'ordine. Tempo totale ~45 minuti.

---

## 1. Vercel — importa il repo

1. Vai su <https://vercel.com/new> (login con GitHub)
2. Click su **Import** accanto al repo `davidefilizola/spigolatrice`
3. Lascia tutti i default (framework rilevato automaticamente: Next.js)
4. **Environment Variables**, aggiungi:

   | Nome | Valore | Environments |
   |---|---|---|
   | `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` | `71524e8b-ff80-4a8d-92c4-c5e62de5b2dd` | Production · Preview · Development |
   | `GOOGLE_SITE_VERIFICATION` | (vuoto per ora, lo riempi al passo 4) | Production · Preview · Development |

5. Click **Deploy**. Aspetta ~2 minuti. Otterrai un'URL provvisoria tipo `spigolatrice-xxx.vercel.app`.

---

## 2. Hostinger DNS — punta il dominio a Vercel

> Stai per sostituire il sito attuale `spigolatricedilambrate.com` (Zyro/Hostinger Builder) con il nuovo deploy Vercel. **Prima fai un backup** del sito attuale se ti serve (screenshot o export).

### Step 2.1 — Vercel: aggiungi il dominio

1. Su Vercel, vai sul progetto → **Settings** → **Domains**
2. Aggiungi `spigolatricedilambrate.com` (e `www.spigolatricedilambrate.com`)
3. Vercel mostra i record DNS da configurare. Tipicamente:
   - `A` per `@` → `76.76.21.21`
   - `CNAME` per `www` → `cname.vercel-dns.com`

### Step 2.2 — Hostinger: aggiorna i DNS

1. Login su <https://hpanel.hostinger.com>
2. Domini → `spigolatricedilambrate.com` → **DNS / Nameserver**
3. **Disabilita** il sito Zyro attuale (Hostinger Builder) se è collegato come "Sito vetrina"
4. Aggiungi/modifica i record DNS:

   | Tipo | Nome | Valore | TTL |
   |---|---|---|---|
   | `A` | `@` | `76.76.21.21` | 3600 |
   | `CNAME` | `www` | `cname.vercel-dns.com` | 3600 |

   Se ci sono record `A` o `CNAME` esistenti che puntano a Zyro/Hostinger, **eliminali** o sostituiscili.

5. Salva. Propagazione: 5 minuti – 24 ore (di solito veloce).

### Step 2.3 — Verifica

- Su Vercel, sotto `Settings → Domains`, dovresti vedere il dominio in stato **Valid**.
- Apri <https://spigolatricedilambrate.com> in incognito: deve mostrare il nuovo sito.
- HTTPS è automatico (Vercel emette certificato Let's Encrypt).

---

## 3. Google Search Console — registra il sito

1. Vai su <https://search.google.com/search-console>
2. **Add property** → scegli **URL prefix** → inserisci `https://spigolatricedilambrate.com`
3. Per la verifica, scegli **HTML tag**. Google ti dà un codice tipo:
   ```html
   <meta name="google-site-verification" content="abcXyz123…" />
   ```
4. Copia **solo il valore** del `content="…"` (es. `abcXyz123…`)
5. Torna su Vercel → **Settings** → **Environment Variables** → modifica `GOOGLE_SITE_VERIFICATION` mettendo quel valore
6. Sempre su Vercel: **Deployments** → click ⋯ sull'ultimo → **Redeploy** (perché le env var hanno effetto solo dopo un nuovo deploy)
7. Aspetta che il deploy finisca, poi torna su Search Console e click **Verify**.

### Step 3.1 — Sottometti la sitemap

Una volta verificato:
1. Sidebar di Search Console → **Sitemaps**
2. Aggiungi: `sitemap.xml` (Search Console prependerà l'URL del sito)
3. Status atteso: **Success** (entro qualche giorno Google indicizza tutto)

---

## 4. Vercel Analytics — già attivo

Non serve nessuna configurazione. Appena il sito è live, vai sul progetto Vercel → tab **Analytics**: vedrai i visitatori in tempo reale.

---

## 5. (Opzionale) Google My Business

Aiuta moltissimo la local SEO. Per crearne uno:
1. <https://www.google.com/business/>
2. Login con la Gmail di Pamela
3. Add business → **Spigolatrice di Lambrate**
4. Categoria: **Vacation home rental agency** o **Bed and breakfast**
5. Indirizzo: Piazza Donegani, Milano (sede)
6. Telefono: `+39 339 446 7784`
7. Sito web: `https://spigolatricedilambrate.com`
8. Verifica: Google manda una cartolina cartacea all'indirizzo dichiarato (5-15 giorni).

Una volta verificato, aggiungi:
- Foto del logo
- Foto degli interni (riusa quelle in `public/images/case/`)
- Orari (24/7 se gestione affitti brevi)
- Servizi: WiFi, AC, lavatrice, ascensore, ecc.

---

## 6. Checklist SEO post-deploy

Una volta che il sito è live e indicizzato:

- [ ] Testa la home con <https://pagespeed.web.dev/> → target ≥ 90 Performance, ≥ 95 SEO, ≥ 95 Accessibility
- [ ] Cerca su Google `site:spigolatricedilambrate.com` (dopo 3-7 giorni dalla sottomissione sitemap) → devi vedere tutte le pagine indicizzate
- [ ] Cerca `spigolatrice di lambrate` → entro 1-2 settimane sarai primo (è un nome brand univoco)
- [ ] Cerca `affitto milano bitcoin` → la pagina `/cripto` dovrebbe comparire entro 2-4 settimane
- [ ] Verifica rich results con <https://search.google.com/test/rich-results> → testa una pagina casa, deve mostrare il rating ★ nei risultati
- [ ] Verifica OpenGraph con <https://www.opengraph.xyz/> → l'anteprima del link su WhatsApp/Telegram deve mostrare il logo OG

---

## 7. Cose che restano DA fare a mano (non possono essere automatizzate)

- **Profilo Airbnb host**: già linkato nel JSON-LD, ma se Pamela ha anche profili Booking.com o VRBO, aggiungili in `content/site.ts → site.social` come nuove voci e aggiornali nel JSON-LD di `app/[locale]/page.tsx`.
- **Instagram / Facebook**: se Pamela apre profili social, idem.
- **Recensioni Google**: chiedere agli ospiti di lasciare una recensione su Google (link diretto: `https://search.google.com/local/writereview?placeid=PLACE_ID` — ottieni il PLACE_ID dopo aver creato GMB).

---

## 8. Quando rifare il deploy

Ogni `git push` su `main` triggera un deploy automatico su Vercel. Niente da fare manualmente.

Per cambiamenti che richiedono nuove env var (es. nuove integrazioni), aggiungi la var su Vercel e fai **Redeploy** manuale dal dashboard.
