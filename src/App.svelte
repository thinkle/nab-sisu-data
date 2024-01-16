<script lang="ts">
  import { Page, Bar, Container, SplitPane } from "contain-css-svelte";

  import { LayerCake, Html } from "layercake";
  import "contain-css-svelte/vars/defaults.css";
  import "contain-css-svelte/themes/light.css";
  import "contain-css-svelte/themes/typography-airy.css";
  import { fakeData } from "./fakeData";
  import { getGraphData } from "./dataMassager";
  import Chart from "./chart/Chart.svelte";
  let graphData = getGraphData(fakeData);
  let data = graphData.map((v) => ({ x: v.dayOfSeason, y: v.airTempF }));
  console.log("Got me data", graphData, data);
  let seasons = [];
  $: {
    for (let d of graphData) {
      if (!seasons.includes(d.season)) {
        seasons.push(d.season);
      }
    }
    seasons.sort();
    seasons = seasons;
  }
  let activeSeason = seasons[seasons.length - 1];
  let hiddenSeasons: number[] = [];

  $: if (hiddenSeasons.includes(activeSeason)) {
    hiddenSeasons = hiddenSeasons.filter((s) => s !== activeSeason);
  }

  function getYearLabel(year) {
    const twoDigit = year - 2000;
    return `'${twoDigit}-'${twoDigit + 1}`;
  }

  function toggleHidden(season) {
    return () => {
      if (hiddenSeasons.includes(season)) {
        hiddenSeasons = hiddenSeasons.filter((s) => s !== season);
      } else {
        hiddenSeasons = [...hiddenSeasons, season];
        if (activeSeason == season) {
          activeSeason = undefined;
        }
      }
    };
  }

  function hideAll() {
    hiddenSeasons = seasons;
  }
</script>

<Page --bar-height="32px">
  <Bar slot="header">
    <!-- Left -->
    <div></div>
    <!-- Center -->
    <h1>Nabnasset Sisu Dippers</h1>
    <!-- Right -->
    <div></div>
  </Bar>
  <Container height="100%" --container-max-width="1600px">
    <SplitPane leftWidth="120px" height="100%">
      <div slot="left">
        <Bar>
          <h2>Years</h2>
          <button on:click={hideAll}>Hide All</button>
        </Bar>

        <ul>
          {#each seasons as season, i}
            <li
              class="season{i}"
              class:active={season === activeSeason}
              class:hidden={hiddenSeasons.includes(season)}
            >
              <a on:click={() => (activeSeason = season)} href="#"
                >{getYearLabel(season)}
                <div class="water square key">W</div>
                <div class="air square key">A</div>
              </a>
              <button on:click={toggleHidden(season)}>
                {#if hiddenSeasons.includes(season)}
                  👁️
                {:else}
                  🚫
                {/if}
              </button>
            </li>
          {/each}
        </ul>
      </div>
      <div class="full-height" slot="right">
        <Bar>
          <h2>Dip Data</h2>
        </Bar>
        <div class="chart-container">
          <Chart
            data={graphData}
            activeYear={activeSeason}
            hiddenYears={hiddenSeasons}
          ></Chart>
        </div>
      </div>
    </SplitPane>
  </Container>
</Page>

<style>
  .full-height {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  :root {
    --chart-bg: #00227a;
    --chart-fg: white;
  }
  .chart-container {
    width: 100%;
    height: 100%; /* calc(100vh - 5 * var(--bar-height, 32px));*/
    box-sizing: border-box;
    padding: 3em;
    background-color: var(--chart-bg);
    color: var(--chart-fg);
  }
  ul {
    padding: 0;
    margin: 0;
  }
  li {
    list-style: none;
    display: flex;
    align-items: center;
    gap: 3px;
  }

  :root {
    --season-1-filter: brightness(1.6) hue-rotate(-30deg);
    --season-2-filter: brightness(1.3);
    --season-2-filter: hue-rotate(80deg) brightness(1.3);
    --season-3-filter: hue-rotate(-40deg) brightness(0.8);
    --season-4-filter: saturate(0.7);
    --season-5-filter: saturate(1.3) hue-rotate(60deg);
    --season-6-filter: saturate(0.7) hue-rotate(60deg);
    --season-7-filter: saturate(1.5) hue-rotate(-60deg);
    --season-8-filter: saturate(1.5) brightness(0.7);
    --season-9-filter: saturate(1.5) brightness(1.3) hue-rotate(120deg);
    --air-color: rgb(195, 220, 255);
    --water-color: rgb(59, 200, 255);
  }
  .season1 .square {
    filter: var(--season-1-filter);
  }
  .season2 .square {
    filter: var(--season-2-filter);
  }
  .season3 .square {
    filter: var(--season-3-filter);
  }
  .season4 .square {
    filter: var(--season-4-filter);
  }
  .season5 .square {
    filter: var(--season-5-filter);
  }
  .season6 .square {
    filter: var(--season-6-filter);
  }
  .season7 .square {
    filter: var(--season-7-filter);
  }
  .season8 .square {
    filter: var(--season-8-filter);
  }
  .season9 .square {
    filter: var(--season-9-filter);
  }

  .square {
    width: 1em;
    height: 1em;
    font-size: 0.7em;
    display: inline-grid;
    place-content: center;
    border: 3px solid var(--chart-bg);
    vertical-align: middle;
  }
  .square.water {
    background-color: var(--water-color);
  }
  .square.air {
    background-color: var(--air-color);
  }
  a {
    text-decoration: none;
  }
  li.hidden {
    opacity: 0.8;
  }
  li.active {
    font-weight: bold;
  }
</style>
