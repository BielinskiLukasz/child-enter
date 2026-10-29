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
  initialJourney,
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

async function completeRound(page: Page) {
  for (let passenger = 1; passenger <= 3; passenger++) {
    await page.keyboard.press("Enter");
    await collectFriend(page, passenger);
  }
  await page.keyboard.press("Enter");
  await expect(page.locator("main")).toHaveAttribute("data-phase", "departing");
  await page.clock.runFor(PHASE_DURATION.departing + 10);
  for (let scene = 0; scene < 3; scene++) {
    await expect(page.locator("main")).toHaveAttribute("data-phase", "touring");
    await page.clock.runFor(PHASE_DURATION.touring + 10);
  }
  await expect(page.locator("main")).toHaveAttribute("data-phase", "returning");
  await page.clock.runFor(PHASE_DURATION.returning + 10);
  await expect(page.locator("main")).toHaveAttribute(
    "data-phase",
    "unboarding",
  );
  await page.clock.runFor(PHASE_DURATION.unboarding + 10);
  await expect(page.locator("main")).toHaveAttribute("data-phase", "waiting");
}

async function start(page: Page) {
  // Deterministic startup: noon, snow. All initial conditions are still local,
  // and there is no test-only route or extra UI input in the app.
  await page.addInitScript(() => {
    Math.random = () => 0.5;
  });
  await page.clock.install();
  await page.goto("/");
  await expect(page.locator("main")).toHaveAttribute(
    "data-atmosphere-mode",
    "still",
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
  let state: JourneyState = initialJourney;
  expect(ROUND_DURATION).toBe(47800);
  for (let round = 0; round < 3; round++) {
    for (let press = 0; press < 4; press++) {
      state = journeyReducer(state, { type: "ENTER" });
      for (let step = 0; step < (press === 3 ? 6 : 4); step++) {
        const boundary = journeyRoadProgress(state, 1);
        state = journeyReducer(state, { type: "ADVANCE" });
        if (state.phase !== "waiting") {
          expect(journeyRoadProgress(state, 0)).toBeCloseTo(boundary, 10);
        } else {
          expect(boundary).toBeCloseTo(
            state.passengers === 0
              ? 1
              : (state.passengers * 8000) / ROUND_DURATION,
            10,
          );
        }
      }
    }
    expect(journeyRoadProgress(state, 0)).toBe(0);
    expect(state.journeys).toBe(round + 1);
    expect(journeyRoadProgress(state, 0)).toBe(0);
  }
});

test("first round is fixed, the second eases in, and the third has a full continuous cycle", () => {
  const beginning = sampleAtmosphere(START, 0, 0);
  for (const progress of [0, 0.1, 0.4, 0.8, 1]) {
    expect(sampleAtmosphere(START, 0, progress)).toEqual(beginning);
  }
  const second = sampleAtmosphere(START, 1, 0.75);
  expect(second.hour).not.toBe(beginning.hour);
  expect(second.weather).not.toBe(beginning.weather);
  expect(second.sun.opacity).toBeLessThan(beginning.sun.opacity);
  expect(second.moon.opacity).toBeGreaterThan(beginning.moon.opacity);
  expect(second.mode).toBe("intro");

  const allWeather = new Set<string>();
  const timeOfDay = new Set<string>();
  for (let round = 2; round <= 6; round++) {
    for (const progress of [
      0, 0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 0.875, 1,
    ]) {
      const sample = sampleAtmosphere(START, round, progress);
      allWeather.add(sample.weather);
      timeOfDay.add(sample.timeOfDay);
      expect(
        Object.values(sample.weights).reduce((a, b) => a + b, 0),
      ).toBeCloseTo(1, 10);
      expect(sample.sun.opacity + sample.moon.opacity).toBeCloseTo(1, 10);
      expect(sample.sun.x).toBeGreaterThanOrEqual(180);
      expect(sample.sun.x).toBeLessThanOrEqual(1420);
      expect(sample.rain).toBeGreaterThanOrEqual(0);
      expect(sample.snow).toBeGreaterThanOrEqual(0);
      expect(sample.fog).toBeGreaterThanOrEqual(0);
    }
  }
  expect(allWeather).toEqual(new Set(WEATHER_TYPES));
  expect(timeOfDay).toEqual(new Set(["dawn", "day", "dusk", "night"]));
  const dynamic = sampleAtmosphere(START, 2, 0);
  expect(dynamic.mode).toBe("dynamic");
  expect(dynamic.sun.opacity + dynamic.moon.opacity).toBe(1);
});

test("sky, weather and celestial positions meet seamlessly at every round boundary and midnight", () => {
  for (const hour of [0, 6, 12, 18, 23.9]) {
    for (const weather of WEATHER_TYPES) {
      const initial = { hour, weather };
      for (const round of [1, 2, 3, 4, 9, 100]) {
        // Only the mode label changes at the intro/dynamic boundary, not the scene.
        expect({
          ...sampleAtmosphere(initial, round, 1),
          mode: undefined,
        }).toEqual({
          ...sampleAtmosphere(initial, round + 1, 0),
          mode: undefined,
        });
      }
      expect({ ...sampleAtmosphere(initial, 0, 1), mode: undefined }).toEqual({
        ...sampleAtmosphere(initial, 1, 0),
        mode: undefined,
      });
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

test("the first full browser journey keeps its sky and all weather constant", async ({
  page,
}) => {
  await start(page);
  const initial = await snapshot(page);
  await page.clock.runFor(30000);
  expect(await snapshot(page)).toEqual(initial);
  for (let friend = 1; friend <= 3; friend++) {
    await page.keyboard.press("Enter");
    await collectFriend(page, friend);
    expect(await snapshot(page)).toEqual(initial);
  }
  await page.keyboard.press("Enter");
  for (const phase of [
    "departing",
    "touring",
    "touring",
    "touring",
    "returning",
    "unboarding",
  ] as const) {
    await expect(page.locator("main")).toHaveAttribute("data-phase", phase);
    await page.clock.runFor(PHASE_DURATION[phase] + 10);
    expect(await snapshot(page)).toEqual(initial);
  }
  await expect(page.locator("main")).toHaveAttribute("data-journeys", "1");
  await expect(page.locator("main")).toHaveAttribute(
    "data-atmosphere-mode",
    "intro",
  );
  expect(await snapshot(page)).toEqual(initial);
});

test("the second round gradually changes; subsequent rounds continuously cycle through all conditions", async ({
  page,
}) => {
  test.setTimeout(90000);
  await start(page);
  await completeRound(page);
  const beginning = await snapshot(page);
  await page.keyboard.press("Enter");
  await page.clock.runFor(2000);
  const afterDeparture = await snapshot(page);
  expect(afterDeparture["--day-hour"]).not.toBe(beginning["--day-hour"]);
  expect(Number(afterDeparture["--day-hour"])).toBeGreaterThan(12);
  expect(Number(afterDeparture["--day-hour"])).toBeLessThan(12.75);
  // Minute colour/opacity changes must still be smooth, not a sudden jump.
  expect(Number(afterDeparture["--fog-opacity"])).toBeGreaterThanOrEqual(
    Number(beginning["--fog-opacity"]),
  );
  await page.clock.runFor(2000);
  expect((await snapshot(page))["--day-hour"]).not.toBe(
    afterDeparture["--day-hour"],
  );
  await page.locator("main").evaluate((element) => {
    element.setAttribute("data-route-observation", "progressing");
  });
  await expect(page.locator("main")).toHaveAttribute(
    "data-atmosphere-mode",
    "intro",
  );
  // Finish round 2 from the partway-through pickup and compare the boundary.
  await page.clock.runFor(
    PHASE_DURATION.travelling +
      PHASE_DURATION.arriving +
      PHASE_DURATION.boarding +
      20,
  );
  await expect(page.locator("main")).toHaveAttribute("data-phase", "waiting");
  for (let friend = 2; friend <= 3; friend++) {
    await page.keyboard.press("Enter");
    await collectFriend(page, friend);
  }
  await page.keyboard.press("Enter");
  await page.clock.runFor(PHASE_DURATION.departing + 10);
  for (let scene = 0; scene < 3; scene++)
    await page.clock.runFor(PHASE_DURATION.touring + 10);
  await page.clock.runFor(PHASE_DURATION.returning + 10);
  await page.clock.runFor(PHASE_DURATION.unboarding + 10);
  const home = await snapshot(page);
  await expect(page.locator("main")).toHaveAttribute("data-journeys", "2");
  await expect(page.locator("main")).toHaveAttribute(
    "data-atmosphere-mode",
    "dynamic",
  );
  const reachedWeather = new Set<string>();
  const reachedTime = new Set<string>();
  for (let passenger = 1; passenger <= 3; passenger++) {
    await page.keyboard.press("Enter");
    for (const phase of [
      "departing",
      "travelling",
      "arriving",
      "boarding",
    ] as const) {
      await page.clock.runFor(PHASE_DURATION[phase] + 10);
      reachedWeather.add(
        (await page.locator("main").getAttribute("data-weather")) ?? "",
      );
      reachedTime.add(
        (await page.locator("main").getAttribute("data-time-of-day")) ?? "",
      );
    }
  }
  await page.keyboard.press("Enter");
  await page.clock.runFor(PHASE_DURATION.departing + 10);
  for (let scene = 0; scene < 3; scene++) {
    await page.clock.runFor(PHASE_DURATION.touring / 2);
    reachedWeather.add(
      (await page.locator("main").getAttribute("data-weather")) ?? "",
    );
    reachedTime.add(
      (await page.locator("main").getAttribute("data-time-of-day")) ?? "",
    );
    await page.clock.runFor(PHASE_DURATION.touring / 2 + 10);
    reachedWeather.add(
      (await page.locator("main").getAttribute("data-weather")) ?? "",
    );
  }
  await page.clock.runFor(PHASE_DURATION.returning + 10);
  await page.clock.runFor(PHASE_DURATION.unboarding + 10);
  expect(reachedWeather).toEqual(new Set(WEATHER_TYPES));
  expect(reachedTime.size).toBeGreaterThanOrEqual(3);
  await expect(page.locator("main")).toHaveAttribute("data-journeys", "3");
});

test("hide and resume preserves the exact weather/time point, including particles", async ({
  page,
}) => {
  await start(page);
  await completeRound(page);
  await completeRound(page);
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

test("reduced motion still shows a gradual sky, without fast particles or animation bursts", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await start(page);
  await completeRound(page);
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
