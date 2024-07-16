import { writable } from 'svelte/store';
import { v7 as uuidv7 } from 'uuid';

interface Task {
  id: uuidv7;
  completed: boolean;
  name: string;
  indent?: number;
}

const taskStore = writable<Task[]>([
  {
    id: uuidv7(),
    completed: true,
    name: 'Create designs',
  },
  {
    id: uuidv7(),
    completed: true,
    name: 'Make repository',
  },
  {
    id: uuidv7(),
    completed: true,
    name: 'Plan initial frontend',
  },
  {
    id: uuidv7(),
    completed: true,
    name: 'Plan modular components',
  },
  {
    id: uuidv7(),
    completed: true,
    name: 'Make cookies',
  },
  {
    id: uuidv7(),
    completed: false,
    name: 'Sleep',
  },
  {
    id: uuidv7(),
    completed: true,
    name: 'Get in bed',
    indent: 1,
  },
]);

export { type Task, taskStore as tasks };
