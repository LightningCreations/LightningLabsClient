<script lang="ts">
  import { onDestroy } from 'svelte';
  import { groupedMessages, messages } from '../lib/messages';
  import MessageGroup from './MessageGroup.svelte';
  import { users } from '../lib/users';

  let placeholders: string[] = ['nice', 'cool', 'funny', 'fancy'];
  let placeholderIndex: number = 0;

  let placeholderChangeTimeout = setInterval(() => {
    placeholderIndex = (placeholderIndex + 1) % placeholders.length;
  }, 1500);

  onDestroy(() => {
    clearInterval(placeholderChangeTimeout);
  });

  let selectedAuthorId: number = 0;
  let message: string = '';
  const postMessage = () => {
    // Don't send empty messages.
    if (!message) {
      return;
    }

    messages.update((msgs) =>
      msgs.concat({
        authorId: selectedAuthorId,
        createdAt: Date.now(),
        content: message,
      }),
    );

    message = '';
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

  <form on:submit|preventDefault={postMessage} class="flex flex-row w-full gap-2 flex-nowrap">
    <!-- This is temporary, for mocking purposes -->
    <select
      class="p-4 py-2 rounded-lg outline-none focus:outline focus:outline-cyan-500 bg-zinc-300 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200"
      bind:value={selectedAuthorId}>
      {#each $users as user}
        <option value={user.id}>{user.displayName}</option>
      {/each}
    </select>

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
      class="w-full p-6 py-3 rounded-lg outline-none focus:outline focus:outline-cyan-500 bg-zinc-300 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 placeholder:text-zinc-700 dark:placeholder:text-zinc-400"
      placeholder={`something ${placeholders[placeholderIndex]}...`}
      bind:value={message} />

    <!-- 
      This allows the user to press enter to submit the form. Turns out having multiple
      text inputs disables this behaviour, even though having a single text input is fine.
    -->
    <input type="submit" hidden />
  </form>
</div>
