import type { CSSProperties } from "react";
import {
  ANIMALS,
  STOPS,
  type AnimalKind,
  type JourneyState,
  type Landscape,
} from "../game";

function Cloud({
  x,
  y,
  scale = 1,
  delay = "0s",
}: {
  x: number;
  y: number;
  scale?: number;
  delay?: string;
}) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <path
        className="cloud"
        style={{ animationDelay: delay }}
        d="M0 35C-9 21 3 5 20 9 25-13 58-15 69 6c16-9 36 2 35 18 22-2 29 23 8 26H9C-6 50-9 40 0 35Z"
        fill="#fffcf3"
      />
    </g>
  );
}

function Pine({
  x,
  y,
  scale = 1,
  color = "#648a71",
}: {
  x: number;
  y: number;
  scale?: number;
  color?: string;
}) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <path
        d="M0-125v130"
        stroke="#777c58"
        strokeWidth="9"
        strokeLinecap="round"
      />
      <path
        d="m0-155-35 59h17l-32 50h23L-63 9Q0 26 63 9L27-46h23L18-96h17Z"
        fill={color}
      />
      <path
        d="M0-119V5m0-66 20 21M0-27l-24-19M0-79l-16-16"
        stroke="#f1f0d8"
        strokeWidth="2"
        strokeLinecap="round"
        opacity=".22"
      />
    </g>
  );
}

function Tree({
  x,
  y,
  scale = 1,
  color = "#8da982",
  variant = 0,
}: {
  x: number;
  y: number;
  scale?: number;
  color?: string;
  variant?: number;
}) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      {variant === 0 ? (
        <path
          d="M-3-160c-43-9-76 21-66 54-35 27-20 74 18 78C-22 0 27-5 39-26 86-19 102-69 73-92c12-40-28-75-76-68Z"
          fill={color}
        />
      ) : (
        <path
          d="M0-187c-32 0-60 69-65 112-9 62 16 78 65 77s77-19 65-77C55-122 33-187 0-187Z"
          fill={color}
        />
      )}
      <path
        d="M0-112V7m0-48-28-30M0-65l28-25M0-19l21-23"
        stroke="#738064"
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="m-40-104 8-9m72 43 8-9m-52-62 8-9"
        stroke="#eef0d7"
        strokeWidth="3"
        strokeLinecap="round"
        opacity=".35"
      />
    </g>
  );
}

function Cottage({
  x,
  y,
  scale = 1,
  color = "#e4c6a0",
}: {
  x: number;
  y: number;
  scale?: number;
  color?: string;
}) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <rect x="-57" y="-77" width="114" height="77" rx="2" fill={color} />
      <path d="M-70-75 0-133 70-75Z" fill="#b78268" />
      <path d="M33-109v-32h13v42" fill="#b78268" />
      <path
        d="M-66-75H65"
        stroke="#976e59"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path d="M-11 0v-43a11 11 0 0 1 22 0V0" fill="#9ca38a" />
      {[-36, 34].map((wx) => (
        <g key={wx}>
          <rect
            x={wx - 10}
            y="-55"
            width="20"
            height="24"
            rx="2"
            fill="#f7e8bb"
          />
          <path d={`M${wx}-55v24m-10-12h20`} stroke="#b5ac8c" strokeWidth="2" />
        </g>
      ))}
      <path
        d="M-63 0H63"
        stroke="#b8b896"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </g>
  );
}

function Birds({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return (
    <g
      transform={`translate(${x} ${y}) scale(${scale})`}
      stroke="#84988a"
      strokeWidth="2.4"
      strokeLinecap="round"
      fill="none"
    >
      <path d="M0 0q9-9 18 0 9-9 18 0M48-17q7-7 14 0 7-7 14 0" />
    </g>
  );
}

function Scenery({
  landscape,
  active,
}: {
  landscape: Landscape;
  active: boolean;
}) {
  return (
    <g
      className={`scenery scenery--${landscape} ${active ? "scenery--active" : ""}`}
    >
      {landscape === "home" && (
        <>
          <path
            d="M740 299 1038 84q16-12 30 0l168 119 116-93q15-11 29 4l281 231Z"
            fill="#d7e2d7"
          />
          <path
            d="m1003 110 35-26q16-12 30 0l45 32-28-7-24 12-27-18Z"
            fill="#f8f5e8"
          />
          <path
            d="M-100 323C128 181 279 218 475 292S850 248 1011 288s328-68 689 0v256H-100Z"
            fill="#cadaca"
          />
          <path
            d="M-100 373C160 296 334 290 566 348s490-97 724-34 297 23 410 0v240H-100Z"
            fill="#b4c9b0"
          />
          <Cottage x={1033} y={335} scale={0.49} />
          <Pine x={952} y={328} scale={0.41} color="#93ad94" />
          <Pine x={991} y={329} scale={0.27} color="#8da78b" />
          <Tree x={1111} y={337} scale={0.4} color="#9bb18c" />
          <path
            d="M1036 336c-80 15-46 45-108 58s-58 31-105 51"
            fill="none"
            stroke="#e4dfbb"
            strokeWidth="15"
          />
          <Birds x={785} y={140} scale={0.75} />
        </>
      )}
      {landscape === "forest" && (
        <>
          <path
            d="M-100 348C157 211 359 234 530 286S836 164 1074 251s366-6 626 23v276H-100Z"
            fill="#c5d6c9"
          />
          {[
            55, 148, 239, 362, 443, 581, 730, 827, 951, 1087, 1217, 1374, 1510,
            1643,
          ].map((x, i) => (
            <Pine
              key={x}
              x={x}
              y={362 + (i % 3) * 13}
              scale={0.63 + (i % 4) * 0.13}
              color={i % 2 ? "#94b29c" : "#a8bfaa"}
            />
          ))}
          <path
            d="M-100 420c217-80 431-54 677-23s472-44 650-37 289 30 473 22v168H-100Z"
            fill="#abc2a8"
          />
          <Tree x={980} y={405} scale={0.78} color="#8fa885" />
          <Pine x={1080} y={405} scale={0.85} color="#789a80" />
          <Pine x={1482} y={416} scale={1.18} color="#789a80" />
          <Birds x={750} y={146} scale={0.7} />
        </>
      )}
      {landscape === "village" && (
        <>
          <path
            d="M-100 330C108 246 304 200 535 282s493-102 762-26 360 17 403 18v276H-100Z"
            fill="#d3dcc0"
          />
          <path
            d="M-100 381c290-72 512-36 722-3s472-77 740-50 299 37 338 40v182H-100Z"
            fill="#bfcba5"
          />
          <path
            d="M578 353q272-77 466-30M635 376q231-65 448-30M743 396q196-52 362-22"
            stroke="#e1d6a4"
            strokeWidth="12"
            fill="none"
          />
          <Cottage x={1017} y={302} scale={0.69} />
          <Cottage x={1144} y={324} scale={0.48} color="#e9d7b0" />
          <Cottage x={1269} y={311} scale={0.65} color="#e5d6b6" />
          <Tree x={923} y={311} scale={0.46} color="#a3b18b" />
          <Tree x={1353} y={337} scale={0.58} color="#9eb18a" />
          <g stroke="#eae6cc" strokeWidth="4" fill="none">
            <path d="M942 343h380m-380 13h380" />
            {Array.from({ length: 20 }, (_, i) => (
              <path key={i} d={`M${949 + i * 19} 334v30`} />
            ))}
          </g>
          <Birds x={821} y={140} scale={0.75} />
        </>
      )}
      {landscape === "mountains" && (
        <>
          <path
            d="M-100 384 141 141q16-15 31 1l178 192 187-175q14-14 29 0L832 427Z"
            fill="#d0dbd4"
          />
          <path
            d="m83 202 58-61q16-15 31 1l57 61-37-10-30 16-36-21Z"
            fill="#f5f2e6"
          />
          <path
            d="M499 399 858 48q14-15 29 0l218 244 128-137q16-18 34 1l383 281Z"
            fill="#b4c8bf"
          />
          <path
            d="m789 115 69-67q14-15 29 0l69 78-40-8-42 18-38-33Z"
            fill="#f8f5e9"
          />
          <path
            d="m1196 194 37-39q16-18 34 1l60 44-42-7-26 12-29-21Z"
            fill="#f5f2e8"
          />
          <path
            d="M-100 409C239 291 433 359 668 378s413-83 648-30 277 25 384 33v169H-100Z"
            fill="#aabfa7"
          />
          <Cottage x={1106} y={378} scale={0.47} color="#bcaa88" />
          <Pine x={1024} y={384} scale={0.7} color="#7f9c82" />
          <Pine x={1180} y={390} scale={0.61} color="#7b9980" />
          <Pine x={1230} y={399} scale={0.85} color="#8ba28a" />
        </>
      )}
    </g>
  );
}

function Animal({
  kind,
  conductor = false,
  waving = true,
}: {
  kind: AnimalKind;
  conductor?: boolean;
  waving?: boolean;
}) {
  const fur =
    kind === "rabbit" ? "#f1e9d5" : kind === "fox" ? "#c78a58" : "#b79368";
  return (
    <g className={`animal animal--${kind}`}>
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
          stroke="#e1c6a8"
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
      <g fill="#3f4d40">
        <ellipse cx="-11" cy="-4" rx="2.5" ry="3" />
        <ellipse cx="11" cy="-4" rx="2.5" ry="3" />
      </g>
      <ellipse cx="-20" cy="7" rx="6" ry="3.5" fill="#cf9f89" opacity=".55" />
      <ellipse cx="20" cy="7" rx="6" ry="3.5" fill="#cf9f89" opacity=".55" />
      <path d="M-4 7q4-3 8 0 0 6-4 6-4 0-4-6" fill="#495043" />
      <path
        d="M0 13v4m-7-1q3 6 7 1 4 5 7-1"
        stroke="#655c4b"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M-23 28q24 9 46 0l-2 11q-21 6-42 0Z"
        fill={
          kind === "rabbit" ? "#a3b8a1" : kind === "fox" ? "#91aaa5" : "#bf8869"
        }
      />
      <path
        d="m12 35 7 19 9-5-9-17"
        fill={
          kind === "rabbit" ? "#a3b8a1" : kind === "fox" ? "#91aaa5" : "#bf8869"
        }
      />
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

function Wheel({
  x,
  y,
  radius = 25,
}: {
  x: number;
  y: number;
  radius?: number;
}) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className="wheel-spin">
        <circle r={radius} fill="#3f5b4c" />
        <circle r={radius - 5} fill="#d8d2ae" />
        <circle r={radius - 10} fill="#71806a" />
        {Array.from({ length: 8 }, (_, i) => (
          <path
            key={i}
            d={`M0 0V-${radius - 6}`}
            transform={`rotate(${i * 45})`}
            stroke="#ded6b4"
            strokeWidth="3.5"
          />
        ))}
        <circle r="7" fill="#3f5b4c" />
        <circle r="3" fill="#c4bb95" />
      </g>
    </g>
  );
}

function Carriage({
  index,
  journey,
}: {
  index: number;
  journey: JourneyState;
}) {
  const x = 766 + index * 226;
  const colors = [
    { body: "#dfbc70", shade: "#c5a45e", roof: "#5b7460" },
    { body: "#a5bbae", shade: "#829f8d", roof: "#526d5d" },
    { body: "#d4a38c", shade: "#b98672", roof: "#65765d" },
  ][index];
  const onboard = index < journey.passengers;
  const justBoarded =
    journey.phase === "boarding" && index === journey.passengers - 1;
  return (
    <g transform={`translate(${x} 0)`}>
      <defs>
        <clipPath id={`carriage-window-${index}`}>
          <rect x="23" y="354" width="154" height="81" rx="9" />
        </clipPath>
      </defs>
      <path
        d="M-17 465H9m183 0h35"
        stroke="#66705b"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <rect x="0" y="346" width="200" height="124" rx="9" fill={colors.body} />
      <path d="M0 351h200v11H0Z" fill="#f9f0d3" opacity=".32" />
      <rect x="21" y="356" width="158" height="79" rx="10" fill="#e4e6ce" />
      <rect x="26" y="361" width="148" height="69" rx="6" fill="#c8d7c5" />
      <path d="M30 423q48-32 87-14t57-1v23H30Z" fill="#b1c6ac" opacity=".8" />
      <g clipPath={`url(#carriage-window-${index})`}>
        {onboard && (
          <g transform="translate(78 397) scale(.71)">
            <g
              className={`passenger ${justBoarded ? "passenger--boarding" : ""} ${journey.phase === "unboarding" ? "passenger--leaving" : ""}`}
              style={
                { "--passenger-delay": `${index * 0.3}s` } as CSSProperties
              }
            >
              <Animal kind={ANIMALS[index].kind} />
            </g>
          </g>
        )}
        <path d="M157 360v71" stroke="#e7e7cb" strokeWidth="3" opacity=".7" />
      </g>
      <path d="M118 356v78" stroke={colors.body} strokeWidth="8" />
      <rect
        x="21"
        y="356"
        width="158"
        height="79"
        rx="10"
        fill="none"
        stroke={colors.shade}
        strokeWidth="2"
      />
      <path
        d="M10 444h180M10 451h180"
        stroke={colors.shade}
        strokeWidth="1"
        opacity=".65"
      />
      {[27, 59, 91, 123, 155, 183].map((px) => (
        <path
          key={px}
          d={`M${px} 446v17`}
          stroke={colors.shade}
          strokeWidth="1"
          opacity=".45"
        />
      ))}
      <path
        d="M8 466h184"
        stroke={colors.shade}
        strokeWidth="10"
        strokeLinecap="round"
      />
      <rect
        x="-10"
        y="331"
        width="220"
        height="23"
        rx="11"
        fill={colors.roof}
      />
      <path
        d="M-1 338h201"
        stroke="#e3e2c8"
        strokeWidth="2"
        opacity=".28"
        strokeLinecap="round"
      />
      <Wheel x={43} y={481} radius={25} />
      <Wheel x={158} y={481} radius={25} />
      <path
        d="M30 448h13m128 0h8"
        stroke="#f4e6c2"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity=".7"
      />
    </g>
  );
}

function Locomotive() {
  return (
    <g className="locomotive">
      <g className="steam" fill="#fffcf3">
        <g className="steam-puff steam-puff--one">
          <circle cx="506" cy="294" r="16" />
          <circle cx="490" cy="286" r="13" />
          <circle cx="519" cy="281" r="13" />
        </g>
        <g className="steam-puff steam-puff--two">
          <circle cx="484" cy="254" r="23" />
          <circle cx="463" cy="247" r="18" />
          <circle cx="498" cy="240" r="18" />
        </g>
        <g className="steam-puff steam-puff--three">
          <circle cx="451" cy="207" r="27" />
          <circle cx="426" cy="200" r="20" />
          <circle cx="469" cy="188" r="23" />
        </g>
      </g>
      <path
        d="M731 463h40"
        stroke="#67745b"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <path d="m450 447-25 36h58v-36Z" fill="#7b8870" />
      <path
        d="m440 461-10 16m20-16-8 16m18-16-7 16"
        stroke="#c5c6a2"
        strokeWidth="2"
      />
      <rect x="453" y="378" width="190" height="74" rx="29" fill="#b96f52" />
      <path d="M479 383h132q15 0 24 14H469q3-9 10-14Z" fill="#cc8d68" />
      <rect x="453" y="392" width="20" height="52" rx="7" fill="#4b6755" />
      <path d="M474 413h160" stroke="#e4b584" strokeWidth="4" />
      <path d="M482 422h147" stroke="#a86049" strokeWidth="2" />
      <path d="M491 379v-61h30v61" fill="#4e6754" />
      <path d="m489 324-8-16h50l-8 16Z" fill="#4a6251" />
      <path d="M491 322h30" stroke="#d2ac70" strokeWidth="4" />
      <path d="M563 382v-14q0-18 18-18t18 18v14" fill="#bb7856" />
      <path d="M562 373h38" stroke="#d8a773" strokeWidth="3" />
      <rect x="626" y="333" width="111" height="119" rx="7" fill="#ba7457" />
      <path d="M634 341h94v104h-94Z" fill="#c48260" />
      <rect x="646" y="346" width="66" height="77" rx="11" fill="#3e5b4d" />
      <rect x="651" y="350" width="56" height="68" rx="8" fill="#d4dec8" />
      <defs>
        <clipPath id="driver-window">
          <rect x="650" y="349" width="58" height="71" rx="8" />
        </clipPath>
      </defs>
      <g clipPath="url(#driver-window)">
        <g transform="translate(680 388) scale(.65)">
          <Animal kind="bear" conductor waving={false} />
        </g>
      </g>
      <path
        d="M642 425h76"
        stroke="#dfa77a"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path d="M618 328q58-13 124 0l8 10H613Z" fill="#405e4e" />
      <path
        d="M624 328q54-9 112 0"
        stroke="#80917a"
        strokeWidth="2"
        fill="none"
      />
      <rect x="452" y="447" width="291" height="22" rx="6" fill="#405d4b" />
      <path d="M459 450h274" stroke="#b9b58d" strokeWidth="3" />
      <rect x="438" y="430" width="20" height="12" rx="5" fill="#536c56" />
      <circle cx="450" cy="399" r="9" fill="#f5d49a" />
      <circle cx="450" cy="399" r="5" fill="#fff0c3" />
      <ellipse cx="550" cy="435" rx="17" ry="9" fill="#eed9ac" />
      <text
        x="550"
        y="439"
        textAnchor="middle"
        fill="#7b654d"
        fontFamily="Fraunces, serif"
        fontSize="13"
      >
        A
      </text>
      <Wheel x={494} y={479} radius={27} />
      <Wheel x={580} y={473} radius={34} />
      <Wheel x={689} y={476} radius={30} />
      <path
        className="piston"
        d="M493 478h197"
        stroke="#bdba95"
        strokeWidth="8"
        strokeLinecap="round"
      />
      <path
        className="piston"
        d="M493 477h197"
        stroke="#e1d6ad"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx="494" cy="478" r="4" fill="#596952" />
      <circle cx="580" cy="478" r="4" fill="#596952" />
      <circle cx="689" cy="478" r="4" fill="#596952" />
      <path
        d="M725 448v27h25"
        stroke="#536950"
        strokeWidth="5"
        fill="none"
        strokeLinecap="round"
      />
    </g>
  );
}

function Station({ journey }: { journey: JourneyState }) {
  const { phase, stop } = journey;
  if (phase === "travelling" || phase === "touring") return null;
  const arriving = phase === "arriving" || phase === "returning";
  const departing = phase === "departing";
  const roof = ["#ad8065", "#7a9475", "#bc8b69", "#8e8470"][stop];
  const walls = ["#e9d6b0", "#d8d7b5", "#e8cf9e", "#cbb995"][stop];
  return (
    <g
      key={`${stop}-${departing ? "depart" : "current"}`}
      className={`station ${arriving ? "station--arriving" : ""} ${departing ? "station--departing" : ""}`}
    >
      <ellipse
        cx="275"
        cy="479"
        rx="190"
        ry="10"
        fill="#8d9c77"
        opacity=".15"
      />
      <rect x="120" y="466" width="311" height="14" rx="4" fill="#b9b79a" />
      <path d="M124 467h303" stroke="#e3ddba" strokeWidth="3" />
      <rect x="181" y="328" width="173" height="138" rx="3" fill={walls} />
      {Array.from({ length: 10 }, (_, i) => (
        <path
          key={i}
          d={`M${190 + i * 17} 337v125`}
          stroke="#baa883"
          strokeWidth="1"
          opacity=".3"
        />
      ))}
      <path d="M160 337 258 263q10-8 20 0l99 74Z" fill={roof} />
      <path
        d="m169 337 96-66q4-3 8 0l94 66"
        stroke="#f0dfb9"
        strokeWidth="3"
        fill="none"
        opacity=".55"
      />
      <path
        d="M162 337h212"
        stroke="#856e52"
        strokeWidth="7"
        strokeLinecap="round"
      />
      <path d="M244 467v-66q0-22 22-22t22 22v66" fill="#859481" />
      <path d="M250 460v-58q0-17 16-17t16 17v58" fill="#718574" />
      <path d="M253 409v-8q0-14 13-14t13 14v8Z" fill="#d3d8b8" />
      <path d="M266 387v22m-14-9h28" stroke="#83917a" strokeWidth="2" />
      <circle cx="278" cy="435" r="2.5" fill="#dec78e" />
      {[207, 325].map((x) => (
        <g key={x}>
          <rect
            x={x - 15}
            y="379"
            width="31"
            height="40"
            rx="3"
            fill="#859481"
          />
          <rect
            x={x - 11}
            y="383"
            width="23"
            height="32"
            rx="1"
            fill="#e5dfb4"
          />
          <path d={`M${x} 383v32m-11-16h23`} stroke="#97a08a" strokeWidth="2" />
          <path
            d={`M${x - 19} 423h39`}
            stroke="#a99e77"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </g>
      ))}
      <rect x="188" y="344" width="159" height="27" rx="4" fill="#607663" />
      <path
        d="M193 348h149v19H193Z"
        stroke="#b7c19b"
        strokeWidth=".8"
        fill="none"
        opacity=".65"
      />
      <text
        x="267.5"
        y="362"
        textAnchor="middle"
        fill="#f4edd5"
        fontFamily="DM Sans, sans-serif"
        fontSize="11.5"
        fontWeight="500"
        letterSpacing="1.1"
      >
        {STOPS[stop].name.toLocaleUpperCase("pl")}
      </text>
      <circle
        cx="267"
        cy="310"
        r="15"
        fill="#f4ebcf"
        stroke="#b39870"
        strokeWidth="2"
      />
      <circle
        cx="267"
        cy="310"
        r="11.5"
        fill="none"
        stroke="#d6c8a6"
        strokeWidth=".7"
      />
      <path
        d="M267 300v10l6 4"
        stroke="#6d795f"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="267" cy="310" r="1.7" fill="#6d795f" />
      <path d="M143 464V345" stroke="#61705a" strokeWidth="5" />
      <path
        d="M135 343h17l-2-26h-13Z"
        fill="#e7d8ac"
        stroke="#61705a"
        strokeWidth="2.5"
      />
      <path d="m133 316 10-9 11 9Z" fill="#61705a" />
      <path
        d="M365 445h53m-48-12v28m42-28v28m-43-24h45"
        stroke="#8d8c68"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path d="M157 467h17l3-24h-23Z" fill="#bd9370" />
      <path
        d="M165 446v-25m0 15q-17-1-14-12 14-1 14 12m0-7q12-1 12-11-11-1-12 11"
        fill="#8d9f78"
        stroke="#7e936a"
        strokeWidth="1.5"
      />
      {stop > 0 && (phase === "arriving" || phase === "boarding") && (
        <g transform="translate(402 422) scale(.48)">
          <g
            className={
              phase === "boarding"
                ? "platform-friend platform-friend--boarding"
                : "platform-friend"
            }
          >
            <Animal kind={ANIMALS[stop - 1].kind} />
          </g>
        </g>
      )}
      <g transform="translate(316 280)">
        <path d="M-8 2q2-12 12-9 8 1 6 10l8 3-10 1q-9 9-16-5Z" fill="#6f8b76" />
        <path d="m-7 1-8-3 5 7" fill="#6f8b76" />
        <circle cx="7" cy="-2" r="1.1" fill="#f6ebcd" />
      </g>
    </g>
  );
}

function MeadowDetails() {
  return (
    <g>
      {[
        { x: 96, y: 544, s: 1.1 },
        { x: 1461, y: 558, s: 1.3 },
        { x: 1359, y: 525, s: 0.7 },
        { x: 268, y: 540, s: 0.8 },
      ].map(({ x, y, s }) => (
        <g key={x} transform={`translate(${x} ${y}) scale(${s})`}>
          <path
            d="M0 0q-3-19-11-23M0 0q0-25 7-35M2-2q9-15 18-14"
            fill="none"
            stroke="#9aa889"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M-8-18q-15 1-14-10 12-1 14 10M6-20q12-1 10-12-9 0-10 12M10-9q13 3 15-7-9-4-15 7"
            fill="#a8b495"
          />
        </g>
      ))}
      {[
        { x: 128, y: 531 },
        { x: 137, y: 544 },
        { x: 1407, y: 540 },
        { x: 1425, y: 531 },
      ].map(({ x, y }) => (
        <g key={x} transform={`translate(${x} ${y})`}>
          <path d="M0 0v-15" stroke="#9ca687" strokeWidth="2" />
          <g fill="#f2e6c3">
            <circle cy="-20" r="3.5" />
            <circle cx="-4" cy="-16" r="3.5" />
            <circle cx="4" cy="-16" r="3.5" />
            <circle cy="-12" r="3.5" />
          </g>
          <circle cy="-16" r="2.5" fill="#cfad64" />
        </g>
      ))}
      <g fill="#b2b896" opacity=".6">
        <ellipse cx="438" cy="535" rx="10" ry="2.5" />
        <ellipse cx="1094" cy="544" rx="7" ry="2" />
        <ellipse cx="1185" cy="529" rx="9" ry="2" />
        <ellipse cx="329" cy="554" rx="6" ry="2" />
      </g>
    </g>
  );
}

export function Illustration({
  journey,
  landscape,
}: {
  journey: JourneyState;
  landscape: Landscape;
}) {
  return (
    <svg
      className="world-illustration"
      viewBox="0 0 1600 640"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-labelledby="scene-title scene-description"
    >
      <title id="scene-title">{`Ma\u0142y poci\u0105g Artura: ${STOPS[journey.stop].name}`}</title>
      <desc id="scene-description">
        Pastelowa lokomotywa i trzy kolorowe wagoniki w spokojnym krajobrazie.
        Na kolejnych stacjach do poci&#261;gu wsiadaj&#261; kr&oacute;liczek,
        lisek i mi&#347;.
      </desc>
      <defs>
        <linearGradient id="ground-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#d1d5b4" />
          <stop offset=".55" stopColor="#e5e5cd" />
          <stop offset="1" stopColor="#f6f3e8" />
        </linearGradient>
        <clipPath id="scenery-clip">
          <path d="M-2000-800H3600V510H-2000Z" />
        </clipPath>
      </defs>
      <g className="sun" transform="translate(1320 104)">
        <circle r="47" fill="#eacb8c" opacity=".65" />
        <circle r="36" fill="#efd59e" />
        <g stroke="#dbc38e" strokeWidth="2" strokeLinecap="round" opacity=".6">
          {Array.from({ length: 12 }, (_, i) => (
            <path key={i} d="M0-59v-7" transform={`rotate(${i * 30})`} />
          ))}
        </g>
      </g>
      <Cloud x={95} y={101} scale={0.95} delay="-8s" />
      <Cloud x={1019} y={79} scale={0.88} delay="-23s" />
      <Cloud x={1456} y={197} scale={0.72} delay="-14s" />
      <g clipPath="url(#scenery-clip)">
        <Scenery landscape="home" active={landscape === "home"} />
        <Scenery landscape="forest" active={landscape === "forest"} />
        <Scenery landscape="village" active={landscape === "village"} />
        <Scenery landscape="mountains" active={landscape === "mountains"} />
      </g>
      <path
        d="M-100 430c268-51 403-12 676-14s440-47 683-13 309 22 441-5v242H-100Z"
        fill="url(#ground-fade)"
      />
      <path
        d="M-100 469q222-35 449-11t470-8 881 10"
        stroke="#b8c3a0"
        strokeWidth="1.2"
        fill="none"
        opacity=".5"
      />
      <g className="parallax-trees">
        {[-1600, 0, 1600].map((offset) => (
          <g key={offset} transform={`translate(${offset} 0)`}>
            <Tree x={37} y={459} scale={0.96} color="#94aa83" />
            <Tree x={-31} y={471} scale={1.08} color="#7d9b77" variant={1} />
            <Pine x={1498} y={462} scale={1.11} color="#688a70" />
            <Pine x={1569} y={468} scale={1.42} color="#557c66" />
            <Pine x={1432} y={458} scale={0.73} color="#8ba27d" />
          </g>
        ))}
      </g>
      <Station journey={journey} />
      <g className="railway">
        <path
          d="M-20 508H1620"
          stroke="#bab49a"
          strokeWidth="20"
          opacity=".42"
        />
        <g className="rail-sleepers">
          {Array.from({ length: 44 }, (_, i) => (
            <path
              key={i}
              d={`M${i * 40 - 70} 501l13 17`}
              stroke="#a09b80"
              strokeWidth="8"
              strokeLinecap="round"
            />
          ))}
        </g>
        <path d="M-20 503H1620" stroke="#8e9680" strokeWidth="5" />
        <path d="M-20 501H1620" stroke="#d8d3b6" strokeWidth="2" />
        <path d="M-20 514H1620" stroke="#89937d" strokeWidth="4" />
        <path d="M-20 512H1620" stroke="#e4dfc5" strokeWidth="1.5" />
      </g>
      <ellipse cx="932" cy="505" rx="510" ry="9" fill="#53684d" opacity=".1" />
      <g className="train">
        {[2, 1, 0].map((index) => (
          <Carriage key={index} index={index} journey={journey} />
        ))}
        <Locomotive />
      </g>
      <MeadowDetails />
      <path
        d="M-100 601q399-21 856 2t944-8v45H-100Z"
        fill="#f6f3e8"
        opacity=".6"
      />
    </svg>
  );
}
