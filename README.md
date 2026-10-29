# Spokojny &#346;wiat Artura

A calm, silent Polish-language train activity for three-year-old Artur. **Intended for supervised use by a young child.** This standalone activity uses only the Enter key, with no other interaction.

## Activities

Full activity documentation is in [docs/activities/](docs/activities/README.md).

1. [**Ma&#322;y Poci&#261;g Artura**](docs/activities/maly-pociag-artura.md) - Take a slow train ride, pick up animal friends at the stations, and travel together through the forest, village and mountains.

The activity is silent and calm, with no scores or failure. The train waits at every station until Enter is pressed. Holding the key does not queue journeys. The story pauses when the browser tab is hidden, and reduced-motion preferences are respected.

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

- `src/App.tsx`: keyboard handling, visibility-aware timing and page composition.
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

Automated Chromium tests cover the full trip and replay, key repeat, ignored input, hidden-tab timing, responsive train visibility and offline single-file use. Manual tests on Chrome Android and Safari iPhone/iPad still need to be performed on physical devices; an external keyboard is necessary on touch-only devices.

## Credits

Original SVG illustrations are in the source. DM Sans and Fraunces are bundled locally under the SIL Open Font License; license texts are in [src/assets/licenses/](src/assets/licenses/).
