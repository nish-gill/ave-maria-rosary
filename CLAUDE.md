# Ave Maria Rosary — project notes for Claude

Read this first. It carries the context from the planning conversation that
happened before this repository existed.

## What this is

A Rosary prayer app: the full Rosary (opening prayers, 5 decades, closing
prayers) in 12 languages (en, la, fr, pt, de, es, it, el, ru, nl, ga, ja),
with Scripture and a short meditation per mystery, dark mode, high contrast,
font size, accent themes, a "Zen" button, a first-run tutorial, and an
optional "Prayer Method" layer based on St. Louis de Montfort's Five Methods.

The owner is not a professional developer. Explain changes in plain language,
say what you changed and why, and prefer small, reviewable steps.

## Where the code came from

- Built originally on Base44 (app "Ave Maria Rosary", id 6893d0d94030abae59df1392).
- Exported on 2026-09-27 from the Base44 branch **"Rosary meditation guides"**
  (which includes everything on Base44 Main plus the Five Methods work that was
  never merged there). The live Base44 site (ave-maria-rosary.base44.app) does
  NOT have the Five Methods.
- Every file under `src/components/rosary/**`, `src/pages/Rosary.jsx`,
  `src/components/ui/*` and `src/index.css` was copied byte-for-byte from the
  Base44 source and verified by SHA-256.
- Replaced for standalone use: `package.json` (≈45 unused packages dropped, no
  Base44 SDK), `vite.config.js` (no Base44 plugin, adds `@` alias),
  `index.html`, `src/App.jsx` (no auth/router/react-query/toaster — the app is
  one screen and uses the URL hash), `tailwind.config.js` (ESM),
  `eslint.config.js`, `jsconfig.json`.
- Removed Base44-only files: `api/base44Client.js`, `lib/AuthContext.jsx`,
  `lib/app-params.js`, `lib/query-client.js`, `lib/PageNotFound.jsx`,
  `components/UserNotRegisteredError.jsx`, `components/ui/toast*.jsx`.
- **Not yet run.** The export was checked with esbuild (all files parse and all
  local imports resolve) but `npm install` was blocked where it was prepared.
  First task: `npm install && npm run build && npm run dev`, then compare
  behaviour against the live Base44 site.

## Goals (owner's decisions)

1. An app mobile users can install and always have available, including
   offline. Decision: an installable web app (PWA) on free static hosting
   (Cloudflare Pages or Netlify, connected to this GitHub repo). App stores
   later only if wanted (Apple $99/yr, Google $25 once).
2. No ongoing cost.
3. Implement St. Louis de Montfort's Five Methods faithfully (see below).

## Architecture in one paragraph

`pages/Rosary.jsx` owns all state. `RosaryData.jsx` builds the prayer sequence;
every prayer has a **permanent id** (`OPEN-SIGN`, `OPEN-CREED`, `OPEN-OF`,
`OPEN-HM01..03`, `OPEN-GB`, `D{1-5}-ANN|OF|HM01..10|GB|FP`, `CLOSE-HOLY-QUEEN`,
`CLOSE-FINAL`). In the URL the `D` becomes the mystery-set letter
(`J`/`S`/`G`/`L`, e.g. `#J1-HM05`) via `idToUrl`/`parseUrlId`. Never replace
these ids with array indexes. Progress is saved to localStorage
(`rosaryProgress`), as is the method (`rosaryMeditation`). All text lives in
`Translations.jsx` (~127 KB, all languages). The Montfort layer is
`meditation/MontfortMethods.jsx` → `resolveMeditation(method, prayer, set)`
returns `{ phrase, block }`; `PrayerMethodSection` is the inline selector,
`MeditationBlock` renders a block.

## Known bugs (fix early)

- Method 5 shows nothing on Hail Marys for the Luminous mysteries:
  `getMethod5Motive` has no `luminous` offset (should be 15; motives 151–200
  exist in the array).
- Method UI strings (`ui.montfort`) exist only in English; Method 2/3 phrase
  insertion only works when prayer language is English (other languages get an
  English caption).
- `PrayerMethodSection` ignores the animations setting (expand/collapse and
  chevron always animate). The owner cares about this: disabling animations
  must disable all of them.
- `PrayerDisplay`'s `React.memo` is defeated: `Rosary.jsx` passes
  `methodSection` / `meditation` as JSX created every render. Pass data props
  and render inside `PrayerDisplay`.
- Settings (dark mode, contrast, font size, accent, animations, speed, the three
  languages, Zen button/mode) are not persisted; tutorial opens on every visit
  (`tutorialOpen` starts `true`).
- Pressing `R` resets the Rosary with no confirmation.
- `TutorialHints.jsx` still contains code that clicks the Base44 badge's close
  button; it is dead now and can be removed.
- Previously reported and never confirmed fixed: the nav menu scrolling to the
  current prayer when opened, and menus respecting "animations off". Re-test.

## Optimizations (measured on the Base44 build)

- `ACCENT_THEMES` is imported from `SettingsMenu.jsx`, which pulls the whole
  Settings menu into the main bundle and defeats its `lazy()` import. Move it to
  its own file (e.g. `components/rosary/themes.js`).
- All 12 languages load up front. Split `Translations.jsx` per language; keep
  English bundled as fallback; load others with dynamic `import()`.
- Montfort content (Methods 4/5 ≈ 35 KB source) loads even for the standard
  Rosary; load per method on selection.
- Base44's live main bundle was 681 KB raw / 231 KB gzipped; its badge script
  (154 KB gzipped) is gone now that we host ourselves.

## PWA / hosting checklist

- Add `vite-plugin-pwa` (manifest + service worker precaching all assets so the
  app works fully offline). Needs icons (192, 512, maskable, apple-touch). The
  old favicon was hosted on Base44 storage — ask the owner for an image or make
  a simple one.
- iPhone users must use Safari → Share → Add to Home Screen; add a small
  "How to install" hint.
- Deploy: Cloudflare Pages or Netlify, build command `npm run build`, output
  `dist`. The owner connects the host to GitHub themselves.

## St. Louis de Montfort's Five Methods — what they actually are

The current Montfort content was written by Base44's AI and is **not**
Montfort's text. Do not generate devotional text yourself; ask the owner for
the source text or a translation and use it verbatim. Montfort's French
original is public domain; the common English translation is
"© The Montfort Missionaries 1987" — the owner is deciding the source.

- **Method 1:** opening offering (uniting with the saints); each decade offered
  in honour of its mystery asking one named grace; after the decade "May the
  grace of the mystery of … come into me and make me truly …"; closing prayer.
  (Current petitions are paraphrased and several differ, e.g. Finding = true
  conversion; Crucifixion = horror of sin, love of the Cross, holy death;
  4th Glorious names the Immaculate Conception and Assumption.)
- **Method 2:** one or two words after "Jesus" in every Hail Mary — becoming
  man, sanctifying, born in poverty, sacrificed, holy of holies; in his agony,
  scourged, crowned with thorns, carrying his Cross, crucified; risen from the
  dead, ascending to heaven, filling thee with the Holy Spirit, raising thee up,
  crowning thee — plus a short prayer for the grace after each set of five.
  (Current code uses long invented clauses.)
- **Method 3 (for the Daughters of Wisdom):** opening intention; per decade an
  offering, a word after "Jesus" and a grace; plus the Magnificat after the
  first chaplet, the nine choirs of angels invoked before the Hail Marys of the
  Crucifixion decade, a prayer for wisdom and to St Joseph between sorrowful
  and glorious, saints invoked in the Coronation decade, closing prayer to Mary.
- **Method 4:** each Our Father honours an attribute of God (e.g. the
  Incarnation: the immense charity of God); each Hail Mary has its own point;
  the Creed and opening prayers have points too. (Current code has no Our
  Father layer and uses invented Gospel narration.)
- **Method 5:** 150 motives for praying the Rosary, in groups of ten under
  Montfort's headings (definition, Old Testament figures, origin/St Dominic &
  Alan de la Roche, triple crown, the prayers, the Hail Mary, the mysteries,
  fruits, miracles, confraternity, indulgences), starting at the Creed.
- **Luminous mysteries** (2002) postdate Montfort: any content for them is new
  writing and must be labelled (e.g. "in the spirit of St Louis de Montfort").

Sources: montfort.org.uk/Writings/MSR.php, montfortian.info.

### Recommended content structure

Keep the layering idea (never alter the sequence or ids). Replace per-method
content files with one schema of optional slots each method fills:

```
method = {
  id, source: 'montfort' | 'adapted' | 'new',
  opening:  { 'OPEN-SIGN': text },
  intro:    { 'OPEN-CREED': ..., 'OPEN-OF': ..., 'OPEN-HM01': ... },
  decades:  { joyful: [ { offering, ourFather, beforeHailMary[10],
                          hailMaryInsert, hailMary[10], afterDecade, source } ], ... },
  setEnd:   { joyful: text, ... },
  closing:  { 'CLOSE-HOLY-QUEEN': text },
}
```

Store content per language (`meditation/content/<lang>/method-N.js`), load on
demand, fall back to English with a visible note. For Hail Mary insertion,
store a rule per prayer language — word order differs: en "Jesus." / la
"Iesus." / es "Jesús." / pt, de "Jesus." / it "Gesù." / nl "Jezus." /
ga "Íosa." / ru "Иисус." / el "Ἰησοῦς." ; French puts "Jésus" before "le fruit
de vos entrailles"; Japanese reads "御子イエス".

## Suggested order of work

1. Install, build, run; compare with the live Base44 app.
2. PWA + deploy (so the owner has an installable app early).
3. Bug fixes above.
4. Optimizations above.
5. Montfort restructure (plumbing only), then real content from the owner,
   then translations.
