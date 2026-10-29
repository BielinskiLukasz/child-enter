import {
  PHASE_DURATION,
  type JourneyState,
  type JourneySettings,
} from "./game";

export const WEATHER_TYPES = ["clear", "rain", "snow", "fog"] as const;
export type Weather = (typeof WEATHER_TYPES)[number];
export type TimeOfDay = "dawn" | "day" | "dusk" | "night";
export type AtmosphereMode = "dynamic" | "override";
export type InitialConditions = { hour: number; weather: Weather };
export type RGB = [number, number, number];
export type WeatherWeights = Record<Weather, number>;

export interface AtmosphereSample {
  hour: number;
  timeOfDay: TimeOfDay;
  weather: Weather;
  weights: WeatherWeights;
  mode: AtmosphereMode;
  skyTop: string;
  skyBottom: string;
  ink: string;
  muted: string;
  accent: string;
  ground: string;
  window: string;
  cloud: string;
  cloudiness: number;
  sun: { x: number; y: number; opacity: number };
  moon: { x: number; y: number; opacity: number };
  stars: number;
  rain: number;
  snow: number;
  fog: number;
  nightVeil: number;
}

export const clamp = (value: number, min = 0, max = 1) =>
  Math.max(min, Math.min(max, value));
export const wrap = (value: number, length: number) =>
  ((value % length) + length) % length;
export const smoothstep = (low: number, high: number, value: number) => {
  const t = clamp((value - low) / (high - low));
  return t * t * (3 - 2 * t);
};
const mix = (a: number, b: number, t: number) => a + (b - a) * t;

function rgb(hex: string): RGB {
  const clean = hex.replace("#", "");
  return [
    parseInt(clean.slice(0, 2), 16),
    parseInt(clean.slice(2, 4), 16),
    parseInt(clean.slice(4, 6), 16),
  ];
}

export function mixColor(a: string, b: string, t: number): string {
  const from = rgb(a);
  const to = rgb(b);
  return `#${from
    .map((channel, i) =>
      Math.round(mix(channel, to[i], clamp(t)))
        .toString(16)
        .padStart(2, "0"),
    )
    .join("")}`;
}

const SKY_STOPS = [
  { hour: 0, top: "#27374f", bottom: "#495e7a", night: 1 },
  { hour: 4.5, top: "#293950", bottom: "#526580", night: 1 },
  { hour: 5.5, top: "#7e8099", bottom: "#c6b6c5", night: 0.65 },
  { hour: 6.5, top: "#d5bec2", bottom: "#eddbc0", night: 0.2 },
  { hour: 8, top: "#f5f1e7", bottom: "#edf0df", night: 0 },
  { hour: 12, top: "#faf7ed", bottom: "#eaf0e1", night: 0 },
  { hour: 17, top: "#f2e7d7", bottom: "#eadcbe", night: 0 },
  { hour: 18.5, top: "#dcb8b4", bottom: "#e9c2a7", night: 0.3 },
  { hour: 20, top: "#7a7997", bottom: "#b2a6bb", night: 0.8 },
  { hour: 21.5, top: "#30425a", bottom: "#52647f", night: 1 },
  { hour: 24, top: "#27374f", bottom: "#495e7a", night: 1 },
];

const PICKUP_DURATION = (
  Object.keys(PHASE_DURATION) as (keyof typeof PHASE_DURATION)[]
)
  .filter((phase) =>
    ["departing", "travelling", "arriving", "boarding"].includes(phase),
  )
  .reduce((sum, phase) => sum + PHASE_DURATION[phase], 0);

const TOUR_DURATION =
  PHASE_DURATION.departing +
  3 * PHASE_DURATION.touring +
  PHASE_DURATION.returning +
  PHASE_DURATION.unboarding;

export const ROUND_DURATION = 3 * PICKUP_DURATION + TOUR_DURATION;

export function randomInitialConditions(
  random = Math.random,
): InitialConditions {
  const pick = () => clamp(random(), 0, 1 - Number.EPSILON);
  return {
    hour: pick() * 24,
    weather: WEATHER_TYPES[Math.floor(pick() * WEATHER_TYPES.length)],
  };
}

export function journeyRoadProgress(
  journey: JourneyState,
  phaseFraction = 0,
): number {
  if (journey.phase === "waiting") {
    return (journey.passengersCount * PICKUP_DURATION) / ROUND_DURATION;
  }
  const fraction = clamp(Number.isFinite(phaseFraction) ? phaseFraction : 0);
  const duration = PHASE_DURATION[journey.phase];
  let elapsed = 0;
  if (journey.isTour) {
    elapsed = 3 * PICKUP_DURATION;
    const tourPhases = ["departing", "touring", "returning", "unboarding"];
    const index = tourPhases.indexOf(journey.phase);
    if (index === 1) {
      elapsed +=
        PHASE_DURATION.departing + journey.tourIndex * PHASE_DURATION.touring;
    }
    if (index === 2) {
      elapsed += PHASE_DURATION.departing + 3 * PHASE_DURATION.touring;
    }
    if (index === 3) elapsed += TOUR_DURATION - PHASE_DURATION.unboarding;
  } else {
    const pickupIndex =
      journey.phase === "departing"
        ? journey.passengersCount
        : journey.phase === "boarding"
          ? journey.passengersCount - 1
          : journey.stop - 1;
    elapsed = pickupIndex * PICKUP_DURATION;
    const pickupPhases = ["departing", "travelling", "arriving", "boarding"];
    for (const phase of pickupPhases) {
      if (phase === journey.phase) break;
      elapsed += PHASE_DURATION[phase as keyof typeof PHASE_DURATION];
    }
  }
  return clamp((elapsed + fraction * duration) / ROUND_DURATION);
}

export function weatherWeights(weather: Weather): WeatherWeights {
  return { clear: 0, rain: 0, snow: 0, fog: 0, [weather]: 1 };
}

export function weatherAt(start: Weather, position: number): WeatherWeights {
  const index = WEATHER_TYPES.indexOf(start);
  const turn = position * WEATHER_TYPES.length;
  const left = Math.floor(turn);
  const t = smoothstep(0, 1, turn - left);
  const from = WEATHER_TYPES[wrap(index + left, WEATHER_TYPES.length)];
  const to = WEATHER_TYPES[wrap(index + left + 1, WEATHER_TYPES.length)];
  const weights = weatherWeights(from);
  for (const kind of WEATHER_TYPES) {
    weights[kind] = mix(weights[kind], kind === to ? 1 : 0, t);
  }
  return weights;
}

function dominantWeather(weights: WeatherWeights): Weather {
  return WEATHER_TYPES.reduce(
    (best, kind) => (weights[kind] > weights[best] ? kind : best),
    WEATHER_TYPES[0],
  );
}

export function timeOfDay(hour: number): TimeOfDay {
  if (hour >= 5 && hour < 8) return "dawn";
  if (hour >= 8 && hour < 17.5) return "day";
  if (hour >= 17.5 && hour < 20.5) return "dusk";
  return "night";
}

function skyAt(hour: number) {
  const next = SKY_STOPS.findIndex((stop) => stop.hour > hour);
  const index = Math.max(0, next - 1);
  const before = SKY_STOPS[index];
  const after = SKY_STOPS[index + 1] ?? SKY_STOPS[SKY_STOPS.length - 1];
  const t = smoothstep(before.hour, after.hour, hour);
  return {
    top: mixColor(before.top, after.top, t),
    bottom: mixColor(before.bottom, after.bottom, t),
    night: mix(before.night, after.night, t),
  };
}

function celestial(hour: number, rise: number, set: number) {
  const progress = clamp((hour - rise) / (set - rise));
  return {
    x: mix(180, 1420, progress),
    y: 355 - Math.sin(progress * Math.PI) * 235,
  };
}

/**
 * Dynamic Atmosphere:
 * Right from Journey 1 (and through all subsequent journeys), the weather and daylight
 * progress smoothly along the route!
 * Also respects parent overrides if configured.
 */
export function sampleAtmosphere(
  initial: InitialConditions,
  completedJourneys: number,
  progress: number,
  settings?: JourneySettings,
): AtmosphereSample {
  const p = clamp(progress);
  const round = Math.max(0, completedJourneys);

  // Smooth continuous cycling right from session launch (Journey 1 onwards)
  const totalTurns = round + p;
  let hour = wrap(initial.hour + totalTurns * 24, 24);
  let weights = weatherAt(initial.weather, totalTurns);

  let mode: AtmosphereMode = "dynamic";

  // Check parent overrides
  if (settings && settings.timeOverride !== "auto") {
    mode = "override";
    switch (settings.timeOverride) {
      case "day":
        hour = 12;
        break;
      case "night":
        hour = 1;
        break;
      case "dawn":
        hour = 6;
        break;
      case "dusk":
        hour = 19;
        break;
    }
  }

  if (settings && settings.weatherOverride !== "auto") {
    mode = "override";
    weights = weatherWeights(settings.weatherOverride);
  }

  const sky = skyAt(hour);
  const day = 1 - sky.night;
  const cloudiness = clamp(
    weights.rain * 0.9 + weights.snow * 0.65 + weights.fog * 0.8,
  );
  const cloudMix =
    weights.rain * 0.24 + weights.snow * 0.07 + weights.fog * 0.18;
  const sunVisibility =
    smoothstep(5.25, 7, hour) * (1 - smoothstep(18.5, 20.5, hour));
  const sun = celestial(hour, 6, 18);
  const moon = celestial(wrap(hour - 18, 24), 0, 12);

  return {
    hour,
    timeOfDay: timeOfDay(hour),
    weather: dominantWeather(weights),
    weights,
    mode,
    skyTop: mixColor(sky.top, "#b7c4ce", cloudMix * (0.7 + day * 0.3)),
    skyBottom: mixColor(sky.bottom, "#c6d0d2", cloudMix),
    // Keep crisp WCAG 2.1 AA contrast by switching sharply at twilight rather than mixing to mid-gray
    ink: sky.night > 0.52 ? "#fdfbf2" : "#1e3325",
    muted: sky.night > 0.52 ? "#d8e5e0" : "#3c5242",
    accent: sky.night > 0.52 ? "#fedbb3" : "#854d29",
    ground: mixColor("#f6f3e8", "#465b78", sky.night),
    window: mixColor("#f7e8bb", "#ffd58f", sky.night),
    cloud: mixColor(
      mixColor("#fffcf3", "#b1c2cf", sky.night * 0.45),
      "#bcc9ce",
      cloudiness * 0.55,
    ),
    cloudiness,
    sun: { ...sun, opacity: sunVisibility },
    moon: { ...moon, opacity: 1 - sunVisibility },
    stars: Math.pow(sky.night, 1.7) * (1 - cloudiness * 0.88),
    rain: Math.pow(weights.rain, 1.1) * 0.73,
    snow: Math.pow(weights.snow, 1.15) * 0.9,
    fog: weights.fog * 0.68 + weights.rain * 0.04 + weights.snow * 0.06,
    nightVeil: sky.night * 0.32 + cloudiness * 0.055,
  };
}
