# Ma&#322;y Poci&#261;g Artura

## Purpose

A quiet cause-and-effect activity for three-year-old Artur. A predictable journey encourages watching, waiting and discovering animal friends without reading, timing, scoring or failure. Intended for supervised use.

## Flow

1. The empty train waits at Artur's station with a friendly bear conductor.
2. Enter starts a slow trip to the forest station. A rabbit boards the first carriage and waves.
3. The train waits indefinitely. Enter takes it to the village station, where a fox boards.
4. Another Enter takes it to the mountain station, where a bear boards the third carriage.
5. With everyone aboard, the train waits for Enter before beginning the scenic tour.
6. The full train passes through forest, village and mountain landscapes automatically, then returns to the starting station.
7. Friends wave goodbye and leave the carriages. The train waits for another round. There is no end screen or limit on rounds.

## Controls And Rules

- Enter and numeric-keypad Enter are equivalent and are the only controls.
- Each key press starts at most one trip. Holding the key, keyboard auto-repeat and extra key presses during travel or boarding do not queue actions.
- Mouse clicks, touch, stylus, other keys and the illustrated Enter keycap do not advance the game. The keycap is a visual instruction, not a button.
- Every waiting state lasts until the child is ready. There are no deadlines, counters, rewards, failure states or sounds.
- An external keyboard is required on tablets and phones.

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

React renders a single full-bleed SVG storybook scene. `journeyReducer` defines the finite-state sequence and rejects Enter outside a waiting state. A keyboard-held latch and `KeyboardEvent.repeat` suppress auto-repeat. A visibility-aware timer retains remaining time when the document is hidden. CSS handles parallax, wheels, steam, waves, gentle boarding and scene crossfades. All timing and round state stay in memory.

The production build uses the existing Vite single-file plugin. `dist/index.html` embeds JavaScript, CSS, SVG and fonts; opening the file needs no server or external requests.

## Manual Test Scenarios

1. Open the activity. Check that the train is empty and does not leave by itself.
2. Press Enter once. Check departure, the forest landscape, arrival and the rabbit boarding; then wait to confirm the train remains stopped.
3. Press Enter for each next trip. Check that a fox and bear join distinct carriages at their own stations.
4. Press Enter with all carriages occupied. Check the forest, village, mountains, return home, farewell and empty reset. Start another round.
5. Hold Enter through a full trip. Confirm it does not start another trip at the next station until released and pressed again.
6. Repeatedly press Enter during travel and boarding. Confirm no extra trip is queued and no animal is skipped.
7. Click or tap the train, landscape and Enter keycap; press Space, arrows, letters and Escape. Confirm none advances the story.
8. Hide the tab halfway through departure for at least 20 s. Return and check that it resumes with the remaining phase time.
9. Enable reduced motion. Confirm all passengers and landscapes still appear without continuous movement.
10. Check portrait mobile, tablet and desktop widths. Confirm all three carriages and the keyboard instruction remain visible.
11. Disconnect from the network and open `dist/index.html` directly. Repeat a complete round and check for no remote requests.
12. Repeat on Chrome desktop, Chrome Android with an external keyboard and Safari on iPhone/iPad with an external keyboard. Physical Android and Safari checks are not covered by the Chromium automation.
