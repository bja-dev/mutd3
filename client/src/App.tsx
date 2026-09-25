import { type ChartMetricKey, mapTeamStanding, METRIC_OPTIONS, type RawTeamSeasonData } from "./types";
import { useState } from "react";

export default function App() {
  const [metric, setMetric] = useState<ChartMetricKey>("Points")
  return (
    <main className="app-container">
      <h2>English Premier League Stats 2025/2026 Season</h2>
      <div id="controls">
        <h4>controls</h4>
        <select
          value={metric}
          onChange={(e) => setMetric(e.target.value as ChartMetricKey)}
        >
          {METRIC_OPTIONS.map((metricKey) => (
            <option key={metricKey} value={metricKey}>
              {metricKey}
            </option>
          ))}
        </select>
      </div>
    </main>
  );
}
