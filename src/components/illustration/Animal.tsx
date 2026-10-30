import type { AnimalKind } from "../../game";

export type AnimalMood = "cheerful" | "dozing" | "curious";

const FUR_COLORS: Record<AnimalKind, string> = {
  rabbit: "#f3ebd7",
  fox: "#c77f4e",
  bear: "#b08557",
  hedgehog: "#9c8874",
  owl: "#9d8e7c",
  squirrel: "#cf7a43",
  cat: "#e2bc8d",
  dog: "#cca16e",
  frog: "#8dae76",
  badger: "#585e56",
  deer: "#b88a5e",
  mouse: "#d9cfc2",
  duck: "#efd489",
  sheep: "#f2efe4",
  pig: "#eec2c2",
  turtle: "#9fb27f",
};

/** Species that draw their own face instead of the shared eyes/nose/mouth. */
const CUSTOM_FACE: ReadonlySet<AnimalKind> = new Set([
  "owl",
  "duck",
  "sheep",
  "turtle",
]);

function scarfFor(kind: AnimalKind): string {
  if (kind === "rabbit" || kind === "frog" || kind === "turtle")
    return "#a3b8a1";
  if (kind === "fox" || kind === "squirrel" || kind === "duck")
    return "#799fa3";
  if (kind === "sheep" || kind === "mouse") return "#b3a2bd";
  return "#bf8869";
}

/**
 * One shared template — round head, round body, stubby paws, one waving arm —
 * with the species carried by silhouette and a single fur colour, and a shared
 * face unless the species needs its own. `mood` changes the eyes so a passenger
 * can doze at night or peer at the window in bad weather.
 */
export function Animal({
  kind,
  conductor = false,
  waving = true,
  mood = "cheerful",
}: {
  kind: AnimalKind;
  conductor?: boolean;
  waving?: boolean;
  mood?: AnimalMood;
}) {
  const fur = FUR_COLORS[kind] ?? "#b08557";

  return (
    <g className={`animal animal--${kind} animal--${mood}`}>
      {/* Body */}
      <ellipse cx="0" cy="55" rx="27" ry="29" fill={fur} />
      <ellipse cx="-15" cy="77" rx="12" ry="7" fill={fur} />
      <ellipse cx="15" cy="77" rx="12" ry="7" fill={fur} />
      <ellipse
        cx="-29"
        cy="45"
        rx="9"
        ry="17"
        transform="rotate(22 -29 45)"
        fill={fur}
      />

      {/* Waving arm */}
      <g className={waving ? "waving-paw" : ""}>
        <path
          d="M22 46q23-8 20-24"
          stroke={fur}
          strokeWidth="16"
          strokeLinecap="round"
          fill="none"
        />
        <ellipse cx="42" cy="20" rx="8" ry="10" fill={fur} />
        <path
          d="m40 15 1 4m4-4v4"
          stroke="#dfc5aa"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </g>

      {kind === "rabbit" && (
        <>
          <ellipse
            cx="-17"
            cy="-48"
            rx="11"
            ry="34"
            transform="rotate(-13 -17 -48)"
            fill={fur}
          />
          <ellipse
            cx="17"
            cy="-49"
            rx="11"
            ry="35"
            transform="rotate(12 17 -49)"
            fill={fur}
          />
          <ellipse
            cx="-17"
            cy="-50"
            rx="4.5"
            ry="24"
            transform="rotate(-13 -17 -50)"
            fill="#dcb9a8"
          />
          <ellipse
            cx="17"
            cy="-51"
            rx="4.5"
            ry="24"
            transform="rotate(12 17 -51)"
            fill="#dcb9a8"
          />
          <ellipse cy="-1" rx="32" ry="30" fill={fur} />
        </>
      )}

      {kind === "fox" && (
        <>
          <path
            d="m-33-9-1-41q23 8 30 28M33-9l1-41Q11-42 4-22"
            fill={fur}
            stroke={fur}
            strokeWidth="5"
            strokeLinejoin="round"
          />
          <path d="m-29-25 1-17 14 16m43 1-1-17-14 16" fill="#deb59a" />
          <path d="M-37-5q2-30 37-30T37-5Q28 28 0 33-28 28-37-5Z" fill={fur} />
          <path
            d="M-35-4Q-10-5 0 14 10-5 35-4 24 23 0 30-24 23-35-4Z"
            fill="#f3e7cc"
          />
        </>
      )}

      {kind === "bear" && (
        <>
          <circle cx="-27" cy="-27" r="14" fill={fur} />
          <circle cx="27" cy="-27" r="14" fill={fur} />
          <circle cx="-27" cy="-27" r="7" fill="#d1b28b" />
          <circle cx="27" cy="-27" r="7" fill="#d1b28b" />
          <circle cy="-1" r="34" fill={fur} />
          <ellipse cy="12" rx="18" ry="14" fill="#dccaab" />
        </>
      )}

      {kind === "hedgehog" && (
        <>
          <path
            d="M-38-10C-42-38 0-48 38-10c12 25-10 45-38 45s-50-20-38-45Z"
            fill="#6d5845"
          />
          <path
            d="M-30-22L-38-35M-15-32L-18-48M5-35L8-50M25-30L35-42M35-15L48-22"
            stroke="#594634"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <ellipse cy="-2" rx="28" ry="26" fill={fur} />
          <ellipse cy="8" rx="14" ry="10" fill="#edd9bd" />
        </>
      )}

      {kind === "owl" && (
        <>
          <path d="M-24-32L-18-52L-4-32ZM24-32L18-52L4-32Z" fill={fur} />
          <circle cy="-2" r="33" fill={fur} />
          <circle cx="-13" cy="-6" r="15" fill="#f5ede0" />
          <circle cx="13" cy="-6" r="15" fill="#f5ede0" />
          {mood === "dozing" ? (
            <path
              d="M-19-6q6 6 12 0M7-6q6 6 12 0"
              stroke="#3f4d40"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
          ) : (
            <>
              <circle
                cx="-13"
                cy="-6"
                r={mood === "curious" ? 6 : 5}
                fill="#3f4d40"
              />
              <circle
                cx="13"
                cy="-6"
                r={mood === "curious" ? 6 : 5}
                fill="#3f4d40"
              />
              <circle cx="-11" cy="-8" r="1.5" fill="#fff" />
              <circle cx="15" cy="-8" r="1.5" fill="#fff" />
            </>
          )}
          <polygon points="0,0 -4,-8 4,-8" fill="#d8964e" />
        </>
      )}

      {kind === "squirrel" && (
        <>
          <polygon points="-22,-20 -28,-48 -10,-28" fill={fur} />
          <polygon points="22,-20 28,-48 10,-28" fill={fur} />
          <path
            d="M-28-48L-29-56M28-48L29-56"
            stroke="#9e4c19"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <ellipse cy="-1" rx="31" ry="29" fill={fur} />
          <ellipse cy="11" rx="16" ry="12" fill="#fae8d3" />
        </>
      )}

      {kind === "cat" && (
        <>
          <polygon points="-27,-15 -25,-44 -5,-22" fill={fur} />
          <polygon points="27,-15 25,-44 5,-22" fill={fur} />
          <polygon points="-23,-18 -22,-38 -8,-24" fill="#deb09d" />
          <polygon points="23,-18 22,-38 8,-24" fill="#deb09d" />
          <ellipse cy="-1" rx="31" ry="28" fill={fur} />
          <ellipse cy="10" rx="15" ry="11" fill="#fcedda" />
          <path
            d="M-14 8h-18M-14 12h-16M14 8h18M14 12h16"
            stroke="#675d4e"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </>
      )}

      {kind === "dog" && (
        <>
          <ellipse
            cx="-28"
            cy="-8"
            rx="10"
            ry="22"
            transform="rotate(-15 -28 -8)"
            fill="#a87f50"
          />
          <ellipse
            cx="28"
            cy="-8"
            rx="10"
            ry="22"
            transform="rotate(15 28 -8)"
            fill="#a87f50"
          />
          <ellipse cy="-1" rx="32" ry="29" fill={fur} />
          <ellipse cy="12" rx="17" ry="13" fill="#f0dbbe" />
        </>
      )}

      {kind === "frog" && (
        <>
          <circle cx="-16" cy="-25" r="14" fill={fur} />
          <circle cx="16" cy="-25" r="14" fill={fur} />
          <circle cx="-16" cy="-25" r="7" fill="#f2f5de" />
          <circle cx="16" cy="-25" r="7" fill="#f2f5de" />
          {mood === "dozing" ? (
            <path
              d="M-20-25q4 5 8 0M12-25q4 5 8 0"
              stroke="#4c5a3c"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
          ) : (
            <>
              <circle
                cx="-16"
                cy="-25"
                r={mood === "curious" ? 3.4 : 2.8}
                fill="#3f4d40"
              />
              <circle
                cx="16"
                cy="-25"
                r={mood === "curious" ? 3.4 : 2.8}
                fill="#3f4d40"
              />
            </>
          )}
          <ellipse cy="-2" rx="34" ry="26" fill={fur} />
          <ellipse cy="8" rx="20" ry="12" fill="#d9eabf" />
        </>
      )}

      {kind === "badger" && (
        <>
          <circle cx="-24" cy="-22" r="11" fill="#3f453d" />
          <circle cx="24" cy="-22" r="11" fill="#3f453d" />
          <circle cy="-1" r="32" fill="#f0ede6" />
          <path
            d="M-19-24L-15 15h9L-8-24ZM19-24L15 15h-9L8-24Z"
            fill="#383d36"
            opacity=".95"
          />
          <ellipse cy="11" rx="14" ry="10" fill="#f0ede6" />
        </>
      )}

      {kind === "deer" && (
        <>
          <path
            d="M-15-28L-22-48M-22-42L-30-48M15-28L22-48M22-42L30-48"
            stroke="#7e5d3c"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <ellipse
            cx="-24"
            cy="-18"
            rx="8"
            ry="17"
            transform="rotate(-35 -24 -18)"
            fill={fur}
          />
          <ellipse
            cx="24"
            cy="-18"
            rx="8"
            ry="17"
            transform="rotate(35 24 -18)"
            fill={fur}
          />
          <ellipse cy="-1" rx="30" ry="28" fill={fur} />
          <ellipse cy="11" rx="15" ry="12" fill="#f5e1cb" />
          <circle cx="-12" cy="-12" r="2" fill="#fff" opacity=".8" />
          <circle cx="12" cy="-12" r="2" fill="#fff" opacity=".8" />
        </>
      )}

      {kind === "mouse" && (
        <>
          {/* Big round ears */}
          <circle cx="-25" cy="-22" r="17" fill={fur} />
          <circle cx="25" cy="-22" r="17" fill={fur} />
          <circle cx="-25" cy="-22" r="10" fill="#e3bfb8" />
          <circle cx="25" cy="-22" r="10" fill="#e3bfb8" />
          <ellipse cy="-1" rx="28" ry="26" fill={fur} />
          {/* Long thin tail behind the body */}
          <path
            d="M-26 62q-26 6-20 22 4 12 20 6"
            stroke="#cbbcae"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
          />
        </>
      )}

      {kind === "duck" && (
        <>
          {/* Small head tuft */}
          <path d="M-4-33q4-14 10-16-2 12-6 17" fill="#e6c677" />
          <ellipse cy="-2" rx="30" ry="28" fill={fur} />
          {/* Flat bill */}
          <path d="M-15 8q15-7 30 0-3 12-15 12T-15 8Z" fill="#e0a24e" />
          <path
            d="M-13 13h26"
            stroke="#c98c3f"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          {mood === "dozing" ? (
            <path
              d="M-17-6q5 5 10 0M7-6q5 5 10 0"
              stroke="#6d5a33"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
          ) : (
            <>
              <circle
                cx="-12"
                cy="-6"
                r={mood === "curious" ? 3.6 : 3}
                fill="#3f4d40"
              />
              <circle
                cx="12"
                cy="-6"
                r={mood === "curious" ? 3.6 : 3}
                fill="#3f4d40"
              />
              <circle cx="-11" cy="-7.5" r="1.1" fill="#fff" />
              <circle cx="13" cy="-7.5" r="1.1" fill="#fff" />
            </>
          )}
          <ellipse
            cx="-20"
            cy="4"
            rx="6"
            ry="3.5"
            fill="#e8a98f"
            opacity=".5"
          />
          <ellipse cx="20" cy="4" rx="6" ry="3.5" fill="#e8a98f" opacity=".5" />
        </>
      )}

      {kind === "sheep" && (
        <>
          {/* Cloud-like wool */}
          <path
            d="M-33-8q-9-22 12-26 2-20 22-16 16-13 30 3 20-1 20 20 9 12-6 22-4 16-24 12-18 10-30-4-24 2-24-11Z"
            fill="#f7f4ea"
          />
          <path
            d="M-24-16q6-8 14-5m16-9q9-3 14 4m-40 24q8 5 16 1"
            stroke="#e2ddcd"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
          {/* Dark face */}
          <ellipse cy="2" rx="21" ry="20" fill="#6b6259" />
          {/* Floppy wool ears */}
          <ellipse
            cx="-24"
            cy="-2"
            rx="9"
            ry="6"
            transform="rotate(-18 -24 -2)"
            fill="#6b6259"
          />
          <ellipse
            cx="24"
            cy="-2"
            rx="9"
            ry="6"
            transform="rotate(18 24 -2)"
            fill="#6b6259"
          />
          {mood === "dozing" ? (
            <path
              d="M-14-2q5 5 10 0M4-2q5 5 10 0"
              stroke="#f2ece0"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
          ) : (
            <>
              <circle
                cx="-9"
                cy="-2"
                r={mood === "curious" ? 3.4 : 2.8}
                fill="#f6f1e4"
              />
              <circle
                cx="9"
                cy="-2"
                r={mood === "curious" ? 3.4 : 2.8}
                fill="#f6f1e4"
              />
              <circle cx="-8" cy="-3.4" r="1" fill="#3f4d40" />
              <circle cx="10" cy="-3.4" r="1" fill="#3f4d40" />
            </>
          )}
          <ellipse cy="12" rx="5" ry="3.5" fill="#8d8175" />
          {/* Wool fringe over the forehead */}
          <path
            d="M-16-16q6-9 16-6 10-4 16 6-9 5-16 1-8 4-16-1Z"
            fill="#f7f4ea"
          />
        </>
      )}

      {kind === "pig" && (
        <>
          {/* Triangular folded ears */}
          <path d="M-30-16q-6-24 12-24-2 16-6 24Z" fill="#e2a9a9" />
          <path d="M30-16q6-24-12-24 2 16 6 24Z" fill="#e2a9a9" />
          <ellipse cy="-1" rx="32" ry="29" fill={fur} />
          {/* Snout disc */}
          <ellipse cy="9" rx="15" ry="11" fill="#e5a8a8" />
          <ellipse cx="-5" cy="9" rx="2.6" ry="3.6" fill="#a86d6d" />
          <ellipse cx="5" cy="9" rx="2.6" ry="3.6" fill="#a86d6d" />
          {/* Curly tail */}
          <path
            d="M27 60q14-4 10-14-4-9-12-3"
            stroke="#e2a9a9"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
          />
        </>
      )}

      {kind === "turtle" && (
        <>
          <ellipse cy="-1" rx="30" ry="27" fill={fur} />
          {/* Shell over the body */}
          <path d="M-34 52q0-32 34-32t34 32q-16 9-34 9t-34-9Z" fill="#7d9465" />
          <path
            d="M-22 44q10-9 22-9t22 9M0 30v22M-16 34l8 16M16 34l-8 16"
            stroke="#65794f"
            strokeWidth="2.4"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M-34 52q16 9 34 9t34-9"
            stroke="#a9b98c"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
          />
          {/* Small beak-like mouth */}
          <path
            d="M-6 12q6 4 12 0"
            stroke="#6f7f56"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
          {mood === "dozing" ? (
            <path
              d="M-16-4q5 5 10 0M6-4q5 5 10 0"
              stroke="#3f4d40"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
          ) : (
            <>
              <circle
                cx="-11"
                cy="-4"
                r={mood === "curious" ? 3.4 : 2.8}
                fill="#3f4d40"
              />
              <circle
                cx="11"
                cy="-4"
                r={mood === "curious" ? 3.4 : 2.8}
                fill="#3f4d40"
              />
              <circle cx="-10" cy="-5.4" r="1" fill="#fff" />
              <circle cx="12" cy="-5.4" r="1" fill="#fff" />
            </>
          )}
          <ellipse
            cx="-21"
            cy="7"
            rx="6"
            ry="3.5"
            fill="#cf9f89"
            opacity=".5"
          />
          <ellipse cx="21" cy="7" rx="6" ry="3.5" fill="#cf9f89" opacity=".5" />
        </>
      )}

      {/* Shared face for the species that do not draw their own */}
      {!CUSTOM_FACE.has(kind) && (
        <>
          {mood === "dozing" ? (
            <path
              d="M-15-4q4 5 8 0M7-4q4 5 8 0"
              stroke="#3f4d40"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
          ) : (
            <g fill="#3f4d40">
              <ellipse
                cx="-11"
                cy="-4"
                rx={mood === "curious" ? 3.1 : 2.5}
                ry={mood === "curious" ? 3.6 : 3}
              />
              <ellipse
                cx="11"
                cy="-4"
                rx={mood === "curious" ? 3.1 : 2.5}
                ry={mood === "curious" ? 3.6 : 3}
              />
              {mood === "curious" && (
                <>
                  <circle cx="-10" cy="-5.6" r="1" fill="#fff" />
                  <circle cx="12" cy="-5.6" r="1" fill="#fff" />
                </>
              )}
            </g>
          )}
          {/* Rosy cheeks */}
          <ellipse
            cx="-20"
            cy="7"
            rx="6"
            ry="3.5"
            fill="#cf9f89"
            opacity=".55"
          />
          <ellipse
            cx="20"
            cy="7"
            rx="6"
            ry="3.5"
            fill="#cf9f89"
            opacity=".55"
          />
          {/* Nose */}
          {kind !== "pig" && (
            <path d="M-4 7q4-3 8 0 0 6-4 6-4 0-4-6" fill="#495043" />
          )}
          {/* Mouth */}
          {kind !== "pig" && (
            <path
              d="M0 13v4m-7-1q3 6 7 1 4 5 7-1"
              stroke="#655c4b"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
            />
          )}
        </>
      )}

      {/* Scarf */}
      <path d="M-23 28q24 9 46 0l-2 11q-21 6-42 0Z" fill={scarfFor(kind)} />

      {/* Conductor cap */}
      {conductor && (
        <>
          <path d="M-31-29q0-25 31-25t31 25Z" fill="#4e7163" />
          <path d="M-32-29h66q-6 10-31 10-24 0-35-10Z" fill="#3c5d50" />
          <rect x="-6" y="-43" width="12" height="9" rx="3" fill="#e4c575" />
        </>
      )}
    </g>
  );
}
