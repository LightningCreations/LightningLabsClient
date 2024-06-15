<script lang="ts">
  import ServerChooser from './ServerChooser.svelte';
  import TextChat from './components/TextChat.svelte';
  import { PaneGroup, Pane, PaneResizer } from 'paneforge';
</script>

<PaneGroup direction="vertical">
  <Pane>
    <ServerChooser />
  </Pane>

  <PaneResizer class="flex justify-center py-1 border-t-2 border-b-2 border-zinc-300 dark:border-zinc-700">
    <span class="flex items-center w-12 h-3 text-center text-black rounded-lg bg-cyan-400">
      <div class="w-8 h-px mx-auto bg-black"></div>
    </span>
  </PaneResizer>

  <Pane>
    <TextChat />
  </Pane>
</PaneGroup>
