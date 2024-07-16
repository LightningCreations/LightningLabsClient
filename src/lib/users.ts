import { writable } from 'svelte/store';

interface User {
  id: number;
  displayName: string;
  profileImageUrl: string;
}

const getPlaceholderImageUrl = (username: string) => `https://picsum.photos/seed/${username}/48`;

const userStore = writable<User[]>([
  {
    id: 0,
    displayName: 'Admin',
    profileImageUrl: getPlaceholderImageUrl('Admin'),
  },
  {
    id: 1,
    displayName: 'kilbouri',
    profileImageUrl: getPlaceholderImageUrl('kilbouri'),
  },
  {
    id: 2,
    displayName: 'Connor Horman',
    profileImageUrl: getPlaceholderImageUrl('Connor Horman'),
  },
]);

export { type User, userStore as users };
