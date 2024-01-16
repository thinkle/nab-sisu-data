<script lang="ts">
  import type { GraphData } from "../dataMassager";
  import XAxis from "./XAxis.svelte";
  import YAxis from "./YAxis.svelte";
  import Series from "./SeriesColumns.svelte";
  import { scaleLinear } from "d3-scale";
  export let activeYear = 2023;

  export let data: GraphData[];
  export let hiddenYears: number[] = [];
  // Find the minimum and maximum dayOfSeason in the data
  let minDayOfSeason = Math.min(...data.map((d) => d.dayOfSeason));
  let maxDayOfSeason = Math.max(...data.map((d) => d.dayOfSeason));

  let xScale = scaleLinear()
    .domain([minDayOfSeason, maxDayOfSeason])
    .range([0, 100]); // This will be dynamically updated based on container size

  let minY = Math.min(...data.map((d) => d.airTempF));
  let maxY = Math.max(...data.map((d) => d.airTempF));
  let yScale = scaleLinear().domain([minY, maxY]).range([100, 0]); // This will be dynamically updated based on container size
</script>

<div class="graph">
  <XAxis {xScale} minX={minDayOfSeason} maxX={maxDayOfSeason} />
  <YAxis {yScale} {minY} {maxY} />
  <Series {data} {xScale} {yScale} {activeYear} {hiddenYears} />
</div>

<style>
  .graph {
    width: 100%;
    height: 100%;
    background-color: var(--chart-bg);
    color: var(--chart-fg);
    position: relative;
  }
</style>
