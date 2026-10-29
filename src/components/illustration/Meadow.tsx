function MeadowCluster() {
  const grasses = [
    { x: 96, y: 544, s: 1.1 },
    { x: 268, y: 540, s: 0.8 },
    { x: 490, y: 548, s: 1.05 },
    { x: 670, y: 538, s: 0.9 },
    { x: 890, y: 546, s: 1.15 },
    { x: 1120, y: 536, s: 0.85 },
    { x: 1359, y: 525, s: 0.7 },
    { x: 1461, y: 558, s: 1.3 },
  ];

  const flowers = [
    { x: 128, y: 531, petal: "#f4e2ba", center: "#cfad64" },
    { x: 137, y: 544, petal: "#e8c4c4", center: "#cf8d8d" },
    { x: 310, y: 536, petal: "#f5eedb", center: "#d4b35e" },
    { x: 525, y: 542, petal: "#e2d5f0", center: "#a88bc4" },
    { x: 740, y: 533, petal: "#fcedcc", center: "#d9a552" },
    { x: 940, y: 546, petal: "#e8c4c4", center: "#cf8d8d" },
    { x: 1170, y: 535, petal: "#f4e2ba", center: "#cfad64" },
    { x: 1407, y: 540, petal: "#f5eedb", center: "#d4b35e" },
    { x: 1425, y: 531, petal: "#e2d5f0", center: "#a88bc4" },
  ];

  const pebbles = [
    { cx: 210, cy: 548, rx: 7, ry: 2 },
    { cx: 329, cy: 554, rx: 6, ry: 2 },
    { cx: 438, cy: 535, rx: 10, ry: 2.5 },
    { cx: 620, cy: 550, rx: 8, ry: 2.2 },
    { cx: 840, cy: 542, rx: 9, ry: 2.5 },
    { cx: 1094, cy: 544, rx: 7, ry: 2 },
    { cx: 1185, cy: 529, rx: 9, ry: 2 },
    { cx: 1510, cy: 547, rx: 8, ry: 2.3 },
  ];

  return (
    <>
      {grasses.map(({ x, y, s }, idx) => (
        <g key={`grass-${idx}`} transform={`translate(${x} ${y}) scale(${s})`}>
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
      {flowers.map(({ x, y, petal, center }, idx) => (
        <g key={`flower-${idx}`} transform={`translate(${x} ${y})`}>
          <path d="M0 0v-15" stroke="#9ca687" strokeWidth="2" />
          <g fill={petal}>
            <circle cy="-20" r="3.5" />
            <circle cx="-4" cy="-16" r="3.5" />
            <circle cx="4" cy="-16" r="3.5" />
            <circle cy="-12" r="3.5" />
          </g>
          <circle cy="-16" r="2.5" fill={center} />
        </g>
      ))}
      <g fill="#b2b896" opacity=".6">
        {pebbles.map(({ cx, cy, rx, ry }, idx) => (
          <ellipse key={`pebble-${idx}`} cx={cx} cy={cy} rx={rx} ry={ry} />
        ))}
      </g>
    </>
  );
}

export function MeadowDetails() {
  return (
    <g className="foreground-meadow">
      {[-1600, 0, 1600].map((offset) => (
        <g key={offset} transform={`translate(${offset} 0)`}>
          <MeadowCluster />
        </g>
      ))}
    </g>
  );
}
