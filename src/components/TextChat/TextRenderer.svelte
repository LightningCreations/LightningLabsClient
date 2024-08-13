<script lang="ts">
  export let text;

  function createLinkElement(URL: string) {
    return `<span class="text-cyan-400" onclick="if(confirm('This link goes to the following URL:\\n\\n${URL}\\n\\nAre you sure you want to open it?')) {window.open('', '', '${URL}')}">${URL}</span>`;
  }

  // TODO: replace with regex detection
  let rendered = text
    .split(' ')
    .map((el: string) =>
      (el.startsWith('http://') || el.startsWith('https://') || el.startsWith('mailto:')) &&
      /[A-Za-z=]/.test(el.slice(-1))
        ? createLinkElement(el)
        : el,
    )
    .join(' ');
</script>

<div class={$$restProps.class || 'text-base text-zinc-800 dark:text-zinc-300'} style="cursor: pointer">
  {@html rendered}
</div>
<!-- Default properties are copied from MessageGroup.svelte -->
