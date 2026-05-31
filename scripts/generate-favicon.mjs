/**
 * Genera i file favicon nei posti che Next.js riconosce automaticamente
 * (file convention App Router), partendo dal logo brand circolare.
 *
 * Output:
 *   app/icon.png        — 256×256, mostrato in tab browser + condivisioni
 *   app/apple-icon.png  — 180×180, iOS home screen
 */
import sharp from 'sharp'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const src = join(root, 'public/images/logo.png')

// Tab browser / Google search
await sharp(src).resize(256, 256, { fit: 'contain', background: { r: 252, g: 248, b: 240, alpha: 1 } }).png().toFile(join(root, 'app/icon.png'))

// iOS home screen (mantiene fondo crema per non risultare ritagliata)
await sharp(src).resize(180, 180, { fit: 'contain', background: { r: 252, g: 248, b: 240, alpha: 1 } }).png().toFile(join(root, 'app/apple-icon.png'))

console.log('✓ app/icon.png (256×256)')
console.log('✓ app/apple-icon.png (180×180)')
