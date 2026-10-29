import { useLayoutEffect, useRef, useState, type RefObject } from "react";
import {
  journeyRoadProgress,
  randomInitialConditions,
  sampleAtmosphere,
  type AtmosphereSample,
} from "../atmosphere";
import type { JourneyState } from "../game";
import type { PhaseClock } from "./useJourneyClock";

const FRAME_INTERVAL = 1000 / 24;
const REDUCED_FRAME_INTERVAL = 200;
const number = (value: number) => value.toFixed(4);
const applied = new WeakMap<HTMLElement, Record<string, string>>();

/** DOM-only rendering: no React updates or SVG-tree reconciliation on each frame. */
export function paintAtmosphere(root: HTMLElement, sample: AtmosphereSample) {
  const { style } = root;
  const properties: Record<string, string> = {
    "--sky-top": sample.skyTop,
    "--sky-bottom": sample.skyBottom,
    "--ink": sample.ink,
    "--muted": sample.muted,
    "--accent": sample.accent,
    "--ground": sample.ground,
    "--window": sample.window,
    "--cloud": sample.cloud,
    "--cloud-opacity": number(1 - sample.weights.fog * 0.3),

    "--sun-opacity": number(sample.sun.opacity),
    "--sun-x": `${sample.sun.x.toFixed(2)}px`,
    "--sun-y": `${sample.sun.y.toFixed(2)}px`,
    "--moon-opacity": number(sample.moon.opacity),
    "--moon-x": `${sample.moon.x.toFixed(2)}px`,
    "--moon-y": `${sample.moon.y.toFixed(2)}px`,
    "--stars-opacity": number(sample.stars),
    "--rain-opacity": number(sample.rain),
    "--snow-opacity": number(sample.snow),
    "--fog-opacity": number(sample.fog),
    "--night-veil": number(sample.nightVeil),
    "--day-hour": number(sample.hour),
  };
  const previous = applied.get(root);
  for (const [property, value] of Object.entries(properties)) {
    if (previous?.[property] !== value) style.setProperty(property, value);
  }
  applied.set(root, properties);
  // These are discrete, accessible descriptions, not per-frame live regions.
  const labels = {
    weather: sample.weather,
    timeOfDay: sample.timeOfDay,
    atmosphereMode: sample.mode,
  };
  let changed = false;
  for (const [key, value] of Object.entries(labels)) {
    if (root.dataset[key] !== value) {
      root.dataset[key] = value;
      changed = true;
    }
  }
  if (changed) {
    const description = root.querySelector("#sky-description");
    const weatherNames = {
      clear: "czyste niebo",
      rain: "delikatny deszcz",
      snow: "spokojny opad śniegu",
      fog: "lekka mgła",
    };
    const timeNames = {
      dawn: "świt",
      day: "dzień",
      dusk: "zachód słońca",
      night: "noc",
    };
    if (description)
      description.textContent = `${weatherNames[sample.weather]}. ${timeNames[sample.timeOfDay]}. Słońce, księżyc i gwiazdy zmieniają się powoli w czasie podróży.`;
  }
}

export function useAtmosphere(
  journey: JourneyState,
  clock: RefObject<PhaseClock>,
  root: RefObject<HTMLElement | null>,
) {
  const [initial] = useState(randomInitialConditions);
  const initialRef = useRef(initial);

  useLayoutEffect(() => {
    const element = root.current;
    if (!element) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const draw = () =>
      paintAtmosphere(
        element,
        sampleAtmosphere(
          initialRef.current,
          journey.journeys,
          journeyRoadProgress(journey, clock.current.read()),
        ),
      );
    let frame = 0;
    let lastPaint = -Infinity;
    const tick = (time: number) => {
      if (document.hidden) {
        frame = 0;
        return;
      }
      if (
        time - lastPaint >=
        (motion.matches ? REDUCED_FRAME_INTERVAL : FRAME_INTERVAL)
      ) {
        draw();
        lastPaint = time;
      }
      frame = requestAnimationFrame(tick);
    };
    const sync = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      draw();
      if (
        !document.hidden &&
        journey.phase !== "waiting" &&
        journey.journeys > 0
      ) {
        lastPaint = -Infinity;
        frame = requestAnimationFrame(tick);
      }
    };
    sync();
    document.addEventListener("visibilitychange", sync);
    motion.addEventListener("change", sync);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("visibilitychange", sync);
      motion.removeEventListener("change", sync);
    };
  }, [
    journey.phase,
    journey.stop,
    journey.passengers,
    journey.tourIndex,
    journey.journeys,
    journey.isTour,
    clock,
    root,
  ]);
  return initial;
}
