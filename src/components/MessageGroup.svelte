<script lang="ts">
  import type { Message } from '../lib/messages';
  import moment from 'moment';

  export let firstMessage: Message;
  export let otherMessages: Message[] = [];

  let messageContents: string[];
  $: messageContents = [firstMessage.content, ...otherMessages.map((msg) => msg.content)];
</script>

<div class="flex flex-row items-start w-full gap-4 mb-4 flex-nowrap">
  <img
    src={firstMessage.authorImage}
    alt={'Profile picture for ' + firstMessage.author}
    class="inline-block mt-2 text-sm rounded-full size-10" />

  <div class="inline-block">
    <p>
      <span class="font-semibold text-zinc-200">{firstMessage.author}</span>
      <span class="text-xs text-zinc-400">{moment(firstMessage.createdAt).calendar()}</span>
      <!-- 
        Note: the above mechanism for displaying the timestamp works, but it has one fatal
        flaw: if no messages are received for a long enough time, e.g. a day, it will become
        incorrect. Consider "Today at 11:59pm" - As soon as the minute rolls over, it should
        instead read "Yesterday at 11:59pm". But Svelte will not re-render the component,
        so it will stay "Today at 11:59pm" until the next render.
      -->
    </p>

    {#each messageContents as messageContent}
      <p class="text-base text-zinc-300">{messageContent}</p>
    {/each}
  </div>
</div>
