# Ma&#322;y Poci&#261;g Artura

## Purpose

A quiet cause-and-effect activity for three-year-old Artur. A predictable journey encourages watching, waiting and discovering animal friends without reading, timing, scoring or failure. Intended for supervised use.

## Flow

The weather and time of day are randomized upon session start and begin evolving dynamically along the route right from the first journey.

1. The train waits at the starting station with a randomly selected conductor (e.g. Miś, Sówka, Lisek, Króliczek, Jeżyk, Kotek, Piesek, Wiewiórka, Żabka, Borsuk, Jelonek).
2. Enter (or touch) starts a slow trip to the first destination station. The first passenger boards and waves.
3. The train waits indefinitely at each stop. Enter advances to the next stations, picking up unique passengers.
4. With all passengers aboard, the scenic tour passes through three randomized picturesque landscapes (e.g. Leśna Polana, Słoneczna Wieś, Górska Dolina, Nadbrzeże Rzeki, Brzozowy Gaj, Śnieżna Polana, Szepcząca Łąka) under smooth sky and weather changes.
5. The train returns to the home station, friends wave goodbye, and a fresh journey is prepared.
6. After $N$ complete rounds (or via parent controls), a gentle "Pora na odpoczynek" screen offers a calm transition to rest.

## Controls And Rules

- The Enter key, numeric-keypad Enter, and the large on-screen Enter button are equivalent single controls.
- Each press or tap starts at most one leg. Holding keys, keyboard repeat, or drumming on the button never queues actions.
- Touches anywhere else (the scenery, the sky, the title) do not advance the train.
- Every waiting state lasts until the child is ready.
- **Parent Escape Hatch:** Long-pressing the brand logo for 3 seconds, pressing `Escape`, or clicking the gear icon opens the Parent Gate with session reset, atmosphere overrides, and playtime management.

## Atmosphere & Weather

- **Dynamic from Launch:** Clear sky, rain, snow, and fog smoothly transition along with the day/night cycle (sun, sunset, moon, stars, dawn).
- **Smooth Road Integration:** Weather and time progress according to active travel distance, pausing at stations and when the tab is hidden.
- **Parent Overrides:** Optional forced states (e.g. Always Night, Always Snow, Always Day) available in Parent Settings.

## Technical Details

React renders full-bleed SVG scenes with DOM-level CSS variable animations for performance. The singlefile build inlines all styles, fonts, and SVGs into one portable, offline-ready HTML package.

## Verification

Run automated tests:

```sh
npm run build
npx tsc --noEmit
npx playwright test
```
