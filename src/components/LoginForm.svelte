<script lang="ts">
  let userEmail: string | undefined;
  let userPassword: string | undefined;

  const login = () => {
    console.table({ email: userEmail, password: userPassword });
  };
</script>

<img alt="Lightning Labs Logo" src="https://placehold.co/216x72" class="mx-auto" width="216" height="72" />
<form on:submit|preventDefault={login} class="flex flex-col items-center w-2/3 max-w-md gap-2 mx-auto">
  <div class="flex flex-col w-full gap-1 items-left">
    <label for="userEmail" class="text-zinc-700 dark:text-zinc-300">Email</label>
    <input
      type="email"
      name="userEmail"
      id="userEmail"
      class="w-full p-6 py-3 rounded-lg outline-none focus:outline focus:outline-cyan-500 bg-zinc-300 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 placeholder:text-zinc-700 dark:placeholder:text-zinc-400"
      bind:value={userEmail} />
  </div>

  <div class="flex flex-col w-full gap-1 items-left">
    <label for="userPassword" class="text-zinc-700 dark:text-zinc-300">Password</label>
    <input
      type="password"
      name="userPassword"
      id="userPassword"
      class="w-full p-6 py-3 rounded-lg outline-none focus:outline focus:outline-cyan-500 bg-zinc-300 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 placeholder:text-zinc-700 dark:placeholder:text-zinc-400"
      bind:value={userPassword} />
  </div>

  <button
    type="submit"
    class="p-4 py-2 rounded-lg outline-none focus:outline focus:outline-cyan-500 bg-cyan-500 text-zinc-800 active:bg-cyan-600">
    Log In
  </button>
</form>
