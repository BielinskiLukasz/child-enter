import { useState } from "react";

export function ParentValueStrip({
  onOpenParentMenu,
}: {
  onOpenParentMenu: () => void;
}) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) {
    return (
      <button
        type="button"
        onClick={onOpenParentMenu}
        className="parent-pill-trigger"
        aria-label="Panel rodzica: informacje i ustawienia"
      >
        <span className="parent-pill-dot" />
        Dla rodziców
      </button>
    );
  }

  return (
    <aside
      className="parent-value-strip flex items-center justify-between"
      aria-label="Informacje o bezpieczeństwie i zasadach aplikacji"
    >
      <div className="parent-value-strip-content flex items-center gap-2">
        <span className="parent-shield-icon" aria-hidden="true">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <span className="parent-value-text">
          Bez dźwięku · Bez reklam · Bez internetu · Jedna interakcja · Nic nie
          wychodzi z urządzenia
        </span>
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onOpenParentMenu}
          className="parent-strip-btn"
          aria-label="Otwórz ustawienia dla rodzica"
        >
          Ustawienia
        </button>
        <button
          type="button"
          onClick={() => setDismissed(true)}
          className="parent-strip-close"
          aria-label="Zwiń pasek informacji dla rodzica"
        >
          ✕
        </button>
      </div>
    </aside>
  );
}
