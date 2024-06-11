<script lang="ts">
  import { slide } from 'svelte/transition';

  const servers = [
    { name: 'LC Official', url: 'll.lcdev.xyz' },
    { name: 'LL In-development', url: 'll-dev.lcdev.xyz' },
    { name: 'Other...', url: 'other' },
  ];

  let serverUrl = servers[0].url;
</script>

<div class="flex justify-center items-center flex-col">
  <h1 class="text-2xl">Enter a server address:</h1>
  <select class="rounded-lg bg-cyan-50 dark:bg-cyan-900 px-3 py-1.5 m-1" bind:value={serverUrl}>
    {#each servers as server}
      <option value={server.url}>{server.name}</option>
    {/each}
  </select>
  {#if serverUrl === 'other'}
    <input
      class="rounded-lg bg-cyan-50 dark:bg-cyan-900 px-3 py-1.5 m-1"
      transition:slide
      placeholder="some.ll.server" />
  {/if}
  <button class="rounded-lg bg-cyan-50 dark:bg-cyan-900 px-3 py-1.5 m-1 border-slate-400 border-x-2 border-y-2">
    Let's go!
  </button>
</div>
