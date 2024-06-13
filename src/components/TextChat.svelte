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
    <input
      type="text"
      name="message"
      id="messageInput"
      class="w-full p-4 py-2 rounded-lg text-zinc-800"
      bind:value={userMessageContent} />
  </form>
</div>
