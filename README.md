# Spokojny &#346;wiat Artura

A calm, silent Polish-language train activity for three-year-old Artur. **Intended for supervised use by a young child.** This standalone activity uses only the Enter key, with no other interaction.

## Activities

Full activity documentation is in [docs/activities/](docs/activities/README.md).

1. [**Ma&#322;y Poci&#261;g Artura**](docs/activities/maly-pociag-artura.md) - Take a slow train ride, pick up animal friends at the stations, and travel together through the forest, village and mountains.

The activity is silent and calm, with no scores or failure. The train waits at every station until the Enter key is pressed or the big on-screen Enter button is touched, so it works on a computer and on a phone or tablet without a keyboard. Holding the key or drumming on the button does not queue journeys. The story pauses when the browser tab is hidden, and reduced-motion preferences are respected.

## Weather And Day/Night Cycle

The starting weather and time are independently randomized once per session, entirely in memory. A **full journey** means collecting all three friends, taking the scenic trip, and returning home; waiting at a station does not advance the sky or the weather.

| Completed full journeys              | Weather and light                                                                                                                                                    |
| ------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **0 — first journey**                | Exactly the starting conditions, from the opening screen through the return home. Existing cloud and precipitation animations keep moving within that fixed weather. |
| **1 — second journey**               | Gradually blends into the next weather and moves halfway through a 24-hour cycle.                                                                                    |
| **2 or more — third journey onward** | A continuous weather loop and one full day/night cycle per round, with sun, sunset, moon, stars, dawn, and a return to day.                                          |

Weather blends smoothly through **clear sky → rain → snow → fog → clear sky** (starting at the random weather). The same phase clock drives the train and atmosphere, so station waits and hidden tabs pause both, with no jump or queued catch-up. The sky palette, landscape shade, small window lights, cloud tint and interface colours change together. No network weather service, audio, new child controls or saved data are used.

Rendering uses a capped 24 fps, DOM-only atmosphere update rather than re-rendering the SVG scene in React; the particles use bounded, transform-only CSS animations. Reduced motion disables fast-moving particles and leaves slow, gentle sky changes. The original keyboard and on-screen Enter controls are unchanged.

## Phones And Tablets

The Enter keycap on the page is a real button, sized for a small finger (at least 74 px tall on touch devices) and placed at the bottom of the screen. On touch devices the wording changes from "Naci&#347;nij" to "Dotknij", double-tap zoom and the long-press menu are suppressed, and short landscape screens get a compact layout so nothing needs scrolling. Touching the picture, the title or anywhere else still does nothing: the button is the single control.

## Run Locally

```sh
npm install
npm run dev
```

## Standalone HTML

```sh
npm run build
```

The generated `dist/index.html` contains the application, illustration and fonts in one file. It can be opened locally without a server, shared as a single HTML file, or hosted on any static web server. No requests are needed after opening it.

## Implementation

- `src/App.tsx`: keyboard/touch control and page composition.
- `src/hooks/useJourneyClock.ts`: the shared visibility-aware train clock.
- `src/atmosphere.ts`: deterministic weather/time progression and smooth, seam-free interpolation.
- `src/hooks/useAtmosphere.ts`: low-frequency, DOM-only atmosphere rendering (no per-frame React tree updates).
- `src/components/Atmosphere.tsx`: fixed-size rain, snow, fog, sun, moon and star layers.
- `src/atmosphere.css`: reduced-motion-aware particle and lighting styles.
- `src/game.ts`: the finite-state journey, stops and Polish status messages.
- `src/components/Illustration.tsx`: original SVG landscape, train and animals.
- `src/index.css`: local fonts, responsive composition and gentle animations.

## Privacy

No backend, cookies, ads, third-party runtime requests, tracking or persistent storage. Journey state exists only in memory. No audio is created or played. Fonts and illustrations are included locally.

## Verification

```sh
npm run build
npx tsc --noEmit
npx playwright test
```

Automated Chromium tests cover the full trip and replay, key repeat, ignored input, touch taps with an emulated phone, repeated taps, short landscape layout, hidden-tab timing, responsive train visibility and offline single-file use. Additional atmosphere tests check all four initial weather choices, the fixed first round, gradual second round, full third-round weather and day/night cycle, seamless midnight and round boundaries, hidden-tab weather/time freezing, and reduced-motion fallback. Manual tests on Chrome Android and Safari iPhone/iPad still need to be performed on physical devices.

## Credits

Original SVG illustrations are in the source. DM Sans and Fraunces are bundled under the SIL Open Font License; license texts are in [src/assets/licenses/](src/assets/licenses/) and the subsets are embedded in `src/fonts.css`, regenerated with `python3 tools/build-fonts.py`.
