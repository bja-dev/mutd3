// More aptly, a Horizontal Bar Chart.
// But I may end up having functionality to flip it.

import { scaleBand, scaleLinear } from "d3-scale";
import { max } from "d3";
import { type BarChartProps, type ChartOrientation } from "../types"
export interface PerfectData {
  key: string;
  value: number;
}

export default function GenericBarChart({ data, orientation }: { data: PerfectData[], orientation: ChartOrientation}) {
  const width = 800;
  const height = 600;
  const margin = { top: 20, right: 30, bottom: 140, left: 140 };

  const boundedWidth = width - margin.left - margin.right;
  const boundedHeight = height - margin.top - margin.bottom;

  const maxValue = max(data, d => d.value);

  const xScaleLinear = scaleLinear().domain([0, maxValue]).range([0, boundedWidth]);
  const xScaleBand = scaleBand().domain(data.map((d) => d.key)).range([0, boundedWidth]).padding(0.1);

  const yScaleLinear = scaleLinear().domain([0, maxValue]).range([boundedHeight, 0]);
  const yScaleBand = scaleBand().domain(data.map((d) => d.key)).range([0, boundedHeight]).padding(0.1);

  if (orientation === "vertical") {
    return (
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          {data.map((d) => {
            const barX = xScaleBand(d.key) ?? 0;
            const barWidth = xScaleBand.bandwidth();
            const barY = yScaleLinear(d.value);
            const barHeight = boundedHeight - barY;
            const centerX = barX + barWidth / 2;
            const labelY = boundedHeight + 10;

            return (
              <g key={d.key}>
                <text x={centerX} y={labelY} textAnchor="end" dominantBaseline="middle" transform={`rotate(-90, ${centerX}, ${labelY})`}>
                  {d.key}
                </text>
                <rect x={barX} y={barY} width={barWidth} height={barHeight} />
                <text x={centerX} y={barY - 6} textAnchor="middle" dominantBaseline="auto">
                  {Math.round(d.value * 10) / 10}
                </text>
              </g>
            );
          })}
        </g>
      </svg>
    );
  } else {
    return (
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          {data.map((d) => {
            const barY = yScaleBand(d.key) ?? 0;
            const barHeight = yScaleBand.bandwidth();
            const barWidth = xScaleLinear(d.value);
            const centerY = barY + barHeight / 2;

            return (
              <g key={d.key}>
                <text x={-10} y={centerY} textAnchor="end" dominantBaseline="middle">
                  {d.key}
                </text>
                <rect x={0} y={barY} width={barWidth} height={barHeight} />
                <text x={barWidth + 10} y={centerY} textAnchor="start" dominantBaseline="middle">
                  {Math.round(d.value * 10) / 10}
                </text>
              </g>
            );
          })}
        </g>
      </svg>
    );
  }
}
