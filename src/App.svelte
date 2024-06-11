<script lang="ts">
  import { Pane, PaneGroup } from 'paneforge';
  import ServerChooser from './ServerChooser.svelte';
</script>

<PaneGroup direction="horizontal" class="w-full h-full">
  <Pane class="m-auto"><ServerChooser /></Pane>
</PaneGroup>
