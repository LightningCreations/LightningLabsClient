<script lang="ts">
  import { tasks } from '../lib/tasks';
  import Checkbox from './Checkbox.svelte';
  import OcticonTrash24 from 'virtual:icons/octicon/trash-24';
</script>

<div class="flex flex-col flex-nowrap w-full">
  <h1 class="p-4 text-2xl font-bold">Task List</h1>
  <hr />
  <div class="p-4">
    <ol>
      {#each $tasks as task, i}
        <li>
          <div class="flex flex-row flex-nowrap items-center p-1 my-1 rounded-lg hover:bg-zinc-800 group">
            {#each { length: task.indent || 0 } as _}
              <div class="w-4"></div>
            {/each}
            <Checkbox bind:checked={task.completed} id={'task-list-' + task.id} />
            <label
              for={'task-list-' + task.id}
              class="overflow-x-scroll mr-auto ml-1 text-nowrap"
              class:text-zinc-500={task.completed}>     
              {task.name}
            </label>
            <button
              class="hidden self-end p-0.5 font-bold rounded border border-transparent text-slate-400 p-auto hover:border-white group-hover:block"
              on:click={() => delete $tasks[i]}>
              <OcticonTrash24 />
            </button>
          </div>
        </li>
      {/each}
    </ol>
  </div>
</div>
