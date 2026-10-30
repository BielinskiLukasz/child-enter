export type Landscape =
  | "home"
  | "forest"
  | "village"
  | "mountains"
  | "river"
  | "birch"
  | "snow_village"
  | "meadow";

export type AnimalKind =
  | "rabbit"
  | "fox"
  | "bear"
  | "hedgehog"
  | "owl"
  | "squirrel"
  | "cat"
  | "dog"
  | "frog"
  | "badger"
  | "deer";

export type Phase =
  | "waiting"
  | "departing"
  | "travelling"
  | "arriving"
  | "boarding"
  | "touring"
  | "returning"
  | "unboarding";

export interface StopDefinition {
  name: string;
  landscape: Landscape;
  teaser: string;
}

export interface AnimalDefinition {
  kind: AnimalKind;
  name: string;
}

export const ALL_ANIMALS: Record<AnimalKind, AnimalDefinition> = {
  rabbit: {
    kind: "rabbit",
    name: "Króliczek",
  },
  fox: {
    kind: "fox",
    name: "Lisek",
  },
  bear: {
    kind: "bear",
    name: "Miś",
  },
  hedgehog: {
    kind: "hedgehog",
    name: "Jeżyk",
  },
  owl: {
    kind: "owl",
    name: "Sówka",
  },
  squirrel: {
    kind: "squirrel",
    name: "Wiewiórka",
  },
  cat: {
    kind: "cat",
    name: "Kotek",
  },
  dog: {
    kind: "dog",
    name: "Piesek",
  },
  frog: {
    kind: "frog",
    name: "Żabka",
  },
  badger: {
    kind: "badger",
    name: "Borsuk",
  },
  deer: {
    kind: "deer",
    name: "Jelonek",
  },
};

export const ANIMAL_KEYS: AnimalKind[] = Object.keys(
  ALL_ANIMALS,
) as AnimalKind[];

export const ALL_LOCATIONS: Record<Landscape, StopDefinition> = {
  home: {
    name: "Stacja Artura",
    landscape: "home",
    teaser: "Wracamy do przytulnego domku",
  },
  forest: {
    name: "Leśna Polana",
    landscape: "forest",
    teaser: "Wśród zielonych sosen i dębów",
  },
  village: {
    name: "Słoneczna Wieś",
    landscape: "village",
    teaser: "Obok małych domków i płotków",
  },
  mountains: {
    name: "Górska Dolina",
    landscape: "mountains",
    teaser: "W cieniu wysokich, łagodnych szczytów",
  },
  river: {
    name: "Nadbrzeże Rzeki",
    landscape: "river",
    teaser: "Gdzie szumi woda i kołysze się mała łódka",
  },
  birch: {
    name: "Brzozowy Gaj",
    landscape: "birch",
    teaser: "Wśród białych drzew o złotych listkach",
  },
  snow_village: {
    name: "Śnieżna Polana",
    landscape: "snow_village",
    teaser: "Otulona puszystym, białym śniegiem",
  },
  meadow: {
    name: "Szepcząca Łąka",
    landscape: "meadow",
    teaser: "Pełna pachnących polnych kwiatków",
  },
};

export const DESTINATION_LOCATIONS: Landscape[] = [
  "forest",
  "village",
  "mountains",
  "river",
  "birch",
  "snow_village",
  "meadow",
];

export const PHASE_DURATION: Record<Exclude<Phase, "waiting">, number> = {
  departing: 2000,
  travelling: 2200,
  arriving: 1800,
  boarding: 2000,
  touring: 5600,
  returning: 2600,
  unboarding: 2400,
};

export function shuffleArray<T>(array: T[], random = Math.random): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export interface SessionPlan {
  driver: AnimalKind;
  passengers: AnimalKind[];
  stops: StopDefinition[];
  tour: Landscape[];
}

export function generateSessionPlan(random = Math.random): SessionPlan {
  const shuffledAnimals = shuffleArray(ANIMAL_KEYS, random);
  const driver = shuffledAnimals[0];
  const passengers = [
    shuffledAnimals[1],
    shuffledAnimals[2],
    shuffledAnimals[3],
  ];

  const shuffledDestinations = shuffleArray(DESTINATION_LOCATIONS, random);
  const selectedDestinations = [
    shuffledDestinations[0],
    shuffledDestinations[1],
    shuffledDestinations[2],
  ];

  const stops: StopDefinition[] = [
    ALL_LOCATIONS.home,
    ALL_LOCATIONS[selectedDestinations[0]],
    ALL_LOCATIONS[selectedDestinations[1]],
    ALL_LOCATIONS[selectedDestinations[2]],
  ];

  return {
    driver,
    passengers,
    stops,
    tour: selectedDestinations,
  };
}

export interface JourneySettings {
  weatherOverride: "auto" | "clear" | "rain" | "snow" | "fog";
  timeOverride: "auto" | "day" | "night" | "dawn" | "dusk";
  roundsBeforeRest: number; // e.g. 4 rounds before rest screen, 0 = infinite
  playtimeLimitMinutes: number; // 0 = no limit
}

export const defaultSettings: JourneySettings = {
  weatherOverride: "auto",
  timeOverride: "auto",
  roundsBeforeRest: 4,
  playtimeLimitMinutes: 20,
};

export interface JourneyState {
  phase: Phase;
  stop: number;
  passengersCount: number;
  tourIndex: number;
  isTour: boolean;
  journeys: number;
  plan: SessionPlan;
  isResting: boolean;
  restReason: "rounds" | "playtime" | "parent" | null;
  settings: JourneySettings;
}

export function createInitialJourney(
  plan: SessionPlan,
  settings: JourneySettings = defaultSettings,
  journeys = 0,
): JourneyState {
  return {
    phase: "waiting",
    stop: 0,
    passengersCount: 0,
    tourIndex: 0,
    isTour: false,
    journeys,
    plan,
    isResting: false,
    restReason: null,
    settings: { ...settings },
  };
}

export type JourneyAction =
  | { type: "ENTER" }
  | { type: "ADVANCE"; nextPlan?: SessionPlan }
  | { type: "RESET_SESSION"; plan: SessionPlan }
  | { type: "UPDATE_SETTINGS"; settings: Partial<JourneySettings> }
  | {
      type: "SET_REST";
      isResting: boolean;
      reason?: JourneyState["restReason"];
    };

export function journeyReducer(
  state: JourneyState,
  action: JourneyAction,
): JourneyState {
  switch (action.type) {
    case "ENTER": {
      if (state.phase !== "waiting" || state.isResting) return state;
      const isTour = state.passengersCount === state.plan.passengers.length;
      return {
        ...state,
        phase: "departing",
        isTour,
      };
    }
    case "ADVANCE": {
      switch (state.phase) {
        case "departing":
          return state.isTour
            ? { ...state, phase: "touring", tourIndex: 0 }
            : {
                ...state,
                phase: "travelling",
                stop: state.passengersCount + 1,
              };
        case "travelling":
          return { ...state, phase: "arriving" };
        case "arriving":
          return {
            ...state,
            phase: "boarding",
            passengersCount: state.passengersCount + 1,
          };
        case "boarding":
          return { ...state, phase: "waiting" };
        case "touring":
          return state.tourIndex < state.plan.tour.length - 1
            ? { ...state, tourIndex: state.tourIndex + 1 }
            : { ...state, phase: "returning", stop: 0 };
        case "returning":
          return { ...state, phase: "unboarding" };
        case "unboarding": {
          // Generate entropy before dispatch; reducers must stay replayable.
          if (!action.nextPlan) return state;
          const nextJourneys = state.journeys + 1;
          const shouldRest =
            state.settings.roundsBeforeRest > 0 &&
            nextJourneys % state.settings.roundsBeforeRest === 0;

          return {
            ...state,
            phase: "waiting",
            stop: 0,
            passengersCount: 0,
            tourIndex: 0,
            isTour: false,
            journeys: nextJourneys,
            plan: action.nextPlan,
            isResting: shouldRest,
            restReason: shouldRest ? "rounds" : null,
          };
        }
        default:
          return state;
      }
    }
    case "RESET_SESSION": {
      return createInitialJourney(action.plan, state.settings, state.journeys);
    }
    case "UPDATE_SETTINGS": {
      return {
        ...state,
        settings: {
          ...state.settings,
          ...action.settings,
        },
      };
    }
    case "SET_REST": {
      return {
        ...state,
        isResting: action.isResting,
        restReason: action.isResting ? (action.reason ?? "parent") : null,
      };
    }
    default:
      return state;
  }
}

/**
 * The driver stays in the cab everywhere except Artur's own station, where
 * they step out onto the platform while the train is parked (before the first
 * journey, and again when everyone says goodbye). Pure: derived from state only.
 */
export function driverIsOutside(state: JourneyState): boolean {
  return (
    state.stop === 0 &&
    !state.isTour &&
    (state.phase === "waiting" || state.phase === "unboarding")
  );
}

export function currentLandscape(state: JourneyState): Landscape {
  if (state.phase === "touring") {
    return state.plan.tour[state.tourIndex] ?? "forest";
  }
  return state.plan.stops[state.stop]?.landscape ?? "home";
}

export function currentStop(state: JourneyState): StopDefinition {
  return state.plan.stops[state.stop] ?? ALL_LOCATIONS.home;
}

export function nextStopTeaser(state: JourneyState): string | null {
  if (state.phase === "waiting") {
    if (state.passengersCount < state.plan.passengers.length) {
      const nextStop = state.plan.stops[state.passengersCount + 1];
      const nextPassenger =
        ALL_ANIMALS[state.plan.passengers[state.passengersCount]];
      if (nextStop && nextPassenger) {
        return `Następna stacja: ${nextStop.name}. Czeka ${nextPassenger.name}.`;
      }
    } else {
      return "Przed nami wielka podróż przez wszystkie krainy!";
    }
  }
  return null;
}

export function journeyMessage(state: JourneyState): string {
  const driver = ALL_ANIMALS[state.plan.driver];
  const passengers = state.plan.passengers;

  switch (state.phase) {
    case "waiting":
      if (state.passengersCount === 0) {
        return state.journeys > 0
          ? `Maszynista ${driver.name} czeka na stacji. Ruszamy w kolejną podróż?`
          : `Maszynista ${driver.name} zaprasza do pociągu. Ruszamy w podróż?`;
      }
      if (state.passengersCount === passengers.length) {
        return "Wszyscy przyjaciele są na pokładzie. Ruszajmy w świat!";
      }
      {
        const currentPassenger =
          ALL_ANIMALS[passengers[state.passengersCount - 1]];
        return `${currentPassenger.name} już wygodnie siedzi. Jedziemy dalej?`;
      }
    case "boarding": {
      const boarded = ALL_ANIMALS[passengers[state.passengersCount - 1]];
      return `${boarded.name} wsiada do wagonika i macha do Ciebie!`;
    }
    case "arriving": {
      const stop = state.plan.stops[state.stop];
      const waitingFriend =
        state.stop > 0 ? ALL_ANIMALS[passengers[state.stop - 1]] : null;
      return waitingFriend
        ? `${stop.name}. ${waitingFriend.name} już na nas czeka!`
        : `${stop.name}.`;
    }
    case "touring": {
      const loc = ALL_LOCATIONS[state.plan.tour[state.tourIndex]];
      return loc
        ? `${loc.name} – ${loc.teaser.toLowerCase()}...`
        : "Podróżujemy przez piękny krajobraz...";
    }
    case "returning":
      return "Wracamy do Stacji Artura. Dobrze było być razem.";
    case "unboarding":
      return "Do zobaczenia, kochani przyjaciele!";
    default:
      return state.isTour
        ? "Koła się toczą. Wszyscy razem podziwiamy świat."
        : "Koła się toczą. Kolejny przyjaciel już wypatruje pociągu.";
  }
}

// ARIA announcement for screen readers giving calm situational awareness
export function journeyAriaAnnouncement(state: JourneyState): string {
  if (state.isResting) {
    return "Pora na odpoczynek. Pociąg śpi pod gwiazdami.";
  }
  const message = journeyMessage(state);
  const teaser = nextStopTeaser(state);
  if (state.phase === "waiting") {
    return `${message} ${teaser ? teaser : ""} Naciśnij Enter lub dotknij przycisku, aby ruszyć.`;
  }
  return `Pociąg w drodze. ${message} Przycisk chwilowo odpoczywa.`;
}
