<script lang="ts">
  import { scaleLinear } from "d3-scale";

  export let xScale: typeof scaleLinear;
  export let yScale: typeof scaleLinear;
  export let activeYear: number;
  import type { GraphData } from "../dataMassager";
  export let data: GraphData[];
  let activeItems: GraphData[] = [];
  let seasons: number[] = [];
  for (let d of data) {
    if (!seasons.includes(d.season)) {
      seasons.push(d.season);
    }
  }
  let activeNumber = -1;
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
    class="data-set"
    on:click={() => toggleItem(datum)}
    class:active={activeItems.includes(datum)}
  >
    <div class="label date" style:--x="{xScale(datum.dayOfSeason)}%">
      {datum.absoluteDate.toLocaleDateString("en-US", {
        weekday: "long", // full name of the day of the week
        month: "numeric", // numeric month
        day: "numeric", // numeric day of the month
        year: "2-digit", // two-digit year
      })}
      <div class="label">
        Water: {datum.lakeTempF}
      </div>
    </div>
    <div
      class="water-temp temp data-point season{seasons.indexOf(datum.season)}"
      class:activeSeason={datum.season === activeYear}
      style:--x="{xScale(datum.dayOfSeason)}%"
      style:--y="{yScale(datum.lakeTempF)}%"
    >
      <div class="label">
        Water: {datum.lakeTempF}
      </div>
    </div>
    <div
      class="air-temp temp data-point season{seasons.indexOf(datum.season)}"
      class:activeSeason={datum.season === activeYear}
      style:--x="{xScale(datum.dayOfSeason)}%"
      style:--y="{yScale(datum.airTempF)}%"
    >
      <div class="label">
        Air: {datum.airTempF}
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
  }
  .data-point {
    position: absolute;
    top: var(--y);
    left: var(--x);
    width: 1vw;
    height: 1vw;
    border-radius: 50%;
  }
  .air-temp {
    background-color: #cecece;
  }
  .water-temp {
    background-color: aquamarine;
  }
  .label {
    display: none;
  }
  .data-set:hover .label,
  .data-set.active .label {
    display: block;
  }
  .season1 {
    filter: hue-rotate(15deg);
  }
  .season2 {
    filter: hue-rotate(30deg);
  }
  .season3 {
    filter: hue-rotate(45deg);
  }
  .season4 {
    filter: hue-rotate(60deg);
  }
  .season5 {
    filter: hue-rotate(75deg);
  }
  .season6 {
    filter: saturate(0.8);
  }
  .season7 {
    filter: saturate(0.5);
  }
  .season8 {
    filter: saturate(0.2);
  }
  .season9 {
    filter: saturate(0);
  }
  .activeSeason {
    width: 2vw;
    height: 2vw;
    z-index: 2;
  }

  .active .data-point {
    border: 1px solid black;
    z-index: 3;
  }
</style>
