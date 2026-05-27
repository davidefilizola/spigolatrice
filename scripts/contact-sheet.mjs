import sharp from 'sharp'
import { readdirSync } from 'node:fs'
import { join } from 'node:path'

const ROOT = '/Users/filizola/Desktop/CLAUDE WORKSPACE/SITI/Spigolatrice'
const CASE = join(ROOT, 'public/images/case')

const THUMB = 200
const COLS = 6
const PAD = 4
const LABEL_H = 18

async function buildSheet(slug, count) {
  const composites = []
  for (let i = 1; i <= count; i++) {
    const num = String(i).padStart(2, '0')
    const buf = await sharp(join(CASE, slug, `${num}.jpg`))
      .resize(THUMB, THUMB, { fit: 'cover' })
      .jpeg({ quality: 70 })
      .toBuffer()
    const col = (i - 1) % COLS
    const row = Math.floor((i - 1) / COLS)
    composites.push({
      input: buf,
      top: row * (THUMB + LABEL_H + PAD) + PAD,
      left: col * (THUMB + PAD) + PAD,
    })
    // Etichetta sotto la thumb
    const lblSvg = Buffer.from(
      `<svg width="${THUMB}" height="${LABEL_H}"><rect width="100%" height="100%" fill="#000"/><text x="50%" y="13" font-size="12" font-family="monospace" fill="#fff" text-anchor="middle">${slug}/${num}</text></svg>`
    )
    composites.push({
      input: lblSvg,
      top: row * (THUMB + LABEL_H + PAD) + PAD + THUMB,
      left: col * (THUMB + PAD) + PAD,
    })
  }
  const rows = Math.ceil(count / COLS)
  const W = COLS * (THUMB + PAD) + PAD
  const H = rows * (THUMB + LABEL_H + PAD) + PAD
  const out = join('/tmp', `sheet-${slug}.jpg`)
  await sharp({ create: { width: W, height: H, channels: 3, background: { r: 20, g: 20, b: 20 } } })
    .composite(composites)
    .jpeg({ quality: 75 })
    .toFile(out)
  console.log(`✓ ${out} (${W}x${H})`)
}

await buildSheet('donegani', 32)
await buildSheet('grossich', 30)
await buildSheet('buschi', 13)
