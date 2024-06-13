<script lang="ts">
  import { groupedMessages, messages } from '../lib/messages';
  import MessageGroup from './MessageGroup.svelte';

  let userMessageContent: string = '';
  const postMessage = () => {
    // Don't send empty messages.
    if (!userMessageContent) {
      return;
    }

    messages.update((msgs) =>
      msgs.concat({
        createdAt: Date.now(),
        author: 'Isaac Kilbourne',
        authorImage: 'https://picsum.photos/seed/eyezick/48',
        content: userMessageContent,
      }),
    );

    userMessageContent = '';
  };
</script>

<div class="flex flex-col justify-end h-full p-4 pt-0">
  <div class="flex flex-col-reverse flex-1 overflow-y-auto">
    <!-- 
      We need to reverse the messages as we are using flex-col-reverse to
      force the content to the end of the container. I would have liked to
      use justify-end instead but for whatever reason that prevents scrollling.
    -->
    {#each $groupedMessages.reverse() as group}
      <MessageGroup firstMessage={group[0]} otherMessages={group.slice(1)} />
    {/each}
  </div>

  <form on:submit|preventDefault={postMessage} class="w-full">
    <!-- Todo: input:text has really really ugly handling for long text and multi-paragraph inputs -->
    <!--
      This is not an easy problem to solve. Some good reading, particularly in the comments, can be found
      here: https://css-tricks.com/auto-growing-inputs-textareas/

      Off-hand, my current approach is likely to use a textarea instead of a form and input:text. This has the
      advantage of multi-line input support out of the box. The drawback however is that we would need to capture
      <ENTER> and <SHIFT + ENTER> to make the former post the message (text context aware, of course, as we don't
      want to send the message if the user is typing code for example) and the latter move to a new line.

      Another approach may be to simply pull in an existing library.
    -->
    <input
      type="text"
      name="message"
      id="messageInput"
      class="w-full p-4 py-2 rounded-lg text-zinc-800"
      bind:value={userMessageContent} />
  </form>
</div>
