<script lang="ts">
  import { scaleLinear } from "d3-scale";

  export let xScale: typeof scaleLinear;
  export let yScale: typeof scaleLinear;
  export let activeYear: number;
  export let hiddenYears: number[] = [];
  import type { GraphData } from "../dataMassager";
  export let data: GraphData[];
  let activeItems: GraphData[] = [];
  let seasons: number[] = [];
  for (let d of data) {
    if (!seasons.includes(d.season)) {
      seasons.push(d.season);
    }
  }

  $: activeNumber = seasons.indexOf(activeYear);

  function toggleItem(datum: GraphData) {
    if (activeItems.includes(datum)) {
      activeItems = activeItems.filter((d) => d !== datum);
    } else {
      activeItems = [...activeItems, datum];
    }
  }
</script>

{#each data as datum}
  <div
    class="day-data"
    class:hidden-season={hiddenYears.includes(datum.season)}
    data-date={datum.absoluteDate.toLocaleDateString()}
    data-day-of-season={datum.dayOfSeason}
    data-air-temp={datum.airTempF}
    data-water-temp={datum.lakeTempF}
    class:active-season={datum.season === activeYear}
    on:click={() => toggleItem(datum)}
    class:active={activeItems.includes(datum)}
    class:water-above-air={datum.lakeTempF > datum.airTempF}
  >
    <div class="label date" style:--x="{xScale(datum.dayOfSeason)}%">
      {datum.absoluteDate.toLocaleDateString()}
      <br />{datum.notes}
      <br /><input type="checkbox" checked={datum.ice} /> Ice
    </div>
    <div
      class="air-temp temp data-point season{seasons.indexOf(datum.season)}"
      class:active-season={datum.season === activeYear}
      style:--x="{xScale(datum.dayOfSeason)}%"
      style:--y="{yScale(datum.airTempF)}%"
    >
      <div class="label">
        Air: {datum.airTempF}
      </div>
    </div>
    <div
      class:ice={datum.ice}
      class="water-temp temp data-point season{seasons.indexOf(datum.season)}"
      class:active-season={datum.season === activeYear}
      style:--x="{xScale(datum.dayOfSeason)}%"
      style:--y="{yScale(datum.lakeTempF)}%"
    >
      <div class="label">
        Water: {datum.lakeTempF}
      </div>
    </div>
  </div>
{/each}

<style>
  .label {
    white-space: nowrap;
    text-align: right;
    width: 6em;
  }
  .date.label {
    top: 10px;
    left: var(--x);
    transform: translateX(-50%);
    position: absolute;
    text-align: center;
    background-color: var(--chart-bg);
  }
  .data-point {
    position: absolute;
    top: var(--y);
    left: var(--x);
    width: calc(max(0.5vw, 10px));
    height: calc(100% - var(--y));
    box-sizing: border-box;
  }
  .air-temp {
    background-color: var(--air-color);
  }
  .water-temp {
    background-color: var(--water-color);
  }
  .water-temp.ice {
    border-top: 4px solid #fcffff;
  }
  .label {
    display: none;
  }
  .active-season.day-data:hover .label,
  .day-data.active .label {
    display: block;
  }
  .season1 {
    filter: var(--season-1-filter);
  }
  .season2 {
    filter: var(--season-2-filter);
  }
  .season3 {
    filter: var(--season-3-filter);
  }
  .season4 {
    filter: var(--season-4-filter);
  }
  .season5 {
    filter: var(--season-5-filter);
  }
  .season6 {
    filter: var(--season-6-filter);
  }
  .season7 {
    filter: var(--season-7-filter);
  }
  .season8 {
    filter: var(--season-8-filter);
  }
  .season9 {
    filter: var(--season-9-filter);
  }

  .active .data-point {
  }

  .water-above-air .air-temp {
    z-index: 1;
  }
  .water-above-air .water-temp {
    z-index: 0;
  }
  .day-data {
    z-index: 0;
  }
  .day-data.active-season {
    z-index: 1;
  }
  .active-season.day-data:hover,
  .day-data:active {
    z-index: 3;
    border-left: 1px solid white;
    border-right: 1px solid white;
  }
  .day-data .data-point {
    opacity: 0.15;
  }
  .hidden-season {
    opacity: 0;
  }

  .data-point.active-season {
    opacity: 1;
  }
  .active-season.day-data:hover .data-point,
  .day-data.active .data-point {
    opacity: 1;
    box-shadow: 3px 0 3px rgba(0, 0, 0, 0.6);
  }
</style>
