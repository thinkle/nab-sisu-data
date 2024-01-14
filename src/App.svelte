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
        </Bar>
      </div>
      <div class="full-height" slot="right">
        <Bar>
          <h2>Events</h2>
        </Bar>
        <div class="chart-container">
          <Chart data={graphData}></Chart>
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
  .chart-container {
    width: 100%;
    height: 100%; /* calc(100vh - 5 * var(--bar-height, 32px));*/
    box-sizing: border-box;
    border: 2px solid pink;
  }
</style>
