import sharp from 'sharp'
import { join } from 'node:path'

const DIR = '/Users/filizola/Desktop/CLAUDE WORKSPACE/SITI/Spigolatrice/public/images/quartiere-wm'
const THUMB = 240, COLS = 4, PAD = 6, LBL = 22

const composites = []
for (let i = 1; i <= 8; i++) {
  const num = String(i).padStart(2, '0')
  const buf = await sharp(join(DIR, `${num}.jpg`)).resize(THUMB, THUMB, { fit: 'cover' }).jpeg({ quality: 75 }).toBuffer()
  const col = (i - 1) % COLS
  const row = Math.floor((i - 1) / COLS)
  composites.push({ input: buf, top: row * (THUMB + LBL + PAD) + PAD, left: col * (THUMB + PAD) + PAD })
  const lbl = Buffer.from(
    `<svg width="${THUMB}" height="${LBL}"><rect width="100%" height="100%" fill="#000"/><text x="50%" y="16" font-size="14" font-family="monospace" fill="#fff" text-anchor="middle">wm/${num}</text></svg>`
  )
  composites.push({ input: lbl, top: row * (THUMB + LBL + PAD) + PAD + THUMB, left: col * (THUMB + PAD) + PAD })
}
const rows = Math.ceil(8 / COLS)
const W = COLS * (THUMB + PAD) + PAD
const H = rows * (THUMB + LBL + PAD) + PAD
await sharp({ create: { width: W, height: H, channels: 3, background: { r: 20, g: 20, b: 20 } } })
  .composite(composites).jpeg({ quality: 80 }).toFile('/tmp/mosaic-wm.jpg')
console.log(`✓ /tmp/mosaic-wm.jpg (${W}x${H})`)
