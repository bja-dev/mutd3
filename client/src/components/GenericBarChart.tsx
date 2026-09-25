// More aptly, a Horizontal Bar Chart.
// But I may end up having functionality to flip it.

import { scaleBand, scaleLinear } from "d3-scale";
import { max } from "d3";

export interface PerfectData {
  key: string;
  value: number;
}

export default function GenericBarChart({ data }: { data: PerfectData[] }) {
  const width = 800;
  const height = 400;
  const margin = { top: 20, right: 30, bottom: 30, left: 140 }; // use em to dynamically set left margin

  const boundedWidth = width - margin.left - margin.right;  // 450px plot area
  const boundedHeight = height - margin.top - margin.bottom; // 350px plot area

  const yAxis = scaleBand()
    .domain(data.map(a => { return a.key }))
    .range([0, boundedHeight])
    .padding(0.1);

  // or Math.max(...data.map(d => d.WinPercentage)) - whatever look better
  const xAxis = scaleLinear()
    .domain([0, max(data, d => d.value)])
    .range([0, boundedWidth]);

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
    >
    <g transform={`translate(${margin.left}, ${margin.top})`}>
        {data.map((d) => (<g key={d.key}>
          {/* Bar Label */}
          <text x={-10} y={(yAxis(d.key) ?? 0) + yAxis.bandwidth()/2} textAnchor="end" dominantBaseline="middle">{d.key}</text>
          {/* Bar */}
          <rect key={d.key} x={0} y={yAxis(d.key)} width={xAxis(d.value)} height={yAxis.bandwidth()} />
          {/* Label showing real value of bar */}
          <text x={(xAxis(d.value)) + 10} y={(yAxis(d.key) ?? 0) + yAxis.bandwidth() / 2} textAnchor="start" dominantBaseline="middle">{Math.round(d.value * 10)/10}</text>
        </g>))
        }
    </g>
    </svg>
  )
}
