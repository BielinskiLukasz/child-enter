import type { AnimalKind } from "../../game";

export function Animal({
  kind,
  conductor = false,
  waving = true,
}: {
  kind: AnimalKind;
  conductor?: boolean;
  waving?: boolean;
}) {
  const furColors: Record<AnimalKind, string> = {
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
  };

  const fur = furColors[kind] || "#b08557";

  return (
    <g className={`animal animal--${kind}`}>
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

      {/* Animal Specific Features & Head */}
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
          {/* Quills fan */}
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
          {/* Face */}
          <ellipse cy="-2" rx="28" ry="26" fill={fur} />
          <ellipse cy="8" rx="14" ry="10" fill="#edd9bd" />
        </>
      )}

      {kind === "owl" && (
        <>
          {/* Ear tufts */}
          <path d="M-24-32L-18-52L-4-32ZM24-32L18-52L4-32Z" fill={fur} />
          <circle cy="-2" r="33" fill={fur} />
          {/* Big owl eye patches */}
          <circle cx="-13" cy="-6" r="15" fill="#f5ede0" />
          <circle cx="13" cy="-6" r="15" fill="#f5ede0" />
          <circle cx="-13" cy="-6" r="5" fill="#3f4d40" />
          <circle cx="13" cy="-6" r="5" fill="#3f4d40" />
          <circle cx="-11" cy="-8" r="1.5" fill="#fff" />
          <circle cx="15" cy="-8" r="1.5" fill="#fff" />
          {/* Beak */}
          <polygon points="0,0 -4,-8 4,-8" fill="#d8964e" />
        </>
      )}

      {kind === "squirrel" && (
        <>
          {/* Pointy ears with tufts */}
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
          {/* Triangular cat ears */}
          <polygon points="-27,-15 -25,-44 -5,-22" fill={fur} />
          <polygon points="27,-15 25,-44 5,-22" fill={fur} />
          <polygon points="-23,-18 -22,-38 -8,-24" fill="#deb09d" />
          <polygon points="23,-18 22,-38 8,-24" fill="#deb09d" />
          <ellipse cy="-1" rx="31" ry="28" fill={fur} />
          <ellipse cy="10" rx="15" ry="11" fill="#fcedda" />
          {/* Whiskers */}
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
          {/* Floppy dog ears */}
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
          {/* Round frog eye bumps */}
          <circle cx="-16" cy="-25" r="14" fill={fur} />
          <circle cx="16" cy="-25" r="14" fill={fur} />
          <circle cx="-16" cy="-25" r="7" fill="#f2f5de" />
          <circle cx="16" cy="-25" r="7" fill="#f2f5de" />
          <ellipse cy="-2" rx="34" ry="26" fill={fur} />
          <ellipse cy="8" rx="20" ry="12" fill="#d9eabf" />
        </>
      )}

      {kind === "badger" && (
        <>
          <circle cx="-24" cy="-22" r="11" fill="#3f453d" />
          <circle cx="24" cy="-22" r="11" fill="#3f453d" />
          <circle cy="-1" r="32" fill="#f0ede6" />
          {/* Badger dark eye stripes */}
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
          {/* Cute deer antlers */}
          <path
            d="M-15-28L-22-48M-22-42L-30-48M15-28L22-48M22-42L30-48"
            stroke="#7e5d3c"
            strokeWidth="3"
            strokeLinecap="round"
          />
          {/* Ears */}
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
          {/* White spots */}
          <circle cx="-12" cy="-12" r="2" fill="#fff" opacity=".8" />
          <circle cx="12" cy="-12" r="2" fill="#fff" opacity=".8" />
        </>
      )}

      {/* Eyes & Nose (for non-owl animals) */}
      {kind !== "owl" && (
        <>
          <g fill="#3f4d40">
            <ellipse cx="-11" cy="-4" rx="2.5" ry="3" />
            <ellipse cx="11" cy="-4" rx="2.5" ry="3" />
          </g>
          {/* Cute rosy cheeks */}
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
          <path d="M-4 7q4-3 8 0 0 6-4 6-4 0-4-6" fill="#495043" />
          {/* Mouth */}
          <path
            d="M0 13v4m-7-1q3 6 7 1 4 5 7-1"
            stroke="#655c4b"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
          />
        </>
      )}

      {/* Clothes / Scarf */}
      <path
        d="M-23 28q24 9 46 0l-2 11q-21 6-42 0Z"
        fill={
          kind === "rabbit" || kind === "frog"
            ? "#a3b8a1"
            : kind === "fox" || kind === "squirrel"
              ? "#799fa3"
              : "#bf8869"
        }
      />

      {/* Conductor Cap (if driver) */}
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
