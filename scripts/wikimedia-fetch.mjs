/**
 * Scarica un set di foto Wikimedia Commons, ridimensiona, e genera credits.json
 * con i metadati di attribuzione (license, autore, URL pagina).
 *
 * Uso: node scripts/wikimedia-fetch.mjs
 */
import sharp from 'sharp'
import { writeFileSync, mkdirSync, existsSync, unlinkSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

const ROOT = '/Users/filizola/Desktop/CLAUDE WORKSPACE/SITI/Spigolatrice'
const OUT_DIR = join(ROOT, 'public/images/quartiere-wm')

// Lista di file Wikimedia da scaricare. NB: si parte da numero 07 perché 01-06
// sono già occupati dalle foto locali in public/images/quartiere/.
const CANDIDATES = [
  { title: 'Polimi Leonardo campus main building.jpg',                                                              caption: { it: 'Politecnico di Milano · Campus Leonardo', en: 'Politecnico di Milano · Leonardo Campus' } },
  { title: 'Tende fuori dal Politecnico di Milano.jpg',                                                              caption: { it: 'Davanti al Politecnico',                en: 'Outside the Politecnico' } },
  { title: 'Center for Nano Science and Technology.jpg',                                                             caption: { it: 'Centro Nano-Scienze e Tecnologie',      en: 'Center for Nano Science and Technology' } },
  { title: 'Città Studi.jpg',                                                                                        caption: { it: 'Città Studi',                            en: 'Città Studi area' } },
  { title: 'Students crowd gather in Piazza Leonardo in Città Studi (Milano) watching the solar eclipse of 2015 March 20.jpg', caption: { it: 'Piazza Leonardo da Vinci',           en: 'Piazza Leonardo da Vinci' } },
  { title: 'Chiesa del SS. Nome di Maria-2019-07-02-Anurag Behera.jpg',                                              caption: { it: 'Chiesa del SS. Nome di Maria, Lambrate', en: 'Church of the Holy Name of Mary, Lambrate' } },
  { title: 'Milano, viale Rimembranze di Lambrate. (27637367719).jpg',                                               caption: { it: 'Viale delle Rimembranze di Lambrate',    en: 'Viale delle Rimembranze, Lambrate' } },
  { title: 'Milano - piazza Vigili del Fuoco.JPG',                                                                   caption: { it: 'Piazza Vigili del Fuoco',                en: 'Piazza Vigili del Fuoco' } },
]

const API = 'https://commons.wikimedia.org/w/api.php'

const UA = 'SpigolatriceDiLambrateSiteBuild/1.0 (https://spigolatricedilambrate.com; pamelapinna79@gmail.com)'

async function fetchMetadata(title) {
  // Chiedo thumburl 1600px così evito di scaricare l'originale (rate-limited)
  const url = `${API}?action=query&titles=${encodeURIComponent('File:' + title)}&prop=imageinfo&iiprop=url|user|extmetadata|size&iiurlwidth=1600&format=json&origin=*`
  const res = await fetch(url, { headers: { 'User-Agent': UA, Accept: 'application/json' } })
  const data = await res.json()
  const page = Object.values(data.query.pages)[0]
  if (!page.imageinfo) throw new Error('No imageinfo for ' + title)
  const info = page.imageinfo[0]
  const md = info.extmetadata || {}
  return {
    title,
    url: info.thumburl || info.url, // thumb se disponibile (cacheable), fallback all'originale
    width: info.width,
    height: info.height,
    license: md.LicenseShortName?.value || 'unknown',
    licenseUrl: md.LicenseUrl?.value || '',
    artistHtml: md.Artist?.value || '',
    pageUrl: info.descriptionurl || `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(title)}`,
  }
}

function stripHtml(html) {
  return html.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim()
}

async function downloadAndResize(url, dst, retries = 3) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    const res = await fetch(url, { headers: { 'User-Agent': UA } })
    if (res.ok) {
      const buf = Buffer.from(await res.arrayBuffer())
      await sharp(buf)
        .resize(1280, 1280, { fit: 'inside', withoutEnlargement: true })
        .jpeg({ quality: 80 })
        .toFile(dst)
      return
    }
    if (res.status === 429 && attempt < retries) {
      const wait = attempt * 4000
      console.log(`  … 429, retry in ${wait}ms`)
      await new Promise(r => setTimeout(r, wait))
      continue
    }
    throw new Error(`Download failed ${res.status}: ${url}`)
  }
}

mkdirSync(OUT_DIR, { recursive: true })
// Pulisci cartella per re-run
for (const f of readdirSync(OUT_DIR)) {
  unlinkSync(join(OUT_DIR, f))
}

const sleep = (ms) => new Promise(r => setTimeout(r, ms))

const credits = []
let idx = 0
for (const c of CANDIDATES) {
  idx++
  const num = String(idx).padStart(2, '0')
  const dst = join(OUT_DIR, `${num}.jpg`)
  // Throttle: 2 secondi tra una richiesta e l'altra per stare buoni con Wikimedia
  if (idx > 1) await sleep(2000)
  try {
    const meta = await fetchMetadata(c.title)
    await sleep(500)
    await downloadAndResize(meta.url, dst)
    const artist = stripHtml(meta.artistHtml)
    credits.push({
      file: `${num}.jpg`,
      title: c.title,
      caption: c.caption,
      license: meta.license,
      licenseUrl: meta.licenseUrl,
      author: artist,
      sourceUrl: meta.pageUrl,
    })
    const kb = Math.round((await sharp(dst).metadata()).size / 1024)
    console.log(`✓ ${num}.jpg ← ${c.title.slice(0, 60)}… (${meta.license}, ${artist.slice(0, 40)})`)
  } catch (e) {
    console.log(`✗ ${c.title} — ${e.message}`)
  }
}

writeFileSync(join(OUT_DIR, 'credits.json'), JSON.stringify(credits, null, 2))
console.log(`\n${credits.length} foto scaricate. Credits in ${join(OUT_DIR, 'credits.json')}`)
