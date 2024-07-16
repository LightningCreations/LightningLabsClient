<script lang="ts">
  import ChannelList from './ChannelList.svelte';
  import UserList from './UserList.svelte';
  import MessageGroup from './MessageGroup.svelte';
  import LoadingSpinner from '../LoadingSpinner.svelte';
  import { users } from '../../lib/users';
  import { allChannels, currentChannel, currentChannelId } from '../../lib/channels';
  import { onDestroy } from 'svelte';
  import { groupMessages, type Message } from '../../lib/messages';

  let selectedAuthorId: number = 0;
  let message: string = '';

  const postMessage = async () => {
    // Don't send empty messages.
    if (!message) {
      return;
    }

    const messageToSend: Message = {
      authorId: selectedAuthorId,
      content: message,
      createdAt: Date.now(),
    };

    await $currentChannel?.sendMessage(messageToSend);

    message = '';
  };

  //! Note that for the time being .getMessages() does not cause issues because the promise resolves
  //! immediately. A more intelligent mechanism is needed to prevent extraneous server loading and
  //! bad UX
  let groupedMessages: Promise<Message[][]>;
  $: groupedMessages = $currentChannel?.getMessages().then((msgs) => groupMessages(msgs)) ?? Promise.resolve([]);
</script>

<div class="flex flex-row flex-nowrap h-full">
  <!-- Channel list -->
  <div class="overflow-y-auto flex-shrink-0 bg-zinc-300 dark:bg-zinc-800">
    <ChannelList />
  </div>
  <!-- Text chat -->
  <div class="flex flex-col flex-grow justify-end p-4 pt-0 h-full">
    <div class="flex overflow-y-auto flex-col-reverse flex-1">
      <!-- 
        We need to reverse the messages as we are using flex-col-reverse to
        force the content to the end of the container. I would have liked to
        use justify-end instead but for whatever reason that prevents scrollling.
      -->
      {#await groupedMessages}
        <div class="flex flex-col items-center p-4">
          <div class="text-cyan-500 size-8">
            <LoadingSpinner />
          </div>
        </div>
      {:then channelMessageGroups}
        {#each channelMessageGroups.reverse() as group}
          <MessageGroup firstMessage={group[0]} otherMessages={group.slice(1)} />
        {/each}
      {/await}
    </div>

    <form on:submit|preventDefault={postMessage} class="flex flex-row flex-nowrap gap-2 w-full">
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
        class="p-6 py-3 w-full rounded-lg outline-none focus:outline focus:outline-cyan-500 bg-zinc-300 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 placeholder:text-zinc-700 dark:placeholder:text-zinc-400"
        placeholder={`something interesting...`}
        bind:value={message} />

      <!-- 
      This allows the user to press enter to submit the form. Turns out having multiple
      text inputs disables this behaviour, even though having a single text input is fine.
    -->
      <input type="submit" hidden />
    </form>
  </div>

  <div class="overflow-y-auto flex-shrink-0 bg-zinc-300 dark:bg-zinc-800">
    <UserList />
  </div>
</div>
