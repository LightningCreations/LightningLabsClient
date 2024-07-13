<script lang="ts">
  import { categorizedChannels, currentChannelId } from '../../lib/channels';

  const changeChannel = (id: number) => {
    currentChannelId.set(id);
  };
</script>

<div class="flex flex-col gap-2 p-3 px-4 text-lg text-zinc-700 dark:text-zinc-400">
  {#each $categorizedChannels as category}
    <div class="flex flex-col gap-1">
      <p class="overflow-hidden font-semibold w-44 text-ellipsis whitespace-nowrap">
        {category[0].category}
      </p>

      <ul>
        {#each category as channel}
          <!-- Ellipses overflow requires constrained width, whitespace nowrap, and overflow hidden -->
          <li class="overflow-hidden w-44 text-ellipsis whitespace-nowrap">
            <button on:click|preventDefault={() => changeChannel(channel.id)}>
              # {channel.name}
            </button>
          </li>
        {/each}
      </ul>
    </div>
  {/each}
</div>
