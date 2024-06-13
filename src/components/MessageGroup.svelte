<script lang="ts">
  import type { Message } from '../lib/messages';

  export let firstMessage: Message;
  export let otherMessages: Message[] = [];

  let messageContents: string[];
  $: messageContents = [firstMessage.content, ...otherMessages.map((msg) => msg.content)];
</script>

<div class="flex flex-row items-start w-full gap-4 px-4 py-2 flex-nowrap">
  <img
    src={firstMessage.authorImage}
    alt={'Profile picture for ' + firstMessage.author}
    class="inline-block mt-2 text-sm rounded-full size-10" />

  <div class="inline-block">
    <p class="font-semibold font-zinc-100">{firstMessage.author}</p>

    {#each messageContents as messageContent}
      <p class="font-zinc 200">{messageContent}</p>
    {/each}
  </div>
</div>
