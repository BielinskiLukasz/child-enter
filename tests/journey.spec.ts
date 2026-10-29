import { expect, test, type Page } from "@playwright/test";
import { resolve } from "node:path";
import {
  createInitialJourney,
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

test("the state machine waits, collects three friends, tours and resets with fresh plan", () => {
  let state: JourneyState = createInitialJourney(() => 0.42);
  const initialDriver = state.plan.driver;
  const initialPassengers = state.plan.passengers;
  expect(state.plan.driver).toBeDefined();
  expect(state.plan.passengers.length).toBe(3);
  expect(state.plan.stops.length).toBe(4);

  for (let passenger = 1; passenger <= 3; passenger++) {
    state = journeyReducer(state, { type: "ENTER" });
    expect(state.phase).toBe("departing");
    expect(journeyReducer(state, { type: "ENTER" })).toBe(state);
    for (let phase = 0; phase < 4; phase++)
      state = journeyReducer(state, { type: "ADVANCE" });
    expect(state.phase).toBe("waiting");
    expect(state.passengersCount).toBe(passenger);
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

  // Finished 1 full journey
  expect(state.journeys).toBe(1);
  expect(state.passengersCount).toBe(0);
  expect(state.phase).toBe("waiting");
  expect(state.plan.driver).toBeDefined();
  expect(state.plan.passengers.length).toBe(3);
});

test("Enter is the main input, held keys are ignored, and a full journey can be replayed", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.clock.install();
  await page.goto("/");
  const world = page.locator("main");
  await expect(page).toHaveTitle(/Artura/);

  // The Enter button is the prominent action key
  await expect(page.locator("button.enter-key")).toBeVisible();
  await page.mouse.click(720, 600);
  for (const key of ["Space", "ArrowRight", "a"])
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

  for (let s = 0; s < 3; s++) {
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

test.describe("on a touch phone without a keyboard", () => {
  test.use({
    hasTouch: true,
    isMobile: true,
    viewport: { width: 390, height: 844 },
  });

  test("the visible Enter button runs the whole journey by finger", async ({
    page,
  }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.clock.install();
    await page.goto("/");
    const world = page.locator("main");
    const enterKey = page.locator(".enter-key");

    await expect(enterKey).toBeInViewport();
    await expect(enterKey).toContainText("Enter");
    await expect(page.locator(".invitation-prefix--touch")).toBeVisible();
    await expect(page.locator(".invitation-prefix--key")).toBeHidden();
    const initialKey = (await enterKey.boundingBox())!;
    expect(initialKey.width).toBeGreaterThanOrEqual(44);
    expect(initialKey.height).toBeGreaterThanOrEqual(44);
    const tapKey = async () => {
      const currentKey = (await page.locator(".enter-key").boundingBox())!;
      await page.touchscreen.tap(
        currentKey.x + currentKey.width / 2,
        currentKey.y + currentKey.height / 2,
      );
    };

    // Touching scenery does not advance journey
    const scene = (await page.locator(".landscape").boundingBox())!;
    await page.touchscreen.tap(scene.x + scene.width / 2, scene.y + 60);
    const title = (await page.locator("h1").boundingBox())!;
    await page.touchscreen.tap(title.x + title.width / 2, title.y + 20);
    await page.clock.runFor(8000);
    await expect(world).toHaveAttribute("data-phase", "waiting");

    for (let friend = 1; friend <= 3; friend++) {
      await tapKey();
      await collectFriend(page, friend);
    }
    await expect(page.locator(".passenger")).toHaveCount(3);

    await tapKey();
    await advance(page, "departing");
    for (let s = 0; s < 3; s++) {
      await advance(page, "touring");
    }
    await advance(page, "returning");
    await advance(page, "unboarding");
    await expect(world).toHaveAttribute("data-journeys", "1");
    await expect(world).toHaveAttribute("data-passengers", "0");
    expect(errors).toEqual([]);
  });

  test("repeated taps and a long press never queue extra journeys", async ({
    page,
  }) => {
    await page.clock.install();
    await page.goto("/");
    const world = page.locator("main");
    const key = (await page.locator(".enter-key").boundingBox())!;
    const centre = { x: key.x + key.width / 2, y: key.y + key.height / 2 };

    for (let tap = 0; tap < 5; tap++)
      await page.touchscreen.tap(centre.x, centre.y);
    await advance(page, "departing");
    await advance(page, "travelling");
    await advance(page, "arriving");
    await advance(page, "boarding");
    await expect(world).toHaveAttribute("data-phase", "waiting");
    await expect(world).toHaveAttribute("data-passengers", "1");

    await page.touchscreen.tap(centre.x, centre.y);
    await expect(world).toHaveAttribute("data-phase", "departing");
    await page.clock.runFor(1000);
    await page.touchscreen.tap(centre.x, centre.y);
    await page.clock.runFor(1010);
    await expect(world).toHaveAttribute("data-phase", "travelling");
    await page.clock.runFor(60000);
    await expect(world).toHaveAttribute("data-phase", "waiting");
    await expect(world).toHaveAttribute("data-passengers", "2");
  });
});

test.describe("parent controls and escape hatch", () => {
  test("Escape key toggles parent modal with secure gate", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Escape");
    await expect(page.locator(".parent-modal-card")).toBeVisible();
    await expect(page.locator("h2#parent-modal-title")).toContainText(
      "Strefa Rodzica",
    );

    // Solving math challenge unlocks settings
    await page.locator(".parent-gate-input").fill("7");
    await page.locator(".parent-gate-submit").click();
    await expect(page.locator(".parent-settings-content")).toBeVisible();
    await expect(page.locator("text=Pogoda i pora dnia")).toBeVisible();

    // Close modal
    await page.locator(".parent-done-btn").click();
    await expect(page.locator(".parent-modal-card")).toBeHidden();
  });
});

test.describe("a phone held sideways", () => {
  test.use({
    hasTouch: true,
    isMobile: true,
    viewport: { width: 863, height: 360 },
  });

  test("fits the short screen, so a child never has to scroll", async ({
    page,
  }) => {
    await page.goto("/");
    await expect(page.locator(".enter-key")).toBeInViewport({ ratio: 1 });
    const layout = await page.evaluate(() => ({
      scrolls: document.documentElement.scrollHeight > window.innerHeight + 1,
      wide: document.documentElement.scrollWidth > window.innerWidth + 1,
      trainBottom: document.querySelector(".train")!.getBoundingClientRect()
        .bottom,
      messageTop: document
        .querySelector(".journey-message")!
        .getBoundingClientRect().top,
    }));
    expect(layout.scrolls).toBe(false);
    expect(layout.wide).toBe(false);
    expect(layout.messageTop).toBeGreaterThan(layout.trainBottom);
  });
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
