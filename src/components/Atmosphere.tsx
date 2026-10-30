import { memo, type CSSProperties } from "react";

// Fixed seeds make particle placement and timing stable across rerenders and
// sessions. Weather intensity, not the number of DOM nodes, changes over time.
const noise = (seed: number) => {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};
const rain = Array.from({ length: 32 }, (_, i) => ({
  x: noise(i + 1) * 1600,
  delay: -noise(i + 40) * 5,
  duration: 2.2 + noise(i + 80) * 1.8,
  opacity: 0.2 + noise(i + 120) * 0.45,
}));
const snow = Array.from({ length: 26 }, (_, i) => ({
  x: noise(i + 200) * 1600,
  delay: -noise(i + 240) * 14,
  duration: 10 + noise(i + 280) * 8,
  radius: 1.8 + noise(i + 320) * 1.4,
  drift: 16 + noise(i + 360) * 38,
}));
const stars = Array.from({ length: 28 }, (_, i) => ({
  x: 45 + noise(i + 400) * 1510,
  y: 15 + noise(i + 440) * 225,
  radius: 1.4 + noise(i + 480) * 1.8,
  delay: -noise(i + 520) * 12,
}));

/** Static SVG artwork, with transforms and opacity driven by inherited CSS vars. */
export const CelestialSky = memo(function CelestialSky() {
  return (
    <g aria-hidden="true" pointerEvents="none" className="celestial-sky">
      <defs>
        <radialGradient id="atmosphere-moon-halo">
          <stop stopColor="#eff0dc" stopOpacity=".13" />
          <stop offset="1" stopColor="#eff0dc" stopOpacity="0" />
        </radialGradient>
        <mask id="atmosphere-moon-crescent">
          <rect x="-140" y="-140" width="280" height="280" fill="white" />
          {/* Shifted by --moon-phase-shift: 0 is a crescent, ±78 is a full moon. */}
          <circle
            className="moon-shadow"
            cx="18"
            cy="-13"
            r="31"
            fill="black"
          />
        </mask>
      </defs>
      <g className="atmosphere-stars" opacity="0">
        {stars.map((star, i) => (
          <g key={i} transform={`translate(${star.x} ${star.y})`}>
            <g
              className={i % 3 === 0 ? "sky-star sky-star--soft" : "sky-star"}
              style={{ animationDelay: `${star.delay}s` }}
            >
              <circle r={star.radius} fill="#fff1d0" />
              {i % 4 === 0 && (
                <path
                  d={`M0-${star.radius + 4}v${2 * (star.radius + 4)}M-${star.radius + 4} 0h${2 * (star.radius + 4)}`}
                  stroke="#fff1d0"
                  strokeWidth="1.1"
                  strokeLinecap="round"
                />
              )}
            </g>
          </g>
        ))}
      </g>
      <g className="atmosphere-sun" transform="translate(1320 104)">
        <circle r="53" fill="#eacb8c" opacity=".2" />
        <circle r="42" fill="#ecd093" opacity=".45" />
        <circle r="34" fill="#efd59e" />
        <g stroke="#ddc38e" strokeWidth="2" strokeLinecap="round" opacity=".5">
          {Array.from({ length: 12 }, (_, i) => (
            <path key={i} d="M0-59v-7" transform={`rotate(${i * 30})`} />
          ))}
        </g>
      </g>
      <g className="atmosphere-moon" opacity="0" transform="translate(800 120)">
        <circle r="69" fill="url(#atmosphere-moon-halo)" />
        <circle r="34" fill="#f3ecd2" mask="url(#atmosphere-moon-crescent)" />
        <path
          d="M-27 3q-2 13 9 19"
          stroke="#fff8e2"
          strokeWidth="1.2"
          fill="none"
          opacity=".7"
        />
      </g>
    </g>
  );
});

export const WeatherEffects = memo(function WeatherEffects() {
  return (
    <g className="atmosphere-weather" aria-hidden="true" pointerEvents="none">
      <defs>
        <clipPath id="weather-viewport">
          <rect width="1600" height="640" />
        </clipPath>
        <linearGradient id="atmosphere-night-wash" x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#253c57" stopOpacity="0" />
          <stop offset=".42" stopColor="#253c57" stopOpacity=".15" />
          <stop offset=".65" stopColor="#253c57" stopOpacity="1" />
          <stop offset=".9" stopColor="#253c57" stopOpacity=".5" />
          <stop offset="1" stopColor="#253c57" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="atmosphere-fog" x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#e8eae3" stopOpacity="0" />
          <stop offset=".45" stopColor="#e4e9e4" stopOpacity=".25" />
          <stop offset=".65" stopColor="#e3e9e2" stopOpacity=".8" />
          <stop offset="1" stopColor="#dbe4e4" stopOpacity=".3" />
        </linearGradient>
      </defs>
      <rect
        className="atmosphere-night-veil"
        x="-2000"
        y="0"
        width="5600"
        height="640"
        fill="url(#atmosphere-night-wash)"
        opacity="0"
      />
      <g clipPath="url(#weather-viewport)">
        <g className="atmosphere-rain" opacity="0">
          {rain.map((drop, i) => (
            <g key={i} transform={`translate(${drop.x} -80)`}>
              <path
                className="rain-drop"
                d="M0 0v19"
                stroke="#a7c2cf"
                strokeWidth="1.5"
                strokeLinecap="round"
                opacity={drop.opacity}
                style={{
                  animationDelay: `${drop.delay}s`,
                  animationDuration: `${drop.duration}s`,
                }}
              />
            </g>
          ))}
        </g>
        <g className="atmosphere-snow" opacity="0" fill="#fffbed">
          {snow.map((flake, i) => (
            <g key={i} transform={`translate(${flake.x} -60)`}>
              <circle
                className="snow-flake"
                r={flake.radius}
                style={
                  {
                    animationDelay: `${flake.delay}s`,
                    animationDuration: `${flake.duration}s`,
                    "--snow-drift": `${flake.drift}px`,
                  } as CSSProperties
                }
              />
            </g>
          ))}
        </g>
        <g className="atmosphere-fog" opacity="0" fill="url(#atmosphere-fog)">
          <path
            className="fog-band fog-band--near"
            d="M-450 110Q-50 90 300 115T1000 110t700 0v350H-450Z"
          />
          <path
            className="fog-band fog-band--middle"
            d="M-400 240Q-50 210 350 235t750-5 700 0v200H-400Z"
          />
          <path
            className="fog-band fog-band--far"
            d="M-400 350Q-50 305 350 345t750-5 700 0v190H-400Z"
          />
        </g>
      </g>
    </g>
  );
});
