import { derived, writable } from 'svelte/store';
import type { Message } from './messages';

interface Channel {
  id: number;
  name: string;
  category: string;
  getMessages: () => Promise<Message[]>;
}

const currentChannelIdStore = writable<number>(0);
const channelsStore = writable<Channel[]>([
  {
    id: 0,
    name: 'general',
    category: 'General',
    getMessages: async () => [
      {
        authorId: 0,
        createdAt: Date.now() - 100000,
        content: 'Welcome to Lightning Labs!',
      },
      {
        authorId: 0,
        createdAt: Date.now() - 100000,
        content:
          "This is your place to hang out, chat, develop stuff, and other things. Words words, long content. Demo message, y'know?",
      },
      {
        authorId: 1,
        createdAt: Date.now() - 25000,
        content: 'First!',
      },
      {
        authorId: 2,
        createdAt: Date.now(),
        content: 'Does this have governance? If not, can I make some?',
      },
    ],
  },
  {
    id: 1,
    name: 'governance',
    category: 'LC Stuff',
    getMessages: async () => {
      await new Promise((res) => setTimeout(res, 2000));
      return [
        {
          authorId: 0,
          createdAt: Date.now() - 100000,
          content: 'Welcome to #governance!',
        },
        {
          authorId: 2,
          createdAt: Date.now(),
          content: 'First!',
        },
      ];
    },
  },
  {
    id: 2,
    name: 'lightning-labs',
    category: 'LC Stuff',
    getMessages: async () => [],
  },
]);

const categorizedChannelsStore = derived(channelsStore, (channels) => {
  const groupedByCat = Object.groupBy(channels, ({ category }) => category);

  // the above result is an object whose string keys map to Channel[] | undefined.
  // We want to return an array of arrays instead, where each element is a Channel[].
  //
  // Note, we use a cast here because we can guarantee every value in the object is
  // a Channel[], not undefined. Because groupBy returns a Partial<Record<...>>,
  // TypeScript thinks each entry is possibly undefined... but its not!
  // The alternative is to append `.filter((x) => x !== undefined)`, but that's
  // extra (useless) work.
  return Object.values(groupedByCat) as Channel[][];
});

const currentChannelStore = derived([channelsStore, currentChannelIdStore], ([channels, id]) =>
  channels.find((channel) => channel.id == id),
);

export {
  type Channel,
  currentChannelIdStore as currentChannelId,
  channelsStore as allChannels,
  categorizedChannelsStore as categorizedChannels,
  currentChannelStore as currentChannel,
};
