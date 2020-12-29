import { ref } from "vue";

export default function useTasks() {
  const tasks = ref<{content: string, id: number}[]>([]);

  function addTask(task: string) {
    tasks.value.push({content: task, id: tasks.value.length + Math.random()});
  }

  function deleteTask(id: number) {
    tasks.value = tasks.value.filter(t => t.id !== id)
  }

  return {
    tasks: tasks,
    addTask,
    deleteTask
  };
}
