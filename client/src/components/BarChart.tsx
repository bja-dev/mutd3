// More aptly, a Horizontal Bar Chart.
// But I may end up having functionality to flip it.

import type { TeamWinRateDataPoint } from "../types";
import { scaleBand, scaleLinear } from "d3-scale";

export default function BarChart({ data }: { data: TeamWinRateDataPoint[] }) { // NOTE: tsx prop handling kinda sucks
  const width = 600;
  const height = 400;
  const margin = { top: 20, right: 30, bottom: 30, left: 120 };

  const boundedWidth = width - margin.left - margin.right;  // 450px plot area
  const boundedHeight = height - margin.top - margin.bottom; // 350px plot area

  const yAxis = scaleBand()
    .domain(data.map(a => { return a.ClubName }))
    .range([0, boundedHeight])
    .padding(0.1);

  // or Math.max(...data.map(d => d.WinPercentage)) - whatever look better
  const xAxis = scaleLinear()
    .domain([0, 100])
    .range([0, boundedWidth]);

  // NOTE: TODO: FIXME: only has WinPercentage support. wherever i access a d.member i need to make it generic
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
    >
    <g transform={`translate(${margin.left}, ${margin.top})`}>
        {data.map((d) => (<g key={d.ClubName}>
          {/* Bar Label */}
          <text x={-10} y={(yAxis(d.ClubName) ?? 0) + yAxis.bandwidth()/2} textAnchor="end" dominantBaseline="middle">{d.ClubName}</text>
          {/* Bar */}
          <rect key={d.ClubName} x={0} y={yAxis(d.ClubName)} width={xAxis(d.WinPercentage)} height={yAxis.bandwidth()} />
          {/* Label showing real value of bar */}
          <text x={(xAxis(d.WinPercentage)) + 10} y={(yAxis(d.ClubName) ?? 0) + yAxis.bandwidth() / 2} textAnchor="start" dominantBaseline="middle">{d.WinPercentage}%</text>
        </g>))
        }
    </g>
    </svg>
  )
}
