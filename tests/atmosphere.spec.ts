import { expect, test, type Page } from "@playwright/test";
import {
  randomInitialConditions,
  sampleAtmosphere,
  journeyRoadProgress,
  ROUND_DURATION,
  weatherAt,
  WEATHER_TYPES,
  wrap,
} from "../src/atmosphere";
import {
  createInitialJourney,
  generateSessionPlan,
  PHASE_DURATION,
  journeyReducer,
  type JourneyState,
} from "../src/game";

const START = { hour: 12, weather: "clear" as const };
const atmosphereCSS = [
  "--day-hour",
  "--sky-top",
  "--sky-bottom",
  "--sun-opacity",
  "--moon-opacity",
  "--stars-opacity",
  "--sun-x",
  "--sun-y",
  "--moon-x",
  "--moon-y",
  "--rain-opacity",
  "--snow-opacity",
  "--fog-opacity",
  "--night-veil",
];

function advanceState(state: JourneyState): JourneyState {
  return journeyReducer(
    state,
    state.phase === "unboarding"
      ? { type: "ADVANCE", nextPlan: generateSessionPlan(() => 0.2) }
      : { type: "ADVANCE" },
  );
}

async function snapshot(page: Page) {
  return page.locator("main").evaluate((element, properties) => {
    const style = getComputedStyle(element);
    return Object.fromEntries(
      properties.map((property) => [
        property,
        style.getPropertyValue(property),
      ]),
    );
  }, atmosphereCSS);
}

async function collectFriend(page: Page, passengers: number) {
  for (const phase of [
    "departing",
    "travelling",
    "arriving",
    "boarding",
  ] as const) {
    await expect(page.locator("main")).toHaveAttribute("data-phase", phase);
    await page.clock.runFor(PHASE_DURATION[phase] + 10);
  }
  await expect(page.locator("main")).toHaveAttribute(
    "data-passengers",
    String(passengers),
  );
  await expect(page.locator("main")).toHaveAttribute("data-phase", "waiting");
}

async function start(page: Page) {
  await page.addInitScript(() => {
    Math.random = () => 0.5;
  });
  await page.clock.install();
  await page.goto("/");
  await expect(page.locator("main")).toHaveAttribute(
    "data-atmosphere-mode",
    "dynamic",
  );
  await expect(page.locator("main")).toHaveAttribute(
    "data-initial-weather",
    "snow",
  );
  await expect(page.locator("main")).toHaveAttribute(
    "data-initial-hour",
    "12.0000",
  );
}

test("startup can choose every weather and every time of day", () => {
  const choices = [0, 0.25, 0.5, 0.75, 0.999999].map((value) =>
    randomInitialConditions(() => value),
  );
  expect(choices.map((choice) => choice.weather)).toEqual([
    "clear",
    "rain",
    "snow",
    "fog",
    "fog",
  ]);
  expect(choices[0].hour).toBe(0);
  expect(choices[4].hour).toBeLessThan(24);
});

test("road progress agrees at every station and never jumps at a phase boundary", () => {
  let state: JourneyState = createInitialJourney(
    generateSessionPlan(() => 0.5),
  );
  expect(ROUND_DURATION).toBe(47800);
  for (let round = 0; round < 3; round++) {
    for (let press = 0; press < 4; press++) {
      state = journeyReducer(state, { type: "ENTER" });
      for (let step = 0; step < (press === 3 ? 6 : 4); step++) {
        const boundary = journeyRoadProgress(state, 1);
        state = advanceState(state);
        if (state.phase !== "waiting") {
          expect(journeyRoadProgress(state, 0)).toBeCloseTo(boundary, 10);
        } else {
          expect(boundary).toBeCloseTo(
            state.passengersCount === 0
              ? 1
              : (state.passengersCount * 8000) / ROUND_DURATION,
            10,
          );
        }
      }
    }
    expect(journeyRoadProgress(state, 0)).toBe(0);
    expect(state.journeys).toBe(round + 1);
  }
});

test("dynamic atmosphere progresses continuously right from Journey 1", () => {
  const beginning = sampleAtmosphere(START, 0, 0);
  const midWay = sampleAtmosphere(START, 0, 0.5);
  expect(midWay.hour).not.toBe(beginning.hour);
  expect(midWay.mode).toBe("dynamic");

  const allWeather = new Set<string>();
  const timeOfDay = new Set<string>();
  for (let round = 0; round <= 3; round++) {
    for (const progress of [0, 0.25, 0.5, 0.75, 1]) {
      const sample = sampleAtmosphere(START, round, progress);
      allWeather.add(sample.weather);
      timeOfDay.add(sample.timeOfDay);
      expect(
        Object.values(sample.weights).reduce((a, b) => a + b, 0),
      ).toBeCloseTo(1, 10);
      expect(sample.sun.opacity + sample.moon.opacity).toBeCloseTo(1, 10);
      expect(sample.sun.x).toBeGreaterThanOrEqual(180);
      expect(sample.sun.x).toBeLessThanOrEqual(1420);
    }
  }
  expect(allWeather).toEqual(new Set(WEATHER_TYPES));
  expect(timeOfDay).toEqual(new Set(["dawn", "day", "dusk", "night"]));
});

test("sky, weather and celestial positions meet seamlessly at every round boundary and midnight", () => {
  for (const hour of [0, 6, 12, 18, 23.9]) {
    for (const weather of WEATHER_TYPES) {
      const initial = { hour, weather };
      for (const round of [0, 1, 2, 3, 4, 9]) {
        expect(sampleAtmosphere(initial, round, 1)).toEqual(
          sampleAtmosphere(initial, round + 1, 0),
        );
      }
      const midnight = sampleAtmosphere({ hour: 0, weather }, 0, 0);
      const nextDay = sampleAtmosphere({ hour: 24, weather }, 0, 0);
      expect(midnight.skyTop).toBe(nextDay.skyTop);
      expect(midnight.skyBottom).toBe(nextDay.skyBottom);
      expect(midnight.sun).toEqual(nextDay.sun);
      expect(midnight.moon).toEqual(nextDay.moon);
    }
  }
  expect(wrap(-1, 24)).toBe(23);
  expect(weatherAt("clear", 0)).toEqual({ clear: 1, rain: 0, snow: 0, fog: 0 });
  expect(weatherAt("clear", 1)).toEqual({ clear: 1, rain: 0, snow: 0, fog: 0 });
});

test("atmosphere evolves dynamically during browser travel on Journey 1", async ({
  page,
}) => {
  await start(page);
  const initial = await snapshot(page);

  // Train starts moving
  await page.keyboard.press("Enter");
  await page.clock.runFor(1500);
  const movingSnap = await snapshot(page);
  expect(movingSnap["--day-hour"]).not.toBe(initial["--day-hour"]);
  expect(Number(movingSnap["--day-hour"])).toBeGreaterThan(12);

  await collectFriend(page, 1);
  const stationSnap = await snapshot(page);

  // Waiting at station pauses time progression until user acts
  await page.clock.runFor(10000);
  const stillStationSnap = await snapshot(page);
  expect(stillStationSnap["--day-hour"]).toBe(stationSnap["--day-hour"]);
});

test("hide and resume preserves the exact weather/time point, including particles", async ({
  page,
}) => {
  await start(page);
  await page.keyboard.press("Enter");
  await page.clock.runFor(1400);
  await page.evaluate(() => {
    Object.defineProperty(document, "hidden", {
      configurable: true,
      get: () => true,
    });
    document.dispatchEvent(new Event("visibilitychange"));
  });
  await expect(page.locator("main")).toHaveClass(/is-paused/);
  const paused = await snapshot(page);
  await page.clock.runFor(15000);
  expect(await snapshot(page)).toEqual(paused);
  await expect(page.locator(".rain-drop").first()).toHaveCSS(
    "animation-play-state",
    "paused",
  );
  await page.evaluate(() => {
    Object.defineProperty(document, "hidden", {
      configurable: true,
      get: () => false,
    });
    document.dispatchEvent(new Event("visibilitychange"));
  });
  await page.clock.runFor(400);
  expect((await snapshot(page))["--day-hour"]).not.toBe(paused["--day-hour"]);
  await expect(page.locator(".rain-drop").first()).toHaveCSS(
    "animation-play-state",
    "running",
  );
});

test("reduced motion still shows a gradual sky, without fast particles", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await start(page);
  await page.keyboard.press("Enter");
  await page.clock.runFor(2000);
  const first = await snapshot(page);
  await page.clock.runFor(2000);
  expect((await snapshot(page))["--day-hour"]).not.toBe(first["--day-hour"]);
  await expect(page.locator(".rain-drop").first()).toHaveCSS(
    "animation-name",
    "none",
  );
  await expect(page.locator(".snow-flake").first()).toHaveCSS(
    "animation-name",
    "none",
  );
  await expect(page.locator(".enter-key")).toBeEnabled();
});
