<script lang="ts">
  import ServerChooser from './components/ServerChooser.svelte';
  import TextChat from './components/TextChat/TextChat.svelte';
  import LabsPaneResizer from './components/LabsPaneResizer.svelte';
  import LoginForm from './components/LoginForm.svelte';
  import TaskList from './components/TaskList.svelte';
  import { PaneGroup, Pane } from 'paneforge';
</script>

<PaneGroup direction="horizontal">
  <Pane defaultSize={30}>
    <TaskList />
  </Pane>

  <LabsPaneResizer />

  <Pane>
    <PaneGroup direction="vertical">
      <Pane>
        <PaneGroup direction="horizontal">
          <Pane>
            <ServerChooser />
          </Pane>

          <LabsPaneResizer />

          <Pane class="flex flex-col justify-center items-center">
            <LoginForm />
          </Pane>
        </PaneGroup>
      </Pane>

      <LabsPaneResizer horizontal />

      <Pane>
        <TextChat />
      </Pane>
    </PaneGroup>
  </Pane>
</PaneGroup>
