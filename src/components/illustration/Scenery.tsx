import { memo } from "react";
import type { Landscape } from "../../game";

export function Cloud({
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
    <g transform={`translate(${x} ${y}) scale(${scale})`} className="sky-cloud">
      <path
        className="cloud"
        style={{ animationDelay: delay }}
        d="M0 35C-9 21 3 5 20 9 25-13 58-15 69 6c16-9 36 2 35 18 22-2 29 23 8 26H9C-6 50-9 40 0 35Z"
        fill="var(--cloud, #fffcf3)"
      />
    </g>
  );
}

export function Pine({
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

export function Tree({
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

function BirchTree({
  x,
  y,
  scale = 1,
}: {
  x: number;
  y: number;
  scale?: number;
}) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      {/* Crown */}
      <path
        d="M0-195c-38 0-65 45-68 85-3 42 22 75 68 75s71-33 68-75c-3-40-30-85-68-85Z"
        fill="#c8d697"
      />
      <path
        d="M-15-175c-25 0-48 30-45 60 3 30 22 55 45 55s45-25 45-55c0-30-20-60-45-60Z"
        fill="#dfd68a"
        opacity=".65"
      />
      {/* White birch trunk */}
      <path
        d="M-5-110L-3 10M5-110L3 10"
        stroke="#fbfaf5"
        strokeWidth="8"
        strokeLinecap="round"
      />
      {/* Black bark notches */}
      <path
        d="M-7-80h8M-5-50h7M-8-20h9M-6 0h7"
        stroke="#596355"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* Leaves details */}
      <circle cx="-25" cy="-120" r="4" fill="#f7f2b5" />
      <circle cx="28" cy="-135" r="5" fill="#f7f2b5" />
      <circle cx="5" cy="-165" r="4.5" fill="#f7f2b5" />
    </g>
  );
}

function Windmill({
  x,
  y,
  scale = 1,
}: {
  x: number;
  y: number;
  scale?: number;
}) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <path d="M-28 0L-16-90h32L28 0Z" fill="#cfbba0" />
      <path d="M-22-90L0-118l22 28Z" fill="#a47863" />
      <circle cx="0" cy="-65" r="6" fill="#67735f" />
      {/* Sails */}
      <g stroke="#7b6754" strokeWidth="3" strokeLinecap="round">
        <path d="M0-65L0-125M0-65L0-5M0-65L-60-65M0-65L60-65" />
        <rect
          x="3"
          y="-120"
          width="12"
          height="45"
          fill="#f5eedb"
          opacity=".8"
        />
        <rect
          x="-15"
          y="-50"
          width="12"
          height="45"
          fill="#f5eedb"
          opacity=".8"
        />
        <rect
          x="-55"
          y="-77"
          width="45"
          height="12"
          fill="#f5eedb"
          opacity=".8"
        />
        <rect
          x="10"
          y="-60"
          width="45"
          height="12"
          fill="#f5eedb"
          opacity=".8"
        />
      </g>
    </g>
  );
}

function Sailboat({
  x,
  y,
  scale = 1,
}: {
  x: number;
  y: number;
  scale?: number;
}) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      {/* Boat hull */}
      <path d="M-35 0C-28 16 28 16 35 0Z" fill="#ba8063" />
      <path d="M-33 0h66" stroke="#94624a" strokeWidth="2.5" />
      {/* Mast & Sails */}
      <path
        d="M0 0V-48"
        stroke="#715b49"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path d="M2-44L28-8H2Z" fill="#f7f2dc" />
      <path d="M-2-40L-22-10H-2Z" fill="#dfbe97" />
      {/* Water ripple */}
      <ellipse cx="0" cy="8" rx="42" ry="4" fill="#a8c7c9" opacity=".5" />
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
            fill="var(--window, #f7e8bb)"
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

export const Scenery = memo(function Scenery({
  landscape,
  active,
  leaving = false,
}: {
  landscape: Landscape;
  active: boolean;
  leaving?: boolean;
}) {
  return (
    <g
      className={`scenery scenery--${landscape} ${active ? "scenery--active" : ""} ${leaving ? "scenery--leaving" : ""}`}
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
      {landscape === "river" && (
        <>
          {/* Gentle distant water hills */}
          <path
            d="M-100 330C160 250 380 280 600 310s490-80 750-30 290 20 400 30v290H-100Z"
            fill="#c0d4cf"
          />
          {/* River water body */}
          <path
            d="M-100 375c320-30 550 40 820 15s520-45 780-10 200 20 300 20v240H-100Z"
            fill="#a6c8c7"
          />
          <path
            d="M0 405q400-25 800 10t800-20M0 435q400 20 800-15t800 15"
            stroke="#d4e8e5"
            strokeWidth="5"
            fill="none"
            opacity=".65"
          />
          {/* River bank, trees & boat */}
          <Sailboat x={1120} y={380} scale={0.75} />
          <Tree x={880} y={360} scale={0.65} color="#89ab92" variant={1} />
          <Tree x={1320} y={365} scale={0.72} color="#7fa38a" />
          {/* Reeds */}
          <g stroke="#6e8a71" strokeWidth="3" strokeLinecap="round">
            <path d="M720 410l-6-35M725 410l2-40M731 410l8-32M1240 405l-5-30M1246 405l3-35" />
          </g>
          <Birds x={860} y={150} scale={0.8} />
        </>
      )}
      {landscape === "birch" && (
        <>
          <path
            d="M-100 330c250-70 500-20 740 20s480-60 720-30 280 20 340 30v290H-100Z"
            fill="#cfdab7"
          />
          <path
            d="M-100 390c290-40 540 10 780-15s480-40 720-10 240 25 300 25v250H-100Z"
            fill="#bac99f"
          />
          {/* Birch grove */}
          <BirchTree x={760} y={365} scale={0.65} />
          <BirchTree x={870} y={360} scale={0.55} />
          <BirchTree x={990} y={375} scale={0.75} />
          <BirchTree x={1120} y={360} scale={0.6} />
          <BirchTree x={1260} y={370} scale={0.8} />
          <BirchTree x={1390} y={365} scale={0.68} />
          <Birds x={820} y={145} scale={0.75} />
        </>
      )}
      {landscape === "snow_village" && (
        <>
          {/* Snow covered hills */}
          <path
            d="M-100 320c240-60 480 30 720 0s480-60 720-20 280 25 360 30v310H-100Z"
            fill="#dbe4e6"
          />
          <path
            d="M-100 380c280-40 520 20 760-10s480-40 720 0 240 20 320 20v250H-100Z"
            fill="#eaf0f2"
          />
          {/* Frosted pines & snowy cottage */}
          <Pine x={820} y={360} scale={0.75} color="#87a098" />
          <Pine x={930} y={365} scale={0.55} color="#9cb5ad" />
          <Cottage x={1080} y={345} scale={0.62} color="#e5ded2" />
          <Pine x={1240} y={360} scale={0.82} color="#789189" />
          <Pine x={1370} y={375} scale={0.68} color="#8ba59d" />
          {/* Soft snowdrifts on ground */}
          <ellipse cx="1080" cy="350" rx="95" ry="12" fill="#f8fcfe" />
        </>
      )}
      {landscape === "meadow" && (
        <>
          <path
            d="M-100 325c260-60 520 20 760 0s460-60 700-15 280 20 340 25v305H-100Z"
            fill="#d4dfb9"
          />
          <path
            d="M-100 385c270-40 520 15 760-15s470-35 710 0 260 20 330 20v250H-100Z"
            fill="#c0ce9e"
          />
          <Windmill x={1080} y={350} scale={0.62} />
          <Tree x={860} y={365} scale={0.6} color="#96ae84" />
          <Tree x={1320} y={370} scale={0.68} color="#8aa277" />
          {/* Wildflowers */}
          {[920, 960, 1000, 1180, 1220, 1260].map((fx, i) => (
            <circle
              key={fx}
              cx={fx}
              cy={390 + (i % 3) * 6}
              r={3.5}
              fill={i % 2 === 0 ? "#f9dd85" : "#e8a4a4"}
            />
          ))}
          <Birds x={800} y={140} scale={0.75} />
        </>
      )}
    </g>
  );
});
