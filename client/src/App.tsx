import BarChart from "./components/BarChart";
import { mapTeamStanding, type RawTeamSeasonData, type TeamWinRateDataPoint } from "./types";
import { useEffect, useState } from "react";
import { getSortedWinRateData } from "./utils/processData";


export default function App() {
  const [data, setData] = useState<TeamWinRateDataPoint[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData(path: string) {
      // TODO: make generic
      // path is relative to public
      try {
        const resp = await fetch(path);
        const rawData = await resp.json() as Promise<RawTeamSeasonData[]>
        setData(getSortedWinRateData((await rawData).map(mapTeamStanding)))
      } catch (error) {
        console.log(`An error occurred when fetching the json: ${error}`)
      } finally {
        setLoading(false)
      }
    }
    loadData('data/2526-team-season-data.json')
  }, []);

  if (loading) return <p>Loading...</p>;
  return (
    <main className="app-container">
      <h2>English Premier League Stats 2025/2026 Season</h2>
      <BarChart data={data} />
    </main>
  );
}
