import { calculateDayOfSeason } from "./chart/utils";

type PlungeData = {
  date: string; // Format: "YYYY-MM-DD"
  airTempF: number;
  lakeTempF: number;
  notes: string;
  ice: boolean;
};

export type GraphData = {
  absoluteDate: Date;
  dayOfSeason: number; // From 1 (July 1st) to 365/366 (June 30th)
  season: number; // Year of season start
  notes: string;
  ice: boolean;
  airTempF: number;
  lakeTempF: number;
};

export function getGraphData(data: PlungeData[]): GraphData[] {
  return data.map((plunge) => {
    const plungeDate = new Date(plunge.date);
    const seasonStartYear =
      plungeDate.getMonth() >= 6
        ? plungeDate.getFullYear()
        : plungeDate.getFullYear() - 1;
    const dayOfSeason = calculateDayOfSeason(plungeDate);

    return {
      absoluteDate: plungeDate,
      dayOfSeason: dayOfSeason,
      season: seasonStartYear,
      notes: plunge.notes,
      ice: plunge.ice,
      airTempF: plunge.airTempF,
      lakeTempF: plunge.lakeTempF,
    };
  });
}
