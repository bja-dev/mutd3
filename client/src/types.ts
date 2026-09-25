// FBref Match Log shape, as seen in mutd/2526-mutd-matches.json
export interface MatchLog {
  Date: string;
  Time: string;
  Round: string;
  Day: string;
  Venue: string;
  Result: string;
  GF: string;        // Goals For
  GA: string;        // Goals Against
  Opponent: string;
  Poss: string;      // Possession pct.
  Attendance: string;
  Captain: string;
  Formation: string;
  "Opp Formation": string;
  Referee: string;
}

// as seen in "/public/data/2526-team-season-data.json"
export interface RawTeamSeasonData {
  Rk: string;
  Squad: string;
  MP: string;
  W: string;
  L: string;
  D: string;
  GF: string;
  GA: string;
  GD: string;
  Pts: string;
  "Top Team Scorer": string;
  Goalkeeper: string;
  Notes: string;
}

export interface TeamSeasonData {
  Rank: number;
  ClubName: string;
  MatchesPlayed: number;
  Wins: number;
  Losses: number;
  Draws: number;
  GoalsFor: number;
  GoalsAgainst: number;
  GoalDifference: number; // `(gd > 0 ? +${gd} : -${gd}` with a base case to check for 0 GD
  Points: number;
  TopTeamScorer: string;
  Goalkeeper: string;
  Notes: string;
  WinPercentage: number;
  PointsPercentage: number;
}
export function mapTeamStanding(raw: RawTeamSeasonData): TeamSeasonData {
  return {
    Rank: Number(raw.Rk),
    ClubName:raw.Squad,
    MatchesPlayed: Number(raw.MP),
    Wins: Number(raw.W),
    Losses:Number(raw.L),
    Draws:Number(raw.D),
    GoalsFor:Number(raw.GF),
    GoalsAgainst:Number(raw.GA),
    GoalDifference:Number(raw.GD),
    Points:Number(raw.Pts),
    TopTeamScorer: raw["Top Team Scorer"],
    Goalkeeper: raw.Goalkeeper,
    Notes: raw.Notes,
    WinPercentage: (Number(raw.W) / Number(raw.MP) * 100),
    PointsPercentage: (Number(raw.Pts) / (Number(raw.MP)*3) * 100),
  }
}

export const METRIC_OPTIONS = [
  "Points",
  "Wins",
  "Losses",
  "Draws",
  "GoalsFor",
  "GoalsAgainst",
  "GoalDifference",
  "MatchesPlayed",
  "WinPercentage",
  "PointsPercentage",
] as const;

// FIXME: this sucks but i will fix it later
export type ChartMetricKey = "Points" |"Wins" |"Losses" |"Draws" |"GoalsFor" |"GoalsAgainst" |"GoalDifference" |"MatchesPlayed" |"WinPercentage" |"PointsPercentage";
