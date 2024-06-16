import { derived, writable } from 'svelte/store';

interface Channel {
  id: number;
  name: string;
  category: string;
}

const currentChannelIdStore = writable<number>(0);
const channelsStore = writable<Channel[]>([
  {
    id: 0,
    name: 'general',
    category: 'General',
  },
  {
    id: 1,
    name: 'governance',
    category: 'LC Stuff',
  },
  {
    id: 2,
    name: 'lightning-labs',
    category: 'LC Stuff',
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
