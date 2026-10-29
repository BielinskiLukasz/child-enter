import { useLayoutEffect, useRef, type Dispatch } from "react";
import { PHASE_DURATION, type JourneyState } from "../game";

export type PhaseClock = { read: () => number };

/** One visibility-aware clock shared by the story and its atmosphere. */
export function useJourneyClock(
  journey: JourneyState,
  dispatch: Dispatch<{ type: "ENTER" | "ADVANCE" }>,
) {
  const clock = useRef<PhaseClock>({ read: () => 0 });
  useLayoutEffect(() => {
    clock.current = { read: () => 0 };
    if (journey.phase === "waiting") return;

    const duration = PHASE_DURATION[journey.phase];
    let elapsed = 0;
    let startedAt = 0;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const read = () =>
      Math.min(
        1,
        (elapsed + (timer === undefined ? 0 : performance.now() - startedAt)) /
          duration,
      );
    clock.current = { read };

    const resume = () => {
      if (timer !== undefined) return;
      startedAt = performance.now();
      timer = setTimeout(() => {
        elapsed = duration;
        clearTimeout(timer);
        timer = undefined;
        dispatch({ type: "ADVANCE" });
      }, duration - elapsed);
    };
    const pause = () => {
      if (timer === undefined) return;
      elapsed = Math.min(duration, elapsed + performance.now() - startedAt);
      clearTimeout(timer);
      timer = undefined;
    };
    const onVisibility = () => {
      if (document.hidden) pause();
      else resume();
    };
    if (!document.hidden) resume();
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [journey.phase, journey.tourIndex, dispatch]);
  return clock;
}
