# Mały pociąg Artura

A calm, silent Polish-language train activity for three-year-old Artur. **Intended for supervised use by a young child.** This standalone activity uses only the Enter key or the large on-screen button, with no other interaction.

**Try it live: [Mały pociąg Artura](https://bielinskilukasz.github.io/child-enter/)**

## The Activity

Full documentation is in [docs/activities/maly-pociag-artura.md](docs/activities/maly-pociag-artura.md).

Take a slow train ride with a randomized animal conductor and passenger friends, travelling together through varied landscapes, dynamic weather, and day/night cycles.

The activity is silent and calm, with no scores or failure. The train waits at every station until the Enter key is pressed or the big on-screen Enter button is touched, so it works on a computer and on a phone or tablet without a keyboard. Holding the key or drumming on the button does not queue journeys. The story pauses when the browser tab is hidden, and reduced-motion preferences are respected.

## Dynamic Environment & Randomization

- **Dynamic First Journey:** Time of day and weather evolve smoothly right from launch as the train travels along its route, rather than being gated behind static rounds.
- **Expanded & Randomized Animals:** 11 friendly animals (Króliczek, Lisek, Miś, Jeżyk, Sówka, Wiewiórka, Kotek, Piesek, Żabka, Borsuk, Jelonek). At session start, one animal is randomly chosen as the Locomotive Conductor (wearing a little cap), and 3 distinct passenger animals are assigned to upcoming stations.
- **Expanded Landscapes:** 8 distinct scenic environments (Stacja Artura, Leśna Polana, Słoneczna Wieś, Górska Dolina, Nadbrzeże Rzeki, Brzozowy Gaj, Śnieżna Polana, Szepcząca Łąka) shuffled dynamically per session.
- **Weather & Day/Night Cycle:** Seamless loop through clear sky, gentle rain, quiet snowfall, and soft fog, alongside sun, moon, stars, sunset, dawn, and illuminated cabin windows.

## Parent Controls & Safety

- **Parent Value Strip:** A subtle top banner highlighting safety credentials (`Bez dźwięku · Bez reklam · Bez internetu · Jedna interakcja · Nic nie wychodzi z urządzenia`).
- **Parent Escape Hatch & Gate:** Long-pressing the brand logo for 3 seconds, clicking the gear icon, or pressing `Escape` opens a secure Parent Gate with options to reset the journey, trigger a gentle rest screen, or set atmosphere overrides (e.g. "Zawsze noc", "Zawsze śnieg").
- **Soft Session Closure:** Peaceful "Pora na odpoczynek" screen after a set number of rounds to support healthy screen-time closure.

## Phones And Tablets & PWA

The Enter keycap on the page is a real button, sized for a small finger (at least 74 px tall on touch devices) and placed at the bottom of the screen with `env(safe-area-inset-*)` support. On touch devices the wording changes from "Naciśnij" to "Dotknij". It is an installable PWA with an offline Service Worker and web manifest.

## Run Locally

```sh
npm install
npm run dev
```

## Standalone HTML

```sh
npm run build
```

The generated `dist/index.html` contains the complete application, illustrations, and embedded fonts in one self-contained file.

## Implementation

- `src/App.tsx`: keyboard/touch control, parent gate, rest screen, and page composition.
- `src/game.ts`: state machine, session randomizer, animal definitions, and Polish messages.
- `src/atmosphere.ts`: dynamic weather/time progression and smooth, seam-free interpolation.
- `src/components/Atmosphere.tsx`: celestial elements (sun, moon, stars) and weather particle layers.
- `src/components/Illustration.tsx`: SVG landscapes (8 locations), train, and 11 animal drawings.
- `src/components/ParentModal.tsx` & `src/components/ParentValueStrip.tsx`: parent trust strip and settings gate.
- `src/components/RestScreen.tsx`: calm sleeping-moon rest screen.
- `src/hooks/useAtmosphere.ts`: low-frequency, DOM-only atmosphere rendering.
- `src/hooks/useJourneyClock.ts`: shared visibility-aware clock.

## Privacy

No backend, cookies, ads, third-party runtime requests, tracking, or persistent storage. Journey state exists only in memory. No audio is created or played. Fonts and illustrations are included locally.

## Verification

```sh
npm run build
npx tsc --noEmit
npx playwright test
```

Automated Chromium tests cover the full trip and replay, key repeat, ignored input, touch taps, repeated taps, short landscape layout, hidden-tab timing, responsive train visibility, parent modal gate, dynamic Journey 1 atmosphere, and offline single-file use.

## Credits

Original SVG illustrations are in the source. DM Sans and Fraunces are bundled under the SIL Open Font License; license texts are in [src/assets/licenses/](src/assets/licenses/).
