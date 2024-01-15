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
  }
  .data-point {
    position: absolute;
    top: var(--y);
    left: var(--x);
    width: 0.5vw;
    height: calc(100% - var(--y));
    box-sizing: border-box;
  }
  .air-temp {
    background-color: #cecece;
  }
  .water-temp {
    background-color: aquamarine;
  }
  .water-temp.ice {
    border-top: 4px solid #fcffff;
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
  .active-season {
  }

  .active .data-point {
    border: 1px solid black;
  }

  .water-above-air .air-temp {
    z-index: 1;
  }
  .water-above-air .water-temp {
    z-index: 0;
  }
  .data-set {
    z-index: 0;
  }
  .data-set.active-season {
    z-index: 1;
  }
  .data-set:hover,
  .data-set:active {
    z-index: 3;
  }
  .data-set .data-point {
    opacity: 0.3;
  }
  .data-set:hover .data-point,
  .data-set:active .data-point {
    opacity: 1;
  }
  .data-point.active-season {
    opacity: 1;
  }
</style>
