import { calculateDayOfSeason } from "./chart/utils";

type PlungeData = {
  date: string; // Format: "YYYY-MM-DD"
  airTempF: number;
  lakeTempF: number;
  notes: string;
  minutesInWater: number;
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
  minutesInWater: number;
};

export function getGraphData(data: PlungeData[]): GraphData[] {
  return data.map((plunge) => {
    // Bit of a hack: we just move the time to 12:00 so that any GMT screw-ups
    // won't change the date, since 12:00 GMT is still the same day in EST or EDT
    // or what have you.
    const plungeDate = new Date(plunge.date.replace("00", "12"));
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
      minutesInWater: plunge.minutesInWater,
    };
  });
}
