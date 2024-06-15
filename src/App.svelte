<script lang="ts">
  import ServerChooser from './components/ServerChooser.svelte';
  import TextChat from './components/TextChat.svelte';
  import LoginForm from './components/LoginForm.svelte';
  import { PaneGroup, Pane, PaneResizer } from 'paneforge';
  import LabsPaneResizer from './components/LabsPaneResizer.svelte';
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
