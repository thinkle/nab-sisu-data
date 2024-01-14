/* Calculate our day-o-season from a date object */
export function calculateDayOfSeason(date: Date): number {
  const seasonStartYear =
    date.getMonth() >= 6 ? date.getFullYear() : date.getFullYear() - 1;
  const startOfSeason = new Date(seasonStartYear, 6, 1); // July 1st
  return (
    Math.floor(
      (date.getTime() - startOfSeason.getTime()) / (1000 * 60 * 60 * 24)
    ) + 1
  );
}
