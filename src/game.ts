export type Landscape = "home" | "forest" | "village" | "mountains";
export type AnimalKind = "rabbit" | "fox" | "bear";
export type Phase =
  | "waiting"
  | "departing"
  | "travelling"
  | "arriving"
  | "boarding"
  | "touring"
  | "returning"
  | "unboarding";

export interface JourneyState {
  phase: Phase;
  stop: number;
  passengers: number;
  tourIndex: number;
  isTour: boolean;
  journeys: number;
}

export const STOPS = [
  { name: "Stacja Artura", landscape: "home" as Landscape },
  { name: "Le\u015bna Polana", landscape: "forest" as Landscape },
  { name: "S\u0142oneczna Wie\u015b", landscape: "village" as Landscape },
  { name: "G\u00f3rska Dolina", landscape: "mountains" as Landscape },
];

export const ANIMALS: { kind: AnimalKind; name: string }[] = [
  { kind: "rabbit", name: "Kr\u00f3liczek" },
  { kind: "fox", name: "Lisek" },
  { kind: "bear", name: "Mi\u015b" },
];

export const TOUR: Landscape[] = ["forest", "village", "mountains"];
export const PHASE_DURATION: Record<Exclude<Phase, "waiting">, number> = {
  departing: 2000,
  travelling: 2200,
  arriving: 1800,
  boarding: 2000,
  touring: 5600,
  returning: 2600,
  unboarding: 2400,
};

export const initialJourney: JourneyState = {
  phase: "waiting",
  stop: 0,
  passengers: 0,
  tourIndex: 0,
  isTour: false,
  journeys: 0,
};

export function journeyReducer(
  state: JourneyState,
  action: { type: "ENTER" | "ADVANCE" },
): JourneyState {
  if (action.type === "ENTER") {
    if (state.phase !== "waiting") return state;
    return {
      ...state,
      phase: "departing",
      isTour: state.passengers === ANIMALS.length,
    };
  }
  switch (state.phase) {
    case "departing":
      return state.isTour
        ? { ...state, phase: "touring", tourIndex: 0 }
        : { ...state, phase: "travelling", stop: state.passengers + 1 };
    case "travelling":
      return { ...state, phase: "arriving" };
    case "arriving":
      return { ...state, phase: "boarding", passengers: state.passengers + 1 };
    case "boarding":
      return { ...state, phase: "waiting" };
    case "touring":
      return state.tourIndex < TOUR.length - 1
        ? { ...state, tourIndex: state.tourIndex + 1 }
        : { ...state, phase: "returning", stop: 0 };
    case "returning":
      return { ...state, phase: "unboarding" };
    case "unboarding":
      return { ...initialJourney, journeys: state.journeys + 1 };
    default:
      return state;
  }
}

export function currentLandscape(state: JourneyState): Landscape {
  if (state.phase === "touring") return TOUR[state.tourIndex];
  return STOPS[state.stop].landscape;
}

export function journeyMessage(state: JourneyState): string {
  switch (state.phase) {
    case "waiting":
      if (state.passengers === 0)
        return state.journeys > 0
          ? "Jeszcze jedna wsp\u00f3lna podr\u00f3\u017c?"
          : "Gotowi na ma\u0142\u0105, wielk\u0105 podr\u00f3\u017c?";
      if (state.passengers === ANIMALS.length)
        return "Wszyscy na pok\u0142adzie. Ruszajmy w \u015bwiat!";
      return `${ANIMALS[state.passengers - 1].name} ju\u017c jest. Jedziemy dalej?`;
    case "boarding":
      return `${ANIMALS[state.passengers - 1].name} wsiada i macha do Ciebie.`;
    case "arriving":
      return `${STOPS[state.stop].name}. Kto na nas czeka?`;
    case "touring":
      return [
        "Przez cichy las, pomi\u0119dzy drzewami...",
        "Przez s\u0142oneczn\u0105 wie\u015b, obok ma\u0142ych domk\u00f3w...",
        "Przez g\u00f3ry, a\u017c do samych chmur...",
      ][state.tourIndex];
    case "returning":
      return "A teraz wracamy do domu. Dobrze by\u0142o by\u0107 razem.";
    case "unboarding":
      return "Do zobaczenia, przyjaciele!";
    default:
      return state.isTour
        ? "Wszyscy razem. Przed nami ca\u0142y ma\u0142y \u015bwiat."
        : "Ko\u0142a si\u0119 tocz\u0105. Nowy przyjaciel ju\u017c czeka.";
  }
}
