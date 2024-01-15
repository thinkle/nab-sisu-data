<!-- YAxis.svelte -->
<script lang="ts">
  import { scaleLinear } from "d3-scale";
  export let yScale: typeof scaleLinear;
  export let minY: number;
  export let maxY: number;

  function getYMarkers() {
    let markers = [];

    // Special marker for 32°F
    if (minY <= 32 && maxY >= 32) {
      markers.push({ value: 32, label: "32°F" });
    }

    // Markers for every 10°F within range
    for (let temp = Math.ceil(minY / 10) * 10; temp <= maxY; temp += 10) {
      if (temp !== 32) {
        // Avoid duplicating the 32°F marker
        markers.push({ value: temp, label: `${temp}°F` });
      }
    }

    return markers;
  }

  let yMarkers = getYMarkers();
</script>

<div class="y-axis">
  {#each yMarkers as marker}
    <div class="y-axis-line" style="top: {yScale(marker.value)}%;">
      <!-- Line element -->
    </div>
    <div class="y-axis-label" style="top: {yScale(marker.value)}%;">
      {marker.label}
    </div>
  {/each}
</div>

<style>
  .y-axis-label,
  .y-axis-line {
    position: absolute;
    left: -2em;
  }

  .y-axis-label {
    margin-left: -5px; /* Adjust as needed */
    text-align: right;
  }

  .y-axis-line {
    width: 100%;
    height: 1px;
    background-color: #ccc;
  }
</style>
