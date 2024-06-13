<script lang="ts">
  import { groupedMessages } from '../lib/messages';
  import MessageGroup from './MessageGroup.svelte';
</script>

<div class="flex flex-col">
  {#each $groupedMessages as group}
    <MessageGroup firstMessage={group[0]} otherMessages={group.slice(1)} />
  {/each}
</div>
