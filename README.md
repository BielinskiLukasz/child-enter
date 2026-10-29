# Mały pociąg Artura

A calm, silent Polish-language train activity for three-year-old Artur. **Intended for supervised use by a young child.** This standalone activity uses only the Enter key or the large on-screen button, with no other interaction.

**Try it live: [Mały pociąg Artura](https://bielinskilukasz.github.io/child-enter/)**

## Purpose

A quiet cause-and-effect activity that encourages watching, waiting, and discovering animal friends without reading, timing, scoring, or failure. The train waits patiently at every station until the child is ready to continue.

## Flow

The weather and time of day are randomized upon session start and evolve dynamically along the route right from the first journey:

1. **Home Station:** The train waits at *Stacja Artura* with a randomly selected animal conductor wearing a conductor's cap (chosen from 11 animals: Króliczek, Lisek, Miś, Jeżyk, Sówka, Wiewiórka, Kotek, Piesek, Żabka, Borsuk, Jelonek).
2. **First Pickup:** Pressing `Enter` (or tapping the on-screen button) starts a slow trip to the first destination station, where the first passenger boards a carriage and waves.
3. **Subsequent Pickups:** The train waits indefinitely at each stop. Pressing `Enter` advances to the next two stations, picking up two more unique animal friends so all three carriages are full.
4. **Scenic Tour:** With all passengers aboard, the next `Enter` begins a scenic tour through three randomized picturesque landscapes (chosen from Leśna Polana, Słoneczna Wieś, Górska Dolina, Nadbrzeże Rzeki, Brzozowy Gaj, Śnieżna Polana, and Szepcząca Łąka) under smooth sky and weather transitions.
5. **Return & Farewell:** The train returns to *Stacja Artura*, the friends wave goodbye and leave their carriages, and a fresh journey with new animals and stations is prepared.
6. **Rest Screen:** After $N$ complete rounds (default: 4, or triggered manually via parent controls), a peaceful *"Pora na odpoczynek"* sleeping-moon screen offers a calm transition to rest.

## Controls & Rules

- **Single Control:** The `Enter` key, numeric-keypad `Enter`, and the large on-screen `Enter` button are equivalent and are the only child controls.
- **No Queuing:** Each press or tap starts at most one leg. Holding keys, keyboard auto-repeat, or drumming on the button never queues extra actions or accelerates travel.
- **Ignored Inputs:** Clicking or touching anywhere else (the train, scenery, sky, or title) and pressing other keys (`Space`, arrows, letters) does nothing.
- **Patient Pacing:** Every waiting state lasts until the child is ready. When the browser tab is hidden, both the journey timer and all animations pause and resume seamlessly from the same point.

## Dynamic Environment & Atmosphere

- **Dynamic from Launch:** Time of day (0–24h) and weather (`clear`, `rain`, `snow`, `fog`) are randomized at startup and transition smoothly along the active travel distance right from Journey 1.
- **Day/Night Cycle:** Seamless progression through dawn, daytime, sunset, and night, with the sun and moon following smooth arcs, twinkling stars at night, and warm illuminated cabin and cottage windows.
- **Foreground & Scenery Parallax:** Multi-layered parallax trees, railway sleepers, and foreground wildflowers/grasses move in sync with the train and pause at stations.
- **Reduced Motion:** Respects `prefers-reduced-motion: reduce` by disabling continuous particle movement while preserving gentle sky colour transitions.

## Parent Controls & Safety

- **Parent Value Strip:** A subtle top banner informs supervising adults of the app's safety guarantees (`Bez dźwięku · Bez reklam · Bez internetu · Jedna interakcja · Nic nie wychodzi z urządzenia`).
- **Parent Escape Hatch & Gate:** Long-pressing the sun brand mark for 3 seconds, clicking the gear icon (`⚙`), or pressing `Escape` opens a math-verified Parent Gate (`3 + 4 = ?`).
- **Parent Settings:**
  - Reset the session immediately with a newly randomized conductor, passengers, and station order.
  - Trigger the *"Pora na odpoczynek"* rest screen on demand or configure how many rounds occur before automatic rest.
  - Lock atmosphere overrides for soothing sessions (e.g. *Zawsze noc*, *Zawsze dzień*, *Cichy śnieg*, *Spokojny deszcz*, *Lekka mgła*).

## Phones, Tablets & PWA

The on-screen `Enter` keycap is a real `<button>` sized for a small finger (at least 74 px tall on touch devices) and positioned at the bottom of the screen with `env(safe-area-inset-*)` padding. On touch devices the prompt changes from *"Naciśnij"* to *"Dotknij"*, and double-tap zoom, pinch zoom, text selection, and long-press menus are suppressed. Short landscape screens use a compact layout so nothing overlaps or scrolls. The app includes `public/manifest.json` and an offline-capable Service Worker (`public/sw.js`).

## Run Locally

```sh
npm install
npm run dev
```

## Standalone HTML Build

```sh
npm run build
```

The generated `dist/index.html` bundles the complete application, SVG illustrations, and embedded WOFF2 fonts into a single self-contained file that works offline without a web server.

## Implementation

- `src/App.tsx`: keyboard/touch handling, parent gate trigger, rest screen, and page layout.
- `src/game.ts`: finite-state machine, session randomizer (11 animals, 8 locations), and Polish copy.
- `src/atmosphere.ts`: road-progress weather/time engine and seamless 24-hour colour interpolation.
- `src/components/Atmosphere.tsx` & `src/atmosphere.css`: sun, moon, stars, and rain/snow/fog layers.
- `src/components/Illustration.tsx`: SVG landscapes, locomotive, carriages, parallax meadow, and animal art.
- `src/components/ParentModal.tsx` & `src/components/ParentValueStrip.tsx`: parent trust banner and gated settings modal.
- `src/components/RestScreen.tsx`: calm sleeping-moon rest overlay.
- `src/hooks/useAtmosphere.ts` & `src/hooks/useJourneyClock.ts`: 24 fps DOM-variable updater and visibility-aware phase clock.

## Privacy

No backend, cookies, ads, third-party requests, analytics, or persistent storage. All state lives in memory only. No audio is created or played. Fonts and artwork are bundled locally.

## Verification

```sh
npm run build
npx tsc --noEmit
npx playwright test
```

Automated Chromium tests verify the state machine, randomized roster and stops, single-control input latching, emulated phone touch taps, sideways phone layout, parent modal gate, dynamic Journey 1 atmosphere, hidden-tab pause/resume, reduced-motion fallback, and zero-network offline execution from `dist/index.html`.

## Credits

Original SVG illustrations are in the source. DM Sans and Fraunces are bundled under the SIL Open Font License; license texts are in `src/assets/licenses/` and subsets are embedded in `src/fonts.css` (regenerated with `python3 tools/build-fonts.py`).
