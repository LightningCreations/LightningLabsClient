<script lang="ts">
  export let checked = false;
  export let id: string;
</script>

<input type="checkbox" bind:checked {id} />
