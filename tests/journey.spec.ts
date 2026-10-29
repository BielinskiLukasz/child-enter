import { expect, test, type Page } from "@playwright/test";
import { resolve } from "node:path";
import {
  initialJourney,
  journeyReducer,
  PHASE_DURATION,
  type JourneyState,
} from "../src/game";

async function advance(page: Page, phase: keyof typeof PHASE_DURATION) {
  await expect(page.locator("main")).toHaveAttribute("data-phase", phase);
  await page.clock.runFor(PHASE_DURATION[phase] + 10);
}

async function collectFriend(page: Page, count: number) {
  await advance(page, "departing");
  await advance(page, "travelling");
  await advance(page, "arriving");
  await expect(page.locator("main")).toHaveAttribute(
    "data-passengers",
    String(count),
  );
  await advance(page, "boarding");
  await expect(page.locator("main")).toHaveAttribute("data-phase", "waiting");
}

test("the state machine waits, collects three friends, tours and resets", () => {
  let state: JourneyState = initialJourney;
  for (let passenger = 1; passenger <= 3; passenger++) {
    state = journeyReducer(state, { type: "ENTER" });
    expect(state.phase).toBe("departing");
    expect(journeyReducer(state, { type: "ENTER" })).toBe(state);
    for (let phase = 0; phase < 4; phase++)
      state = journeyReducer(state, { type: "ADVANCE" });
    expect(state.phase).toBe("waiting");
    expect(state.passengers).toBe(passenger);
    expect(state.stop).toBe(passenger);
  }
  state = journeyReducer(state, { type: "ENTER" });
  expect(state.isTour).toBe(true);
  state = journeyReducer(state, { type: "ADVANCE" });
  for (let scene = 0; scene < 3; scene++) {
    expect(state.phase).toBe("touring");
    expect(state.tourIndex).toBe(scene);
    state = journeyReducer(state, { type: "ADVANCE" });
  }
  expect(state.phase).toBe("returning");
  state = journeyReducer(state, { type: "ADVANCE" });
  expect(state.phase).toBe("unboarding");
  state = journeyReducer(state, { type: "ADVANCE" });
  expect(state).toEqual({ ...initialJourney, journeys: 1 });
});

test("Enter is the only input, held keys are ignored, and a full journey can be replayed", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.clock.install();
  await page.goto("/");
  const world = page.locator("main");
  await expect(page).toHaveTitle(/Artura/);
  await expect(page.locator('button, a, input, [role="button"]')).toHaveCount(
    0,
  );
  await page.mouse.click(720, 600);
  for (const key of ["Space", "ArrowRight", "Escape", "a"])
    await page.keyboard.press(key);
  await page.clock.runFor(10000);
  await expect(world).toHaveAttribute("data-phase", "waiting");
  await expect(world).toHaveAttribute("data-passengers", "0");

  await page.keyboard.down("Enter");
  await collectFriend(page, 1);
  await page.keyboard.down("Enter");
  await page.clock.runFor(3000);
  await expect(world).toHaveAttribute("data-phase", "waiting");
  await page.keyboard.up("Enter");

  await page.keyboard.press("NumpadEnter");
  await page.keyboard.press("Enter");
  await collectFriend(page, 2);
  await page.clock.runFor(12000);
  await expect(world).toHaveAttribute("data-phase", "waiting");
  await expect(world).toHaveAttribute("data-passengers", "2");

  await page.keyboard.press("Enter");
  await collectFriend(page, 3);
  await expect(page.locator(".passenger")).toHaveCount(3);
  await page.keyboard.press("Enter");
  await advance(page, "departing");
  for (const landscape of ["forest", "village", "mountains"]) {
    await expect(world).toHaveAttribute("data-landscape", landscape);
    await advance(page, "touring");
  }
  await advance(page, "returning");
  await advance(page, "unboarding");
  await expect(world).toHaveAttribute("data-phase", "waiting");
  await expect(world).toHaveAttribute("data-passengers", "0");
  await expect(world).toHaveAttribute("data-journeys", "1");
  await expect(world).toHaveAttribute("data-landscape", "home");
  await page.keyboard.press("Enter");
  await collectFriend(page, 1);
  expect(errors).toEqual([]);
});

test("the story pauses when hidden and resumes with its remaining time", async ({
  page,
}) => {
  await page.clock.install();
  await page.goto("/");
  await expect(page.locator("main")).toHaveAttribute("data-phase", "waiting");
  await page.keyboard.press("Enter");
  await expect(page.locator("main")).toHaveAttribute("data-phase", "departing");
  await page.clock.runFor(1000);
  await page.evaluate(() => {
    Object.defineProperty(document, "hidden", {
      configurable: true,
      get: () => true,
    });
    document.dispatchEvent(new Event("visibilitychange"));
  });
  await expect(page.locator("main")).toHaveClass(/is-paused/);
  await page.clock.runFor(20000);
  await expect(page.locator("main")).toHaveAttribute("data-phase", "departing");
  await page.evaluate(() => {
    Object.defineProperty(document, "hidden", {
      configurable: true,
      get: () => false,
    });
    document.dispatchEvent(new Event("visibilitychange"));
  });
  await page.clock.runFor(1100);
  await expect(page.locator("main")).toHaveAttribute(
    "data-phase",
    "travelling",
  );
});

test("the full train stays on screen at mobile, tablet and desktop widths", async ({
  page,
}) => {
  await page.goto("/");
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const viewport of [
    { width: 320, height: 740 },
    { width: 390, height: 844 },
    { width: 768, height: 1024 },
    { width: 844, height: 390 },
    { width: 1024, height: 600 },
    { width: 1440, height: 900 },
    { width: 1920, height: 1080 },
  ]) {
    await page.setViewportSize(viewport);
    const train = await page.locator(".train").boundingBox();
    expect(train).not.toBeNull();
    expect(train!.x).toBeGreaterThanOrEqual(-1);
    expect(train!.x + train!.width).toBeLessThanOrEqual(viewport.width + 1);
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > innerWidth,
    );
    expect(overflow).toBe(false);
    await expect(page.locator(".enter-key")).toBeInViewport();
  }
});

test("the single HTML file works offline without any remote requests", async ({
  browser,
}) => {
  const context = await browser.newContext({ offline: true });
  const page = await context.newPage();
  const remoteRequests: string[] = [];
  const errors: string[] = [];
  page.on("request", (request) => {
    if (/^https?:/.test(request.url())) remoteRequests.push(request.url());
  });
  page.on("pageerror", (error) => errors.push(error.message));
  await page.clock.install();
  await page.goto(`file://${resolve("dist/index.html")}`);
  await expect(page.locator("h1")).toContainText("Artura");
  await page.keyboard.press("Enter");
  await collectFriend(page, 1);
  expect(remoteRequests).toEqual([]);
  expect(errors).toEqual([]);
  await context.close();
});
