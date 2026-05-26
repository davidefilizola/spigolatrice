/**
 * Genera le icone PNG per la PWA a partire dall'SVG sorgente.
 *
 * Uso:
 *   node scripts/generate-icons.mjs
 *
 * Quando cambi il monogramma (es. da "CE" a "LC" per "La Colombaia"):
 *   1. Modifica public/icons/icon.svg
 *   2. Rilancia questo script
 */
import sharp from 'sharp'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')

const sources = {
  normal: readFileSync(join(root, 'public/icons/icon.svg')),
}

const targets = [
  { size: 192, file: 'icon-192.png',        source: 'normal' },
  { size: 512, file: 'icon-512.png',        source: 'normal' },
  { size: 180, file: 'apple-touch-icon.png', source: 'normal' },
]

for (const { size, file, source } of targets) {
  await sharp(sources[source], { density: 600 })
    .resize(size, size)
    .png()
    .toFile(join(root, 'public/icons', file))
  console.log(`✓ ${file} (${size}×${size})`)
}

console.log('\nDone. Le icone sono in public/icons/')
