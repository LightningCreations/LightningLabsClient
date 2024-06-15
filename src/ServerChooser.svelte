<script lang="ts">
  import { slide } from 'svelte/transition';

  let servers: { name: string; url: string }[] = [
    { name: 'LC Official', url: 'll.lcdev.xyz' },
    { name: 'LL In-development', url: 'll-dev.lcdev.xyz' },
    { name: 'Other...', url: 'other' },
  ];

  let serverUrl = servers[0].url;
</script>

<div class="mx-auto w-max">
  <h1 class="my-2 text-2xl font-semibold text-left">Select a Server</h1>
  <div class="flex flex-row gap-2">
    <select
      class="p-4 py-2 rounded-lg outline-none focus:outline focus:outline-cyan-500 bg-zinc-300 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200"
      bind:value={serverUrl}>
      {#each servers as server}
        <option value={server.url}>{server.name}</option>
      {/each}
    </select>

    <!-- When the user selects 'other', we need to show them a field to input the address -->
    {#if serverUrl === 'other'}
      <input
        placeholder="some.ll.server"
        class="p-4 py-2 rounded-lg outline-none focus:outline focus:outline-cyan-500 bg-zinc-300 placeholder:text-zinc-600 dark:placeholder:text-zinc-400 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200"
        transition:slide={{ axis: 'x' }} />
    {/if}

    <button
      class="p-4 py-2 rounded-lg outline-none focus:outline focus:outline-cyan-500 bg-cyan-500 text-zinc-800 active:bg-cyan-600">
      Let's go!
    </button>
  </div>
</div>
