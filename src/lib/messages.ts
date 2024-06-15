import { derived, writable } from 'svelte/store';

interface Message {
  createdAt: number; // unix timestamp
  author: string;
  authorImage: string;
  content: string;
}

const adminAuthor = 'Admin';
const adminImage = 'https://picsum.photos/seed/Admin/48';

const userAuthor = 'Connor Horman';
const userImage = 'https://picsum.photos/seed/Connor%20Horman/48';

const messageStore = writable<Message[]>([
  {
    createdAt: Date.now() - 1000,
    author: adminAuthor,
    authorImage: adminImage,
    content: 'Welcome to Lightning Labs!',
  },
  {
    createdAt: Date.now() - 500,
    author: adminAuthor,
    authorImage: adminImage,
    content:
      "This is your place to hang out, chat, develop stuff, and other things. Words words, long content. Demo message, y'know?",
  },
  {
    createdAt: Date.now(),
    author: userAuthor,
    authorImage: userImage,
    content: 'Does this have governance? If not, can I make some?',
  },
]);

const groupedMessageStore = derived(messageStore, (messages) => {
  // group messages as long as they are within the sameish time interval
  // and by the same author

  const MAX_GROUP_IDLE_TIME = 5 * 60 * 1000; // if an author idles for 5 minutes, the group restarts

  if (messages.length == 0) {
    return [];
  }

  let groups: Message[][] = [];
  let currentGroup: Message[] = [messages[0]];

  for (const message of messages.slice(1)) {
    // there will always be a last element, as we will always ensure at least one message in the array.
    // either in the initial value above, or when we start a new group
    const previousMessage = currentGroup.at(-1)!;
    const timeDifference = message.createdAt - previousMessage.createdAt;

    if (previousMessage.author !== message.author || timeDifference > MAX_GROUP_IDLE_TIME) {
      // store previous group and start a new one
      groups.push(currentGroup);
      currentGroup = [];
    }

    currentGroup.push(message);
  }

  // we need to make sure the final group is stored. This should happen if and only if
  // it is not empty... but we can guarantee that it isn't empty because we always
  // push into it immediately after starting it :)
  groups.push(currentGroup);

  return groups;
});

export { type Message, messageStore as messages, groupedMessageStore as groupedMessages };
