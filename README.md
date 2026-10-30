# Mały pociąg Artura

A calm, silent Polish-language train activity for three-year-old Artur. **Intended for supervised use by a young child.** This standalone activity uses only the Enter key or the large on-screen button, with no other interaction.

**Try it live: [Mały pociąg Artura](https://bielinskilukasz.github.io/child-enter/)**

## Purpose

A quiet cause-and-effect activity that encourages watching, waiting, and discovering animal friends without reading, timing, scoring, or failure. The train waits patiently at every station until the child is ready to continue.

## Flow

The weather and time of day are randomized upon session start and evolve dynamically along the route right from the first journey:

1. **Home Station:** The train waits at _Stacja Artura_ with a randomly selected animal conductor wearing a conductor's cap (chosen from 11 animals: Króliczek, Lisek, Miś, Jeżyk, Sówka, Wiewiórka, Kotek, Piesek, Żabka, Borsuk, Jelonek). The conductor stands on the platform beside the locomotive and waves, and the cab is empty.
2. **First Pickup:** Pressing `Enter` (or tapping the on-screen button) makes the conductor climb back into the cab before the train starts a slow trip to the first destination station, where the first passenger boards a carriage and waves.
3. **Subsequent Pickups:** The train waits indefinitely at each stop. Pressing `Enter` advances to the next two stations, picking up two more unique animal friends so all three carriages are full.
4. **Scenic Tour:** With all passengers aboard, the next `Enter` begins a scenic tour through three randomized picturesque landscapes (chosen from Leśna Polana, Słoneczna Wieś, Górska Dolina, Nadbrzeże Rzeki, Brzozowy Gaj, Śnieżna Polana, and Szepcząca Łąka) under smooth sky and weather transitions.
5. **Return & Farewell:** The train returns to _Stacja Artura_, the friends wave goodbye and leave their carriages, and the conductor steps back out onto the platform. A fresh journey with new animals and stations is prepared.
6. **Rest Screen:** After $N$ complete rounds (default: 4, or triggered manually via parent controls), a peaceful _"Pora na odpoczynek"_ sleeping-moon screen offers a calm transition to rest.

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
- **Parent Escape Hatch & Gate:** Long-pressing the sun brand mark for 3 seconds, clicking the gear icon (`⚙`), or pressing `Escape` opens a changing addition challenge. The answer is never revealed after a wrong attempt. This is a child-resistant convenience gate, not account authentication.
- **Parent Settings:**
  - Reset the session immediately with a newly randomized conductor, passengers, and station order.
  - Trigger the _"Pora na odpoczynek"_ rest screen on demand or configure how many rounds occur before automatic rest. Waking the train requires passing the parent gate again.
  - Set an active, visible-session playtime limit (default: 20 minutes). An hourglass appears without a numeric countdown; at the limit the rest screen opens. A parent can approve one continuation from the gated settings.
  - Lock atmosphere overrides for soothing sessions (e.g. _Zawsze noc_, _Zawsze dzień_, _Cichy śnieg_, _Spokojny deszcz_, _Lekka mgła_).

## Phones, Tablets & PWA

The on-screen `Enter` keycap is a real `<button>` sized for a small finger (at least 74 px tall on touch devices) and positioned at the bottom of the screen with `env(safe-area-inset-*)` padding. On touch devices the prompt changes from _"Naciśnij"_ to _"Dotknij"_. The button suppresses text selection, tap highlights, double-tap activation, and its long-press context menu. Browser zoom remains available for caregivers with low vision. Short landscape screens use a compact layout so nothing overlaps or scrolls.

There are two offline delivery modes. The production `dist/index.html` is self-contained and works directly offline, but file URLs cannot install a service worker. For an installable PWA, deploy the complete `dist/` directory to HTTPS (for example GitHub Pages) or localhost. On the first online visit the service worker precaches the HTML shell, manifest, and icon PNGs; later visits can open while offline. Updates are served network-first for page navigations and replace cached shell assets for the next visit.

## Home Page UI Reference

The app is a single full-viewport screen; there is no routing. This section describes that screen as built, so future work can extend it without breaking its calm, one-control character. Markup lives in `src/App.tsx`; layout in `src/styles/layout.css`; breakpoints in `src/styles/responsive.css`; colour tokens in `src/styles/tokens.css` and `src/atmosphere.css`.

### Design principles (do not break)

- **One child control.** The only thing a child can act on is the `Enter` keycap. Everything else is `pointer-events: none`, decorative, or parent-only. New child-facing interactions are out of scope.
- **Nothing is urgent.** No countdowns, scores, badges, or progress bars. The hourglass is a wordless icon with no number. Time pressure is expressed only as a gentle dim of the scene.
- **Calm palette, no hard edges.** Paper-cream base (`#f6f3e8`), muted greens for text, one warm accent (`#9c7155`). A faint SVG noise overlay (`.little-world::after`, 12% opacity) sits over everything to keep flat fills from looking digital.
- **The sky is the theme engine.** Nearly every colour is a CSS variable set at runtime by `useAtmosphere`. Hard-code a colour only for things that must never change with the time of day.

### Art style

The illustration is a **flat, paper-cut storybook** — closer to a gouache picture book or layered construction paper than to a cartoon. Everything is hand-authored inline SVG in `src/components/illustration/`; there are no raster images. New artwork should pass as a page from the same book.

**Rendering rules (as implemented)**

- **Fills, not outlines.** Shapes are built from solid fills. Strokes appear only where a stroke _is_ the object — a blade of grass, a tree trunk, a whisker, a birch bark notch, a railway rail. There are no black contour lines around characters or props.
- **Every line is soft.** All 34 stroke uses are `strokeLinecap="round"`; weights cluster at 2–5 px (in a 1600 × 640 viewBox), up to 8–9 px for trunks and ties. Nothing is sharp or hairline.
- **No digital effects.** Zero `<filter>`s, blurs, or drop shadows in the scene. Depth comes from stacking: a lighter band at the top of a carriage (`#f9f0d3` at 32 % opacity), a darker "shade" tone per carriage, a faint 10 %-opacity ellipse under the train. Three `linearGradient`s and one `radialGradient` exist in total (ground fade, fog, night wash, moon halo) and all are smooth two-stop washes.
- **Rounded corners everywhere.** Rectangles carry `rx` 3–11; the locomotive boiler is `rx="29"`. Hills, water and clouds are drawn with quadratic/cubic curves, never polygons.
- **One paper grain over all of it.** The 12 % SVG-noise overlay on `.little-world::after` is part of the look; it is what makes flat fills read as pigment on paper. Don't disable it for new elements.

**Palette.** Low saturation, warm, slightly desaturated as if seen through cream paper. Pure black never appears; pure white is reserved for four tiny points of light — the owl's eye glints and the deer's spots — and everything else that reads as "white" is a cream.

| Family         | Representative values                             | Used for                                                                                 |
| -------------- | ------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| Paper creams   | `#fffcf3` `#f5eedb` `#f7f2b5` `#f8f5e8`           | Clouds, steam, snow caps, light fur, petals, window light                                |
| Meadow greens  | `#8da982` `#94aa83` `#648a71` `#557c66` `#a8bfaa` | Tree crowns and pines — several nearby greens per scene, never one flat green            |
| Ink greens     | `#3f4d40` `#3e5b4d` `#405d4b` `#4e7163`           | Eyes, loco cab, chassis, conductor's cap, text ink                                       |
| Earth and bark | `#b96f52` `#b78268` `#9c7155` `#777c58`           | Locomotive body, roofs, trunks, accent text                                              |
| Carriage trio  | `#dfbc70` / `#a5bbae` / `#d4a38c`                 | Ochre, sage, clay — one per carriage, each with a matching darker `shade` and olive roof |
| Blush          | `#cf9f89` (55 % opacity) `#dcb9a8` `#deb09d`      | Cheeks, inner ears                                                                       |
| Water and dusk | `#a6c8c7` `#c0d4cf` `#b7c4ce`                     | River, snow shadow, cloudy-sky tint                                                      |

Weather and time of day do **not** repaint the artwork; they tint it through the CSS variables listed under _Theming contract_. That is why fixed colours above stay plausible at noon and at 1 a.m.

**Character grammar.** All eleven animals are one template with swappable parts, which is what keeps them reading as a family:

- Round or near-round head (`r ≈ 30–34`) over a smaller round body; stubby oval paws; one arm raised in a slow `friendly-wave`.
- A shared face: two small dark ovals for eyes (`#3f4d40`), a tiny rounded nose (`#495043`), a two-bump smile, and translucent pink cheeks. The owl alone swaps in big cream eye-discs and a beak.
- Species is carried **only by silhouette** — rabbit ears, fox muzzle, hedgehog quills, owl tufts, squirrel ear-tufts, cat triangles, floppy dog ears, frog eye-bumps, badger stripe, deer antlers — plus one fur colour from `furColors`. No character has patterns, outlines or extra details beyond that.
- Every animal wears a small scarf/collar in one of three muted tones; the driver adds a green two-tone conductor's cap with a gold badge.

When adding an animal: start from the template, change the fur hex and the silhouette layer, keep the face, keep the scarf, and put it in the `furColors` map so the palette stays coherent.

**Scenery grammar.** Each of the eight landscapes is three to four overlapping hill bands (lighter and bluer with distance) plus two or three reusable props from a small kit: `Pine`, `Tree` (two crown shapes), `BirchTree`, `Cottage`, `Windmill`, `Sailboat`, reeds, fence lines, wildflowers. Distant mountains get a cream snow-cap triangle; nothing in the far ground has detail smaller than a window. Birds are a single two-arc stroke. New landscapes should be assembled from this kit before new props are drawn.

**What the style is not.** No gradients on characters, no gloss or specular highlights, no thick outlines, no saturated primaries, no sharp corners, no fine texture inside shapes, no perspective. If a new element looks like a sticker, an icon or a video-game sprite, it is off-style.

### Anatomy, top to bottom

| Zone                 | Element / class                                                                | Purpose                                                                                                                                                                                                                                                                                                      | Interactive?           |
| -------------------- | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------- |
| Screen-reader region | `.sr-only[aria-live="polite"]`                                                 | Single live region; announces `journeyAriaAnnouncement()` on every phase change. Keep exactly one live region on the page.                                                                                                                                                                                   | No                     |
| Parent value strip   | `<aside class="parent-value-strip">` → collapses to `.parent-pill-trigger`     | Safety line: _Bez dźwięku · Bez reklam · Bez internetu · Jedna interakcja · Nic nie wychodzi z urządzenia_. Has **Ustawienia** and **✕**. Dismissing it swaps in a small "Dla rodziców" pill at top-right.                                                                                                   | Parent                 |
| Header               | `<header class="site-header">`                                                 | Left: wordless **sun brand mark** (`SunMark`, a `<button>`; 3 s hold opens the parent gate). Right: optional **hourglass** (only when a playtime limit is set), **mute icon + "Zawsze bez dźwięku"**, and the **⚙ gear** button. The name is intentionally not repeated here because the `<h1>` carries it. | Parent                 |
| Introduction         | `<section class="introduction">` (`top: 13.5%`, `pointer-events: none`)        | Decorative leaf flourish, `<h1>` **Mały pociąg _Artura_** in Fraunces (serif) with the accent on _Artura_, and `.intro-subtitle` showing the current **Maszynista** and **Stacja**. The subtitle is the only header text that changes during play.                                                           | No                     |
| Landscape            | `<div class="landscape">` (`inset: 27% 0 135px`, `pointer-events: none`)       | The full SVG scene from `components/illustration/`: sky and celestial bodies, crossfading scenery, parallax trees, station, railway, train with three carriages, foreground meadow, weather particles. Only the active and crossfading landscapes are mounted.                                               | No                     |
| Journey invitation   | `<section class="journey-invitation">` (`bottom: max(60px, safe-area + 50px)`) | `.journey-message` (narrative line from `journeyMessage()`), `.journey-teaser` (next stop and friend, only while waiting), the `.keyboard-invitation` row **Naciśnij / Dotknij → `[Enter ↵]` → i ruszajmy w drogę**, and `.patient-note` ("Pociąg poczeka. Mamy czas.").                                     | **Child (Enter only)** |
| Footer               | `<footer class="page-footer">`                                                 | Two muted taglines with a leaf and a heart. Hidden on short landscape phones.                                                                                                                                                                                                                                | No                     |
| Overlays             | `RestScreen`, `ParentModal` (native `<dialog>`)                                | Rest screen (`z-index: 60`) and parent modal (`z-index: 50`) sit above the noise layer (`z-index: 10`). Both trap focus and restore it on close.                                                                                                                                                             | Parent                 |

### The Enter keycap

The keycap is a real `<button class="enter-key">`, styled as a physical key: cream face, 1 px olive border, a thicker 4 px bottom border plus a `0 3px 0` shadow for depth, and a `translateY(2px)` press state that shortens the bottom border. It carries the label **Enter** plus a return-arrow glyph.

| Context                                   | Size                                                       | Prompt word  |
| ----------------------------------------- | ---------------------------------------------------------- | ------------ |
| Pointer devices                           | 122 × 50 px, 16 px DM Sans 600                             | **Naciśnij** |
| Touch (`hover: none` + `pointer: coarse`) | `min(280px, 72vw)` × 74 px, 23 px text, 7 px bottom border | **Dotknij**  |
| Short landscape touch (≤ 560 px tall)     | `min(240px, 44vw)` × 52 px                                 | Dotknij      |

It suppresses text selection, tap highlight, double-tap zoom and the long-press context menu. While the train is moving it stays in the DOM (so focus never jumps) but is marked `aria-disabled` and the whole invitation row fades to 45% opacity (`.is-travelling`). While waiting (`.is-ready`) it idles with a slow `key-presence` breathe animation. Clicks with `event.detail === 0` are ignored so a keyboard `Enter` on the focused button is not counted twice.

### State classes on `<main class="little-world">`

| Class / attribute                                                                                      | Set when                                                         | Visual effect                                                                   |
| ------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| `.is-moving`                                                                                           | phase is departing / travelling / arriving / touring / returning | Starts wheel spin, pistons, parallax trees, rail sleepers and foreground meadow |
| `.is-paused`                                                                                           | tab hidden                                                       | Pauses **every** CSS animation (`animation-play-state: paused` on `*`)          |
| `.time-near-limit`                                                                                     | ≥ 80% of the playtime limit used, not yet resting                | Dims the landscape to 86% opacity over 1.2 s; nothing else changes              |
| `.is-ready` / `.is-travelling`                                                                         | on `.journey-invitation`                                         | Full vs. 45% opacity of the invitation row                                      |
| `data-driver` | always | `outside` or `cab`. When `outside`, the conductor stands on the platform (`.platform-driver` fades and settles down from cab height) and the cab figure (`.cab-driver`) fades out; `cab` reverses it. Only ever `outside` at _Stacja Artura_ while parked. |
| `data-phase`, `data-passengers`, `data-landscape`, `data-journeys`, `data-weather`, `data-time-of-day` | always                                                           | Test hooks and CSS hooks; no visual effect on their own                         |

### Theming contract (CSS variables)

`useAtmosphere` writes these onto `.little-world` at up to 24 fps; the whole page reads them. New UI should use them instead of literal colours.

| Variable                                                            | Drives                                               |
| ------------------------------------------------------------------- | ---------------------------------------------------- |
| `--sky-top`, `--sky-bottom`                                         | Page background gradient                             |
| `--ink`                                                             | Heading, journey message, keycap text                |
| `--muted`                                                           | Subtitle, teaser, patient note, footer, header notes |
| `--accent`                                                          | _Artura_ in the title, footer heart                  |
| `--ground`                                                          | Lower ground fill and the page's bottom fade         |
| `--window`                                                          | Lit windows in cottages and the station              |
| `--cloud`, `--cloud-opacity`                                        | Cloud fill and fog-thinning                          |
| `--sun-x/-y/-opacity`, `--moon-x/-y/-opacity`, `--stars-opacity`    | Celestial positions and visibility                   |
| `--rain-opacity`, `--snow-opacity`, `--fog-opacity`, `--night-veil` | Weather layers and the night tint                    |

Day and night text colours switch rather than blend, so contrast stays ≥ 4.5:1 at dusk and dawn.

### Stacking order

`landscape`/`introduction`/`journey-invitation` (z 2) → `site-header` (z 3) → noise overlay `::after` (z 10) → `parent-value-strip` / pill (z 20) → `ParentModal` (z 50) → `RestScreen` (z 60). Keep new chrome below 10 so it stays under the paper grain, and keep anything that must be tappable above it.

### Responsive behaviour

| Breakpoint                           | What changes                                                                                                     |
| ------------------------------------ | ---------------------------------------------------------------------------------------------------------------- |
| ≥ 1800 px                            | Slightly taller landscape band, more bottom spacing                                                              |
| ≤ 820 px tall (desktop)              | Compact header, smaller title and keycap                                                                         |
| ≤ 1000 px                            | Title wraps; landscape widened past the edges (`inset: 32% -3% 160px`) so the train stays centred                |
| 481–1000 px portrait                 | _Artura_ drops to its own line; scenery stretched vertically                                                     |
| ≤ 480 px                             | Scenery stretched further; the "Zawsze bez dźwięku" label is hidden, leaving only its icon                       |
| ≤ 600 px tall (desktop)              | Flourish hidden, everything tightened; ≤ 450 px also hides the patient note                                      |
| Touch                                | Big keycap, "Dotknij", invitation row wraps, footer hidden                                                       |
| Touch ≤ 560 px tall (phone sideways) | Value strip, subtitle, teaser, patient note and footer hidden; title shrinks; `min-height: 0` so nothing scrolls |
| `prefers-reduced-motion`             | All keyframe animations collapse; sky still changes colour                                                       |

Horizontal insets use `env(safe-area-inset-left/right)` on the root and `env(safe-area-inset-bottom)` on the invitation row and footer.

### Motion vocabulary

Every animation is slow and transform- or opacity-only. On load the header, intro, landscape and invitation fade up in a staggered sequence (`appear`, `intro-appear`, `landscape-appear`). While moving: wheels 5 s, pistons 2.5 s, sleepers 1.2 s, foreground meadow 24 s, parallax trees 48 s, clouds 56 s. The journey message re-mounts (`key={...}`) so each new line fades in. Nothing bounces, flashes or plays faster than ~1 s per cycle.

### Adding to the home page safely

1. Put non-interactive decoration inside the SVG scene or `.introduction`, both already `pointer-events: none`.
2. Put any new control behind the parent gate (`ParentModal`), never on the main surface.
3. Colour it with the variables above; test it at `--day-hour` noon and 1 a.m.
4. Check it against `.is-paused` (must stop), `.time-near-limit` (must not add urgency) and reduced motion.
5. Verify the sideways-phone breakpoint still fits without scrolling (`tests/journey.spec.ts` asserts this).

## Run Locally

```sh
npm install
npm run dev
```

Python 3 (standard library only) is used by the npm lifecycle scripts to generate the PWA PNG icons from their source SVGs.

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
- `src/components/illustration/`: modular SVG landscape, locomotive, carriages, parallax meadow, and animal art; only the active and crossfading landscapes are mounted.
- `src/components/ParentModal.tsx` & `src/components/ParentValueStrip.tsx`: parent trust banner and gated settings modal.
- `src/components/RestScreen.tsx`: calm sleeping-moon rest overlay.
- `src/hooks/useAtmosphere.ts`, `src/hooks/useJourneyClock.ts`, `src/hooks/useActivePlaytime.ts`, and `src/hooks/useModalFocus.ts`: DOM-variable atmosphere renderer, visibility-aware journey/playtime clocks, and native-dialog focus management.
- `src/styles/`: split tokens, layout, animations, dialogs, and responsive rules.

## Privacy

No backend, cookies, ads, third-party requests, analytics, or child data stored on the device. Journey state, parent settings, and active-session playtime exist in memory only. When served as an installable PWA, the Service Worker stores only the application shell and static icons in Cache Storage so the app can reopen offline. No audio is created or played. Fonts and artwork are bundled locally.

## Verification

```sh
npm run build
npm run typecheck
npm test
```

Automated Chromium tests verify the state machine and pure reducer replay, settings preservation on reset, randomized roster and stops, single-control input latching, emulated phone touch taps, sideways phone layout, three-second parent hold, dynamic parent challenge, focus restoration, parent-gated rest, active playtime limit, dynamic Journey 1 atmosphere, hidden-tab pause/resume, reduced-motion fallback, bounded crossfading scenery, service-worker offline shell caching, and zero-network offline execution from `dist/index.html`.

## Credits

Original SVG illustrations are in the source. PWA PNG icons are generated automatically before development, tests, and production builds with `python3 tools/generate-icons.py`. DM Sans and Fraunces are bundled under the SIL Open Font License; license texts are in `src/assets/licenses/` and subsets are embedded in `src/fonts.css` (regenerated with `python3 tools/build-fonts.py`).
