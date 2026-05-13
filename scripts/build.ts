import { $ } from "bun"

await $`tsc --noEmit`

await $`vite build`

await $`cp manifest.json dist/manifest.json`
await $`cp styles/highlight.css dist/content/highlight.css`
await $`cp src/popup/popup.html dist/popup/popup.html`

console.log("✓ Extension built to dist/")
