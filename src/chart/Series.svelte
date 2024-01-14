<script lang="ts">
  import { scaleLinear } from "d3-scale";

  export let xScale: typeof scaleLinear;
  export let yScale: typeof scaleLinear;
  export let activeYear: number;
  import type { GraphData } from "../dataMassager";
  export let data: GraphData[];
</script>
