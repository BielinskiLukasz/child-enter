import {
  useLayoutEffect,
  useReducer,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { Illustration } from "./components/Illustration";
import { ParentValueStrip } from "./components/ParentValueStrip";
import { ParentModal } from "./components/ParentModal";
import { RestScreen } from "./components/RestScreen";
import { useJourneyClock } from "./hooks/useJourneyClock";
import { useAtmosphere } from "./hooks/useAtmosphere";
import {
  createInitialJourney,
  currentLandscape,
  currentStop,
  journeyMessage,
  journeyReducer,
  nextStopTeaser,
  journeyAriaAnnouncement,
  ALL_ANIMALS,
  type JourneySettings,
} from "./game";

function SunMark({ onLongPressTrigger }: { onLongPressTrigger?: () => void }) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const startPress = () => {
    timerRef.current = setTimeout(() => {
      onLongPressTrigger?.();
    }, 2500);
  };

  const cancelPress = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  return (
    <div
      className="world-brand-icon cursor-pointer select-none"
      onPointerDown={startPress}
      onPointerUp={cancelPress}
      onPointerLeave={cancelPress}
      title="Przytrzymaj 3 sekundy, aby otworzyć panel rodzica"
    >
      <svg
        viewBox="0 0 44 44"
        fill="none"
        aria-hidden="true"
        className="w-11 h-11"
      >
        <path
          d="m22 3 4 5 6-1 1 6 5 3-3 6 3 6-5 3-1 6-6-1-4 5-4-5-6 1-1-6-5-3 3-6-3-6 5-3 1-6 6 1Z"
          fill="#e9c57e"
        />
        <circle cx="22" cy="22" r="10" stroke="#59705b" strokeWidth="1.5" />
        <path
          d="M17.5 23.5q4.5 5 9 0"
          stroke="#59705b"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="18.5" cy="19.5" r="1" fill="#59705b" />
        <circle cx="25.5" cy="19.5" r="1" fill="#59705b" />
      </svg>
    </div>
  );
}

function QuietMark() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="m11 5-5 4H3v6h3l5 4V5Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="m16 9 5 6m0-6-5 6"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function App() {
  const [journey, dispatch] = useReducer(journeyReducer, undefined, () =>
    createInitialJourney(),
  );
  const [visible, setVisible] = useState(!document.hidden);
  const [parentModalOpen, setParentModalOpen] = useState(false);
  const enterHeld = useRef(false);

  const waiting = journey.phase === "waiting" && !journey.isResting;
  const landscape = currentLandscape(journey);
  const currentSt = currentStop(journey);
  const driverAnimal = ALL_ANIMALS[journey.plan.driver];
  const teaser = nextStopTeaser(journey);

  // Keyboard navigation & Parent Escape Hatch (Escape / Ctrl+Esc)
  useLayoutEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setParentModalOpen((prev) => !prev);
        return;
      }

      if (event.key !== "Enter" || event.isComposing) return;
      event.preventDefault();
      if (event.repeat || enterHeld.current) return;
      enterHeld.current = true;
      dispatch({ type: "ENTER" });
    };

    const onKeyUp = (event: KeyboardEvent) => {
      if (event.key === "Enter") enterHeld.current = false;
    };

    const onBlur = () => {
      enterHeld.current = false;
    };

    const onVisibility = () => setVisible(!document.hidden);

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("blur", onBlur);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("blur", onBlur);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  const world = useRef<HTMLElement | null>(null);
  const clock = useJourneyClock(journey, dispatch);
  const initialConditions = useAtmosphere(journey, clock, world);

  const moving = [
    "departing",
    "travelling",
    "arriving",
    "touring",
    "returning",
  ].includes(journey.phase);

  const onKeyTap = (event: ReactMouseEvent<HTMLButtonElement>) => {
    if (event.detail === 0) return;
    dispatch({ type: "ENTER" });
  };

  const onKeyRelease = (event: ReactPointerEvent<HTMLButtonElement>) => {
    if (event.pointerType !== "mouse") event.currentTarget.blur();
  };

  const handleResetSession = () => {
    dispatch({ type: "RESET_SESSION" });
  };

  const handleUpdateSettings = (newSettings: Partial<JourneySettings>) => {
    dispatch({ type: "UPDATE_SETTINGS", settings: newSettings });
  };

  const handleTriggerRest = () => {
    dispatch({ type: "SET_REST", isResting: true });
  };

  const handleDismissRest = () => {
    dispatch({ type: "SET_REST", isResting: false });
  };

  return (
    <main
      ref={world}
      className={`little-world relative isolate overflow-hidden ${moving ? "is-moving" : ""} ${!visible ? "is-paused" : ""}`}
      data-phase={journey.phase}
      data-passengers={journey.passengersCount}
      data-landscape={landscape}
      data-journeys={journey.journeys}
      data-initial-weather={initialConditions.weather}
      data-initial-hour={initialConditions.hour.toFixed(4)}
      aria-label="Mały pociąg Artura. Spokojna zabawa sterowana klawiszem Enter lub przyciskiem na ekranie."
    >
      {/* Screen Reader Live Region for Accessibility */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {journeyAriaAnnouncement(journey)}
      </div>

      <ParentValueStrip onOpenParentMenu={() => setParentModalOpen(true)} />

      <header className="site-header flex items-center justify-between">
        <div className="world-brand flex items-center gap-3">
          <SunMark onLongPressTrigger={() => setParentModalOpen(true)} />
          <div className="flex flex-col">
            <span className="brand-sub font-sans text-xs tracking-wide">
              Spokojny świat
            </span>
            <span className="brand-name font-serif text-xl tracking-tight leading-tight">
              Artura
            </span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="quiet-note flex items-center gap-2">
            <QuietMark />
            <span className="text-xs">Zawsze bez dźwięku</span>
          </div>
          <button
            type="button"
            onClick={() => setParentModalOpen(true)}
            className="parent-gear-btn"
            aria-label="Ustawienia dla rodzica"
            title="Ustawienia dla rodzica"
          >
            ⚙
          </button>
        </div>
      </header>

      <section
        className="introduction text-center"
        aria-labelledby="page-title"
      >
        <div
          className="intro-flourish flex items-center justify-center gap-3"
          aria-hidden="true"
        >
          <span />
          <svg width="27" height="17" viewBox="0 0 27 17" fill="none">
            <path
              d="M13.5 15V4M13.5 11C6 12 4 8 4 4c6 0 9 3 9.5 7ZM13.5 8C19 9 23 5 23 1c-6 0-9 3-9.5 7Z"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
          </svg>
          <span />
        </div>
        <h1 id="page-title">
          Mały pociąg <em>Artura</em>
        </h1>
        <p className="intro-subtitle">
          Maszynista: <strong>{driverAnimal.name}</strong> · Stacja:{" "}
          <strong>{currentSt.name}</strong>
        </p>
      </section>

      <div className="landscape">
        <Illustration journey={journey} landscape={landscape} />
      </div>

      <section
        className={`journey-invitation text-center ${waiting ? "is-ready" : "is-travelling"}`}
        aria-label="Podróż"
      >
        <p className="journey-message" aria-live="polite" aria-atomic="true">
          <span key={journeyMessage(journey)}>{journeyMessage(journey)}</span>
        </p>

        {teaser && waiting && (
          <p className="journey-teaser text-xs font-sans tracking-wide">
            {teaser}
          </p>
        )}

        <div className="keyboard-invitation flex items-center justify-center">
          <span className="invitation-prefix invitation-prefix--key">
            Naciśnij
          </span>
          <span className="invitation-prefix invitation-prefix--touch">
            Dotknij
          </span>
          <button
            type="button"
            className="enter-key flex items-center justify-center gap-4"
            aria-label={
              waiting
                ? "Enter. Ruszamy w drogę!"
                : "Pociąg w drodze. Przycisk chwilowo nieaktywny."
            }
            aria-disabled={!waiting}
            onClick={onKeyTap}
            onPointerUp={onKeyRelease}
            onContextMenu={(event) => event.preventDefault()}
          >
            Enter
            <svg
              width="21"
              height="18"
              viewBox="0 0 24 20"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M20 3v9H4m0 0 5-5m-5 5 5 5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <span className="invitation-suffix">i ruszajmy w drogę</span>
        </div>

        <p className="patient-note">
          {waiting
            ? "Pociąg poczeka. Mamy czas."
            : "Teraz po prostu patrz. Pociąg sam zatrzyma się na stacji."}
        </p>
      </section>

      <footer className="page-footer flex items-center justify-between">
        <span className="footer-left">
          <span className="little-leaf" aria-hidden="true" />
          Małe chwile. Wielkie odkrycia.
        </span>
        <span className="footer-right">
          Z myślą o Arturze{" "}
          <span className="footer-heart" aria-hidden="true">
            ♡
          </span>
        </span>
      </footer>

      {/* Rest Screen Overlay */}
      {journey.isResting && <RestScreen onContinue={handleDismissRest} />}

      {/* Parent Modal & Gate */}
      <ParentModal
        isOpen={parentModalOpen}
        onClose={() => setParentModalOpen(false)}
        onResetSession={handleResetSession}
        onTriggerRest={handleTriggerRest}
        settings={journey.settings}
        onUpdateSettings={handleUpdateSettings}
      />
    </main>
  );
}
