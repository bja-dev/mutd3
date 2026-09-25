import GenericBarChart, { type PerfectData } from "./components/GenericBarChart";
import { type ChartMetricKey, mapTeamStanding, METRIC_OPTIONS, type RawTeamSeasonData, type TeamSeasonData } from "./types";
import { useEffect, useState } from "react";

export default function App() {
  const [data, setData] = useState<TeamSeasonData[] | null>(null);
  const [metric, setMetric] = useState<ChartMetricKey>("Points");
  const [loading, setLoading] = useState(true);

  // load data into a RawTeamSeasonData[], map into => TeamSeasonData[]
  useEffect(() => {
    async function loadData(path: string) {
      try {
        const resp = await fetch(path);
        const rawData = await resp.json() as Promise<RawTeamSeasonData[]>
        setData((await rawData).map(mapTeamStanding))
      } catch (error) {
        console.log(`An error occurred when fetching the json: ${error}`)
      } finally {
        setLoading(false);
      }
    }
    loadData('data/2526-team-season-data.json')
  }, []);

  const chartData:PerfectData[] = data?.map((team) => ({
    key: team.ClubName,
    value: team[metric],
  })) ?? [];

  return (
    <main className="app-container">
      <h2>English Premier League Stats 2025/2026 Season</h2>
      <h5>{data?.length} teams loaded</h5>
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
      <div id="chart">
        <GenericBarChart data={chartData} />
      </div>
    </main>
  );
}
