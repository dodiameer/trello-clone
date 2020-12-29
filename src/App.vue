<template>
  <div id="app">
    <board :tasks="firstTasks.tasks.value" @delete="e => handleDelete(firstTasks, e)">
      <template #header>To-do 💻</template>
    </board>
    <board :tasks="secondTasks.tasks.value" @delete="e => handleDelete(secondTasks, e)">
      <template #header>Doing ⚡</template>
    </board>
    <board :tasks="thirdTasks.tasks.value" @delete="e => handleDelete(thirdTasks, e)">
      <template #header>Done 🎉</template>
    </board>
    <form @submit.prevent="addTask(firstTasks)">
      <label for="newTask">
        New task:
        <input type="text" id="newTask" v-model.trim="newTask" />
      </label>
      <button type="submit">Add task</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import useTasks from "./hooks/useTasks";
import Board from "./components/Board.vue";
export default defineComponent({
  components: { Board },
  name: "app",
  setup() {
    const firstTasks = useTasks();
    const secondTasks = useTasks();
    const thirdTasks = useTasks();
    const newTask = ref<string>("");

    function addTask(taskHook) {
      taskHook.addTask(newTask.value)
      newTask.value = ""
    }

    function handleDelete(taskHook, id) {
      taskHook.deleteTask(id)
    }

    return {
      firstTasks,
      secondTasks,
      thirdTasks,
      newTask,
      addTask,
      handleDelete
    };
  },
});
</script>
