import {
  useLayoutEffect,
  useReducer,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { Illustration } from "./components/Illustration";
import { useJourneyClock } from "./hooks/useJourneyClock";
import { useAtmosphere } from "./hooks/useAtmosphere";
import {
  currentLandscape,
  initialJourney,
  journeyMessage,
  journeyReducer,
} from "./game";

function SunMark() {
  return (
    <svg viewBox="0 0 44 44" fill="none" aria-hidden="true">
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
  const [journey, dispatch] = useReducer(journeyReducer, initialJourney);
  const [visible, setVisible] = useState(!document.hidden);
  const enterHeld = useRef(false);
  const waiting = journey.phase === "waiting";
  const landscape = currentLandscape(journey);

  useLayoutEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
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

  // The weather and the story share one clock, including the hidden-tab pause.
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

  // The on-screen key is the touch equivalent of the Enter key. Clicks that a
  // browser synthesises from a focused button and the keyboard carry detail 0
  // and are skipped here, because the window listener already handled them.
  const onKeyTap = (event: ReactMouseEvent<HTMLButtonElement>) => {
    if (event.detail === 0) return;
    dispatch({ type: "ENTER" });
  };
  // A finger or stylus should not leave a focus ring behind on the key.
  const onKeyRelease = (event: ReactPointerEvent<HTMLButtonElement>) => {
    if (event.pointerType !== "mouse") event.currentTarget.blur();
  };

  return (
    <main
      ref={world}
      className={`little-world relative isolate overflow-hidden ${moving ? "is-moving" : ""} ${!visible ? "is-paused" : ""}`}
      data-phase={journey.phase}
      data-passengers={journey.passengers}
      data-landscape={landscape}
      data-journeys={journey.journeys}
      data-initial-weather={initialConditions.weather}
      data-initial-hour={initialConditions.hour.toFixed(4)}
      aria-label={
        "Ma\u0142y poci\u0105g Artura. Spokojna zabawa sterowana klawiszem Enter lub przyciskiem na ekranie."
      }
    >
      <header className="site-header flex items-center justify-between">
        <div className="world-brand flex items-center">
          <SunMark />
          <span>
            Spokojny &#347;wiat<span className="brand-name">Artura</span>
          </span>
        </div>
        <div className="quiet-note flex items-center gap-2.5">
          <QuietMark />
          <span>Zawsze bez d&#378;wi&#281;ku</span>
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
          Ma&#322;y poci&#261;g <em>Artura</em>
        </h1>
        <p>
          Wsi&#261;d&#378; do &#347;wiata, w kt&oacute;rym nigdzie nie trzeba
          si&#281; spieszy&#263;.
        </p>
      </section>
      <div className="landscape">
        <Illustration journey={journey} landscape={landscape} />
      </div>
      <section
        className={`journey-invitation text-center ${waiting ? "is-ready" : "is-travelling"}`}
        aria-label={"Podr\u00f3\u017c"}
      >
        <p className="journey-message" aria-live="polite" aria-atomic="true">
          <span key={journeyMessage(journey)}>{journeyMessage(journey)}</span>
        </p>
        <div className="keyboard-invitation flex items-center justify-center">
          <span className="invitation-prefix invitation-prefix--key">
            Naci&#347;nij
          </span>
          <span className="invitation-prefix invitation-prefix--touch">
            Dotknij
          </span>
          <button
            type="button"
            className="enter-key flex items-center justify-center gap-4"
            aria-label={"Enter. Ruszamy w drog\u0119."}
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
          <span className="invitation-suffix">i ruszajmy w drog&#281;</span>
        </div>
        <p className="patient-note">
          {waiting
            ? "Poci\u0105g poczeka. Mamy czas."
            : "Teraz po prostu patrz. Poci\u0105g sam zatrzyma si\u0119 na stacji."}
        </p>
      </section>
      <footer className="page-footer flex items-center justify-between">
        <span className="footer-left">
          <span className="little-leaf" aria-hidden="true" />
          Ma&#322;e chwile. Wielkie odkrycia.
        </span>
        <span className="footer-right">
          Z my&#347;l&#261; o Arturze{" "}
          <span className="footer-heart" aria-hidden="true">
            &#9825;
          </span>
        </span>
      </footer>
    </main>
  );
}
