interface Message {
  createdAt: number; // unix timestamp
  authorId: number;
  content: string;
}

const groupMessages = (messages: Message[]) => {
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

    if (previousMessage.authorId !== message.authorId || timeDifference > MAX_GROUP_IDLE_TIME) {
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
};

export { type Message, groupMessages };
