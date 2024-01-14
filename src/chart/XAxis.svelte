<!-- XAxis.svelte -->
<script lang="ts">
  import { scaleLinear } from "d3-scale";
  import type { GraphData } from "../dataMassager";
  import { calculateDayOfSeason } from "./utils";
  export let xScale: typeof scaleLinear;
  export let minX: number;
  export let maxX: number;

  function getMonthMarkers() {
    console.log("minX is ", minX);
    console.log("maxX is ", maxX);
    let markers = [];
    let currentDate = new Date(2020, 6, 1 + minX);
    let endDate = new Date(2020, 6, 1 + maxX);

    while (currentDate <= endDate) {
      markers.push({
        dayOfSeason: calculateDayOfSeason(currentDate),
        label: currentDate.toLocaleDateString("en-US", {
          month: "numeric",
          day: "numeric",
        }),
      });
      currentDate.setDate(15);
      if (currentDate <= endDate) {
        markers.push({
          dayOfSeason: calculateDayOfSeason(currentDate),
          label: currentDate.toLocaleDateString("en-US", {
            month: "numeric",
            day: "numeric",
          }),
        });
      }
      currentDate.setMonth(currentDate.getMonth() + 1, 1);
    }
    return markers;
  }

  let monthMarkers: {
    dayOfSeason: number;
    label: string;
  }[] = getMonthMarkers();
</script>

<div class="x-axis">
  {#each monthMarkers as marker}
    <div class="x-axis-line" style="--x: {xScale(marker.dayOfSeason)}%;"></div>
    <div class="x-axis-label" style="--x: {xScale(marker.dayOfSeason)}%;">
      {marker.label}
    </div>
  {/each}
</div>

<style>
  .x-axis-label,
  .x-axis-line {
    position: absolute;
    bottom: 0;
    left: var(--x);
  }

  .x-axis-label {
    transform: translateX(-50%);
    text-align: center;
  }

  .x-axis-line {
    width: 1px;
    height: 100%;
    background-color: #ccc;
  }
</style>
