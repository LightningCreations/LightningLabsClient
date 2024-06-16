<script lang="ts">
  import { users } from '../../lib/users';
</script>

<div class="flex flex-col w-64 gap-2 p-3 px-4 overflow-hidden">
  {#each $users as user}
    <div class="flex flex-row items-center gap-2">
      <img
        src={user.profileImageUrl}
        alt={'Profile picture for ' + user.displayName}
        class="inline-block text-sm rounded-full size-8" />

      <!-- Ellipses overflow requires constrained width, whitespace nowrap, and overflow hidden -->
      <p class="overflow-hidden font-semibold text-zinc-900 dark:text-zinc-200 text-ellipsis whitespace-nowrap">
        {user.displayName}
      </p>
    </div>
  {/each}
</div>
