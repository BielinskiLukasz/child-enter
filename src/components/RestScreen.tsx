export function RestScreen({ onContinue }: { onContinue: () => void }) {
  return (
    <div
      className="rest-screen-overlay flex flex-col items-center justify-center text-center"
      role="dialog"
      aria-modal="true"
      aria-label="Pora na odpoczynek. Pociąg śpi pod rozgwieżdżonym niebem."
    >
      <div className="rest-screen-content space-y-6 max-w-lg p-8">
        <div className="rest-moon-illustration mx-auto">
          <svg
            width="120"
            height="120"
            viewBox="0 0 120 120"
            fill="none"
            aria-hidden="true"
          >
            <circle cx="60" cy="60" r="50" fill="#2d3d54" />
            <circle cx="60" cy="60" r="38" fill="#e9dfbe" />
            <circle cx="74" cy="46" r="32" fill="#2d3d54" />
            {/* Sleeping calm eye */}
            <path
              d="M46 62q6 7 12 0"
              stroke="#78684d"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            {/* Little night stars */}
            <circle cx="28" cy="34" r="2.5" fill="#f8e7b5" />
            <circle cx="86" cy="85" r="2" fill="#f8e7b5" />
            <circle cx="95" cy="30" r="3" fill="#f8e7b5" />
            <circle cx="35" cy="88" r="2" fill="#f8e7b5" />
          </svg>
        </div>

        <div className="space-y-2">
          <h2 className="rest-title font-serif text-3xl font-medium tracking-tight">
            Pora na odpoczynek
          </h2>
          <p className="rest-desc text-base">
            Pociąg i wszystkie zwierzątka słodko odpoczywają po podróży.
          </p>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={onContinue}
            className="rest-continue-btn"
          >
            Obudź pociąg i ruszaj dalej
          </button>
        </div>
      </div>
    </div>
  );
}
