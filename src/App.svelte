<script lang="ts">
  import ServerChooser from './components/ServerChooser.svelte';
  import TextChat from './components/TextChat/TextChat.svelte';
  import LabsPaneResizer from './components/LabsPaneResizer.svelte';
  import LoginForm from './components/LoginForm.svelte';
  import { PaneGroup, Pane } from 'paneforge';
</script>

<PaneGroup direction="vertical">
  <Pane>
    <PaneGroup direction="horizontal">
      <Pane>
        <ServerChooser />
      </Pane>

      <LabsPaneResizer />

      <Pane class="flex flex-col items-center justify-center">
        <LoginForm />
      </Pane>
    </PaneGroup>
  </Pane>

  <LabsPaneResizer horizontal />

  <Pane>
    <TextChat />
  </Pane>
</PaneGroup>
