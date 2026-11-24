// Az aktív beállítás kiválasztása. Alapértelmezett: konyvtar (src/presets/konyvtar.js).
// Másik adatsor: npm run dev:filmek (a .env.filmek VITE_PRESET=filmek értéke alapján).
const presets = import.meta.glob('./presets/*.js', { eager: true })
const name = import.meta.env.VITE_PRESET || 'konyvtar'
const preset = presets[`./presets/${name}.js`]

if (!preset) throw new Error(`Ismeretlen preset: ${name}`)

export default {
  apiBase: import.meta.env.VITE_API_BASE || 'http://localhost:3000',
  ...preset.default
}
