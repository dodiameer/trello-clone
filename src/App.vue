<template>
  <div id="app">
    <header class="header">
      <h1>Trello Clone</h1>
    </header>
    <div class="grid">
      <board
        :tasks="firstTasks.tasks.value"
        @delete="(e) => handleDelete(firstTasks, e)"
      >
        <template #header>To-do 💻</template>
      </board>
      <board
        :tasks="secondTasks.tasks.value"
        @delete="(e) => handleDelete(secondTasks, e)"
      >
        <template #header>Doing ⚡</template>
      </board>
      <board
        :tasks="thirdTasks.tasks.value"
        @delete="(e) => handleDelete(thirdTasks, e)"
      >
        <template #header>Done 🎉</template>
      </board>
    </div>
    <form @submit.prevent="addTask(firstTasks)" class="form">
      <label for="newTask">
        New task:
        <input type="text" id="newTask" v-model.trim="newTask" />
      </label>
      <button type="submit" class="button">Add task</button>
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
      if (newTask.value !== "") {
        taskHook.addTask(newTask.value);
        newTask.value = "";
      }
    }

    function handleDelete(taskHook, id) {
      taskHook.deleteTask(id);
    }

    return {
      firstTasks,
      secondTasks,
      thirdTasks,
      newTask,
      addTask,
      handleDelete,
    };
  },
});
</script>

<style scoped>
header.header {
  height: 5rem;
  background: #2244dd;
  display: flex;
  align-items: center;
  justify-content: center;
}
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}
.form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  width: 16rem;
  margin: 0 auto;
  margin-top: 20px;
  margin-bottom: 60px;
}
.form input {
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  border: none;
  background: #2244dd;
  color: white;
  margin-left: 0.33rem;
}
.form input:focus {
  filter: brightness(1.25);
  outline: 2px dashed grey;
}
.form .button {
  width: 100%;
}
</style>
