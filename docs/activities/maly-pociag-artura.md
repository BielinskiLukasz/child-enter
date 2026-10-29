# Ma&#322;y Poci&#261;g Artura

## Purpose

A quiet cause-and-effect activity for three-year-old Artur. A predictable journey encourages watching, waiting and discovering animal friends without reading, timing, scoring or failure. Intended for supervised use.

## Flow

The weather and time of day are randomized once when the page opens. For the first full round (all pickups, scenic trip and return) they stay fixed. The second round gradually changes them; from the third round onward the train travels through a complete 24-hour sky cycle and every weather condition in each round. There is no extra input to change the weather: it is part of the journey.

1. The empty train waits at Artur's station with a friendly bear conductor.
2. Enter starts a slow trip to the forest station. A rabbit boards the first carriage and waves.
3. The train waits indefinitely. Enter takes it to the village station, where a fox boards.
4. Another Enter takes it to the mountain station, where a bear boards the third carriage.
5. With everyone aboard, the train waits for Enter before beginning the scenic tour.
6. The full train passes through forest, village and mountain landscapes automatically, then returns to the starting station.
7. Friends wave goodbye and leave the carriages. The train waits for another round. There is no end screen or limit on rounds.

## Controls And Rules

- The Enter key, the numeric-keypad Enter key and the on-screen Enter button are equivalent, and are the only controls.
- Each press or tap starts at most one trip. Holding the key, keyboard auto-repeat, repeated taps, a long press and input during travel or boarding never queue actions.
- Mouse clicks and touches anywhere else, including the picture, the title and the text, do nothing. Other keys do nothing.
- Every waiting state lasts until the child is ready. There are no deadlines, counters, rewards, failure states or sounds.
- No keyboard is needed: a phone or tablet is operated with the on-screen button alone.

## Touch Devices

The on-screen key is a real button, at least 74 px tall and up to 280 px wide on touch devices, centred at the bottom of the screen within easy thumb reach. On touch devices the instruction reads "Dotknij" instead of "Naciśnij". Double-tap zoom, pinch zoom, the tap highlight, text selection and the long-press context menu are suppressed so a child cannot leave the activity or resize it by accident. Pressing shows a short pressed state. Short landscape screens use a compact layout: the heading shrinks, the subtitle, patient note and footer are hidden, and the picture is narrowed so no text overlaps it and nothing scrolls.

## Weather And Day/Night Cycle

- **Startup:** independently random time (0–24 hours) and clear sky, rain, snow or fog. The choice lasts in memory only; a reload begins a new session.
- **First full round:** the starting sky, weather and celestial positions remain exactly fixed, including the homeward leg and farewell. Precipitation and cloud drift are ambient animation within the same unchanged conditions.
- **Second full round:** a smooth half-day change and one transition to the next weather. The effect is driven by actual road progress, so waits never advance it.
- **Third and later rounds:** an uninterrupted loop through the full day and back to day, and all four weather conditions. Stars and moon fade in during night; the sun follows an arc through the day. A full round covers 24 hours of the toy sky in 47.8 seconds of active travel time, not wall-clock time.
- **Seamless reset:** after returning home the sky keeps its current conditions rather than snapping to the startup weather. The second-to-third-round boundary has the same geometry and weather; the day palette is periodic at midnight.

## Configuration

There are no child-facing settings. Stops, passenger order and state durations live in `src/game.ts`. The default trip uses three distinct passengers and three carriages. Travel has departure (2 s), landscape transition (2.2 s), arrival (1.8 s) and boarding (2 s) phases. Each scenic landscape lasts 5.6 s. Arrival home takes 2.6 s and goodbye takes 2.4 s.

## Safety And Privacy

- Use with an adult nearby. No keyboard shortcut can substitute for supervision.
- No flashing, rapid camera motion, loud feedback or time pressure.
- Animation honors the operating system's reduced-motion preference.
- Hidden tabs pause both the story timer and looping animations, preserving remaining phase time.
- No network services, analytics module, audio, personal data or persistent storage are used. Fonts and original artwork are local; the built HTML works offline.
- Browser and operating-system shortcuts remain outside the application's control.

## Technical Details

A separate, pure atmosphere module samples light and weather from the completed-journey count and the shared road-progress clock. Round 1 is fixed, round 2 eases in, and later rounds use a periodic weather ring and a wrapped 24-hour time. The sun and moon follow independent slow arcs with crossfaded visibility, while weather intensity blends one state into the next. No timers, random decisions or HTTP requests run in the weather renderer; it paints inherited CSS variables at a maximum of 24 fps. React does not reconcile the scene on every frame.

React renders a single full-bleed SVG storybook scene. `journeyReducer` defines the finite-state sequence and rejects Enter outside a waiting state, so taps and key presses during a trip are discarded rather than queued. A keyboard-held latch and `KeyboardEvent.repeat` suppress auto-repeat. The button dispatches the same action as the key; clicks that a browser synthesises for a focused button from a keyboard carry `detail === 0` and are ignored there, so a key press is never counted twice. A finger or stylus release blurs the button so no focus ring is left behind. A visibility-aware timer retains remaining time when the document is hidden. Both atmosphere and particle animations pause with it. Rain and snow have a bounded set of composited SVG particles; fog is a handful of gradient layers, with no expensive blur or canvas. Reduced motion freezes particle motion while retaining gradual light changes, and a non-live SVG description tracks the current weather/time for assistive technology. CSS handles parallax, wheels, steam, waves, gentle boarding and scene crossfades. All timing and round state stay in memory.

The production build uses the existing Vite single-file plugin. `dist/index.html` embeds JavaScript, CSS, SVG and fonts; opening the file needs no server or external requests.

## Manual Test Scenarios

1. Open the activity. Check that the train is empty and does not leave by itself.
2. Press Enter once. Check departure, the forest landscape, arrival and the rabbit boarding; then wait to confirm the train remains stopped.
3. Press Enter for each next trip. Check that a fox and bear join distinct carriages at their own stations.
4. Press Enter with all carriages occupied. Check the forest, village, mountains, return home, farewell and empty reset. Start another round.
5. Hold Enter through a full trip. Confirm it does not start another trip at the next station until released and pressed again.
6. Repeatedly press Enter during travel and boarding. Confirm no extra trip is queued and no animal is skipped.
7. Click or tap the train, landscape, heading and text; press Space, arrows, letters and Escape. Confirm none advances the story.
   7a. On a phone, run a whole round using only the on-screen button. Check that the button is easy to hit with a thumb, that the instruction reads "Dotknij", that quick repeated taps and a long press start only one trip, and that double-tapping it does not zoom the page.
   7b. Turn the phone to landscape. Check that the picture, message and button all fit without scrolling and that no text covers the train.
8. Hide the tab halfway through departure for at least 20 s. Return and check that it resumes with the remaining phase time.
9. Enable reduced motion. Confirm all passengers and landscapes still appear without continuous movement.
10. Check portrait mobile, tablet and desktop widths. Confirm all three carriages and the keyboard instruction remain visible.
11. Disconnect from the network and open `dist/index.html` directly. Repeat a complete round and check for no remote requests.
12. Watch a whole round in clear sky, rain, snow and fog. Check that the starting conditions remain completely fixed in round one, then begin to change in round two.
13. In round three, observe every weather, dawn, daytime, sunset and night, then return to day. Watch a later round and confirm the conditions continue smoothly without a reset at home.
14. Wait at a station or hide the tab mid-transition. Check that the weather, celestial positions and particles remain still and resume at the same point, without skipping ahead.
15. Enable reduced motion. Check that the atmosphere is still understandable without moving particles, flickering stars or sudden jumps.
16. Repeat on Chrome desktop, Chrome Android and Safari on iPhone/iPad, each by touch and, where available, with a keyboard. Physical Android and Safari checks are not covered by the Chromium automation.
