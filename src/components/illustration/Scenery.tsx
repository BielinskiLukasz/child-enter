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
        fill="var(--foliage-b, #c8d697)"
      />
      <path
        d="M-15-175c-25 0-48 30-45 60 3 30 22 55 45 55s45-25 45-55c0-30-20-60-45-60Z"
        fill="var(--foliage-a, #dfd68a)"
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
      <circle cx="-25" cy="-120" r="4" fill="var(--blossom, #f7f2b5)" />
      <circle cx="28" cy="-135" r="5" fill="var(--blossom, #f7f2b5)" />
      <circle cx="5" cy="-165" r="4.5" fill="var(--blossom, #f7f2b5)" />
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

/** Low fruit tree with a seasonal crown and a few hanging fruits. */
function FruitTree({
  x,
  y,
  scale = 1,
  fruit = "#d98a72",
}: {
  x: number;
  y: number;
  scale?: number;
  fruit?: string;
}) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <path
        d="M0-72v76"
        stroke="#8a6b4d"
        strokeWidth="9"
        strokeLinecap="round"
      />
      <path
        d="M0-46l-22-20M0-38l24-18"
        stroke="#8a6b4d"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <path
        d="M0-132c-34 0-56 22-56 46s22 42 56 42 56-18 56-42-22-46-56-46Z"
        fill="var(--foliage-a, #93ab7c)"
      />
      <path
        d="M-20-118c-18 2-28 16-26 30 14 6 30-2 32-16-1-8-3-13-6-14Z"
        fill="var(--foliage-b, #a8bd8c)"
        opacity=".75"
      />
      {/* Fruits */}
      {[
        [-30, -96],
        [12, -104],
        [34, -84],
        [-8, -76],
        [22, -62],
      ].map(([fx, fy]) => (
        <g key={`${fx}-${fy}`}>
          <circle cx={fx} cy={fy} r="6" fill={fruit} />
          <circle cx={fx - 2} cy={fy - 2} r="1.6" fill="#fff" opacity=".45" />
        </g>
      ))}
    </g>
  );
}

/** One lavender bush: a mound of leaves with upright purple spikes. */
function LavenderBush({
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
      <path d="M-26 0q4-16 26-16t26 16Z" fill="var(--foliage-b, #9aa87f)" />
      {/* One spike = stem + head. The pale highlight was dropped to keep this
          the heaviest scene under a sane node budget. */}
      {[-20, -12, -4, 4, 12, 20].map((sx, i) => (
        <g key={sx}>
          <path
            d={`M${sx}-8v-${26 + (i % 3) * 9}`}
            stroke="#7f8c68"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <ellipse
            cx={sx}
            cy={-16 - (26 + (i % 3) * 9)}
            rx="4.2"
            ry={11 + (i % 3) * 3}
            fill={i % 2 ? "#9d8bc0" : "#8a7bb4"}
          />
        </g>
      ))}
    </g>
  );
}

/** Stone viaduct: piers, arches and a parapet the track runs along. */
function StoneBridge({
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
      {/* Arches cut out of the wall */}
      <path
        d="M-330 0v-96h660V0h-58v-4q0-46-46-46t-46 46v4h-58v-4q0-46-46-46t-46 46v4h-58v-4q0-46-46-46t-46 46v4h-58v-4q0-46-46-46t-46 46v4Z"
        fill="#c9c0ab"
      />
      <path d="M-330-96h660v14h-660Z" fill="#ded5bf" />
      <path d="M-330-82h660" stroke="#a99f89" strokeWidth="3" />
      {/* Voussoirs around each arch */}
      {[-238, -112, 14, 140].map((ax) => (
        <g key={ax}>
          <path
            d={`M${ax - 46}-4q0-46 46-46t46 46`}
            fill="none"
            stroke="#b3a891"
            strokeWidth="5"
          />
          {[-40, -26, -10, 8, 24, 38].map((vx) => (
            <path
              key={vx}
              d={`M${ax + vx * 0.85}-${-4 - Math.sqrt(Math.max(0, 2116 - vx * vx)) * 0.85}l${vx * 0.1} ${-6}`}
              stroke="#b8ad95"
              strokeWidth="2"
            />
          ))}
        </g>
      ))}
      {/* Parapet posts */}
      {Array.from({ length: 17 }, (_, i) => (
        <path
          key={i}
          d={`M${-320 + i * 40}-96v-13`}
          stroke="#cfc6b0"
          strokeWidth="7"
          strokeLinecap="round"
        />
      ))}
      <path
        d="M-330-112h660"
        stroke="#e6ddc7"
        strokeWidth="6"
        strokeLinecap="round"
      />
    </g>
  );
}

/** Wooden jetty out over still water. */
function Jetty({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <path d="M0 0h120v9H0Z" fill="#a5805c" />
      <path
        d="M4 9v34M112 9v34"
        stroke="#8a6a4a"
        strokeWidth="7"
        strokeLinecap="round"
      />
      <path d="M0 0h120" stroke="#c6a37c" strokeWidth="3" />
      <path d="M18 4h84" stroke="#8f6d4c" strokeWidth="2" opacity=".6" />
      {/* Mooring post and rope */}
      <path
        d="M126 2v-26"
        stroke="#8a6a4a"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <path
        d="M126-22q-16 8-30 20"
        stroke="#cbb894"
        strokeWidth="2.5"
        fill="none"
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
            fill="var(--hill-far, #cadaca)"
          />
          <path
            d="M-100 373C160 296 334 290 566 348s490-97 724-34 297 23 410 0v240H-100Z"
            fill="var(--hill-near, #b4c9b0)"
          />
          <Cottage x={1033} y={335} scale={0.49} />
          <Pine x={952} y={328} scale={0.41} color="var(--pine-a, #93ad94)" />
          <Pine x={991} y={329} scale={0.27} color="var(--pine-b, #8da78b)" />
          <Tree
            x={1111}
            y={337}
            scale={0.4}
            color="var(--foliage-a, #9bb18c)"
          />
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
            fill="var(--hill-far, #c5d6c9)"
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
              color={
                i % 2 ? "var(--pine-a, #94b29c)" : "var(--pine-b, #a8bfaa)"
              }
            />
          ))}
          <path
            d="M-100 420c217-80 431-54 677-23s472-44 650-37 289 30 473 22v168H-100Z"
            fill="var(--hill-near, #abc2a8)"
          />
          <Tree
            x={980}
            y={405}
            scale={0.78}
            color="var(--foliage-a, #8fa885)"
          />
          <Pine x={1080} y={405} scale={0.85} color="var(--pine-a, #789a80)" />
          <Pine x={1482} y={416} scale={1.18} color="var(--pine-a, #789a80)" />
          <Birds x={750} y={146} scale={0.7} />
        </>
      )}
      {landscape === "village" && (
        <>
          <path
            d="M-100 330C108 246 304 200 535 282s493-102 762-26 360 17 403 18v276H-100Z"
            fill="var(--hill-far, #d3dcc0)"
          />
          <path
            d="M-100 381c290-72 512-36 722-3s472-77 740-50 299 37 338 40v182H-100Z"
            fill="var(--hill-near, #bfcba5)"
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
          <Tree
            x={923}
            y={311}
            scale={0.46}
            color="var(--foliage-b, #a3b18b)"
          />
          <Tree
            x={1353}
            y={337}
            scale={0.58}
            color="var(--foliage-a, #9eb18a)"
          />
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
            fill="var(--hill-far, #d4dfb9)"
          />
          <path
            d="M-100 385c270-40 520 15 760-15s470-35 710 0 260 20 330 20v250H-100Z"
            fill="var(--hill-near, #c0ce9e)"
          />
          <Windmill x={1080} y={350} scale={0.62} />
          <Tree x={860} y={365} scale={0.6} color="var(--foliage-a, #96ae84)" />
          <Tree
            x={1320}
            y={370}
            scale={0.68}
            color="var(--foliage-b, #8aa277)"
          />
          {/* Wildflowers */}
          {[920, 960, 1000, 1180, 1220, 1260].map((fx, i) => (
            <circle
              key={fx}
              cx={fx}
              cy={390 + (i % 3) * 6}
              r={3.5}
              fill={i % 2 === 0 ? "var(--blossom, #f9dd85)" : "#e8a4a4"}
            />
          ))}
          <Birds x={800} y={140} scale={0.75} />
        </>
      )}
      {landscape === "orchard" && (
        <>
          {/* Low orchard hills */}
          <path
            d="M-100 322c250-52 520 16 760-6s470-52 700-12 280 22 340 26v310H-100Z"
            fill="var(--hill-far, #d2dcb8)"
          />
          <path
            d="M-100 384c280-38 520 14 762-14s470-34 706 2 262 20 332 20v248H-100Z"
            fill="var(--hill-near, #c2d0a0)"
          />
          {/* Two rows of fruit trees, further row smaller and paler */}
          <FruitTree x={700} y={352} scale={0.46} fruit="#e0a58c" />
          <FruitTree x={846} y={350} scale={0.42} fruit="#d9c27a" />
          <FruitTree x={992} y={353} scale={0.47} fruit="#e0a58c" />
          <FruitTree x={1140} y={350} scale={0.41} fruit="#cf8f76" />
          <FruitTree x={1286} y={354} scale={0.45} fruit="#d9c27a" />
          <FruitTree x={880} y={392} scale={0.66} fruit="#d9805f" />
          <FruitTree x={1064} y={396} scale={0.72} fruit="#e2b45c" />
          <FruitTree x={1252} y={392} scale={0.63} fruit="#d9805f" />
          {/* Ladder and harvest baskets */}
          <g stroke="#a3825c" strokeWidth="4" strokeLinecap="round">
            <path d="M1148 396v-58M1168 396v-58" />
            <path d="M1148 388h20M1148 372h20M1148 356h20M1148 344h20" />
          </g>
          {[
            [760, 402],
            [1180, 404],
          ].map(([bx, by]) => (
            <g key={bx} transform={`translate(${bx} ${by})`}>
              <path d="M-16 0h32l-4 20h-24Z" fill="#c39a6b" />
              <path d="M-16 0h32" stroke="#a67f52" strokeWidth="3" />
              <circle cx="-6" cy="-3" r="5" fill="#d9805f" />
              <circle cx="5" cy="-4" r="5" fill="#e2b45c" />
            </g>
          ))}
          <Birds x={820} y={142} scale={0.72} />
        </>
      )}
      {landscape === "lake" && (
        <>
          <path
            d="M-100 318c260-48 520 18 760-4s470-48 700-10 280 20 340 24v312H-100Z"
            fill="#c8d6d2"
          />
          {/* Still lake water */}
          <path
            d="M-100 372c300-24 560 26 820 10s520-32 780-6v264H-100Z"
            fill="#9fc4c6"
          />
          <path
            d="M-100 372c300-24 560 26 820 10s520-32 780-6v34H-100Z"
            fill="#b9d5d4"
            opacity=".55"
          />
          {/* Reflections of the far shore */}
          <path
            d="M120 402q150 12 300 2M560 410q170 10 330 0M1080 404q150 10 300 0"
            stroke="#dceceb"
            strokeWidth="4"
            fill="none"
            opacity=".5"
          />
          {/* Far shore trees */}
          <Tree x={250} y={352} scale={0.4} color="var(--foliage-a, #8ba88f)" />
          <Tree
            x={356}
            y={356}
            scale={0.34}
            color="var(--foliage-b, #9ab69a)"
            variant={1}
          />
          <Pine x={452} y={352} scale={0.4} color="#7f9c8c" />
          <Tree
            x={1420}
            y={356}
            scale={0.38}
            color="var(--foliage-a, #8ba88f)"
          />
          {/* Jetty, boat and lilies */}
          <Jetty x={980} y={392} scale={0.8} />
          <Sailboat x={1230} y={404} scale={0.6} />
          {[
            [700, 424],
            [760, 438],
            [880, 430],
            [1330, 436],
          ].map(([lx, ly]) => (
            <g key={lx} transform={`translate(${lx} ${ly})`}>
              <ellipse rx="15" ry="5" fill="#7fa37f" opacity=".85" />
              <path d="M0-1q9-6 13 1-6 5-13-1Z" fill="#93b58f" />
              {lx % 2 === 0 && <circle cx="4" cy="-4" r="3.4" fill="#f4e2ba" />}
            </g>
          ))}
          {/* Reeds */}
          <g stroke="#6e8a71" strokeWidth="3" strokeLinecap="round">
            <path d="M560 424l-6-38M566 424l2-44M573 424l9-34M1520 418l-5-32M1527 418l4-38" />
          </g>
          <Birds x={640} y={148} scale={0.7} />
        </>
      )}
      {landscape === "lavender" && (
        <>
          <path
            d="M-100 320c250-50 520 18 760-4s470-50 700-10 280 20 340 24v310H-100Z"
            fill="var(--hill-far, #d6d8c0)"
          />
          <path
            d="M-100 378c280-36 520 12 762-14s470-30 706 2 262 18 332 18v256H-100Z"
            fill="#cfc4b4"
          />
          {/* Perspective rows of lavender */}
          {[
            { y: 372, s: 0.3, o: 0.55 },
            { y: 388, s: 0.4, o: 0.7 },
            { y: 406, s: 0.52, o: 0.82 },
            { y: 426, s: 0.66, o: 0.92 },
            { y: 448, s: 0.82, o: 1 },
          ].map(({ y, s, o }, row) => (
            <g key={row} opacity={o}>
              {Array.from({ length: 9 }, (_, i) => (
                <LavenderBush
                  key={i}
                  x={-40 + i * 210 + row * 26}
                  y={y}
                  scale={s}
                />
              ))}
            </g>
          ))}
          {/* Stone field hut and a tall cypress */}
          <g transform="translate(1330 356) scale(.5)">
            <rect
              x="-52"
              y="-58"
              width="104"
              height="58"
              rx="3"
              fill="#cfc6b2"
            />
            <path d="M-64-56 0-104 64-56Z" fill="#9d8468" />
            <rect
              x="-16"
              y="-40"
              width="32"
              height="40"
              rx="2"
              fill="#8d8471"
            />
            <rect
              x="-46"
              y="-46"
              width="20"
              height="18"
              rx="2"
              fill="var(--window, #f0e2bb)"
            />
          </g>
          <g transform="translate(1436 362) scale(.62)">
            <path
              d="M0-140c-16 0-26 46-26 74s10 68 26 68 26-40 26-68-10-74-26-74Z"
              fill="#6d8a6d"
            />
            <path d="M0-70v72" stroke="#5d7a5d" strokeWidth="4" />
          </g>
          <Birds x={700} y={146} scale={0.68} />
        </>
      )}
      {landscape === "bridge" && (
        <>
          {/* Distant valley walls */}
          <path
            d="M-100 356 220 168q16-11 30 2l206 176 168-142q14-12 28 1l214 190 176-126q15-11 29 3l269 208Z"
            fill="#c3d2cd"
          />
          <path
            d="M-100 400c280-46 540 12 800-8s470-40 700 0 240 16 300 16v232H-100Z"
            fill="#a9bfb4"
          />
          {/* River far below the viaduct */}
          <path
            d="M-100 436c320-18 560 20 830 8s520-24 780 0v204H-100Z"
            fill="#9dc0c2"
          />
          <path
            d="M60 466q300-14 560 4t560-8"
            stroke="#d6e9e7"
            strokeWidth="4"
            fill="none"
            opacity=".55"
          />
          {/* The viaduct itself */}
          <StoneBridge x={880} y={424} scale={0.86} />
          {/* Trees clinging to the valley sides */}
          <Pine x={120} y={404} scale={0.62} color="#7d9a86" />
          <Tree
            x={248}
            y={410}
            scale={0.55}
            color="var(--foliage-a, #8aa58a)"
          />
          <Pine x={1520} y={406} scale={0.7} color="#718f7c" />
          <Birds x={520} y={152} scale={0.72} />
        </>
      )}
    </g>
  );
});
