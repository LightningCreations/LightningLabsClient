<script lang="ts">
  import { PaneResizer } from 'paneforge';

  export let horizontal: boolean = false;
</script>

<PaneResizer
  class="flex data-[horizontal=true]:flex-row flex-col justify-center p-1 outline-none data-[horizontal=false]:border-x-2 data-[horizontal=true]:border-y-2 border-zinc-300 dark:border-zinc-700 focus:outline focus:outline-cyan-500"
  data-horizontal={horizontal}>
  <span
    class="flex items-center data-[horizontal=true]:h-3 data-[horizontal=true]:w-12 w-3 h-12 text-center text-black rounded-lg bg-cyan-500"
    data-horizontal={horizontal}>
    <div
      class="data-[horizontal=true]:w-8 h-8 data-[horizontal=true]:h-px w-px mx-auto bg-black"
      data-horizontal={horizontal}>
    </div>
  </span>
</PaneResizer>
