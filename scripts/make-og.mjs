import sharp from 'sharp'
import { join } from 'node:path'

const root = '/Users/filizola/Desktop/CLAUDE WORKSPACE/SITI/Spigolatrice'
const logo = join(root, 'public/images/logo.png')
const out = join(root, 'public/images/logo-og.png')

// Canvas 1200x630, sfondo crema #fcf8f0 (stesso del sito light mode)
// Logo centrato a 480px (~76% altezza)
const bg = await sharp({
  create: { width: 1200, height: 630, channels: 4, background: { r: 252, g: 248, b: 240, alpha: 1 } }
}).png().toBuffer()

const logoBuf = await sharp(logo).resize(480, 480, { fit: 'contain', background: { r: 252, g: 248, b: 240, alpha: 1 } }).toBuffer()

await sharp(bg)
  .composite([{ input: logoBuf, gravity: 'center' }])
  .png()
  .toFile(out)

console.log('OK', out)
