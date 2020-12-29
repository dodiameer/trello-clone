<script lang="ts">
import { defineComponent } from "vue";
import draggable from "vuedraggable";

export default defineComponent({
  name: "Board",
  props: {
    tasks: {
      required: true,
      type: Array,
    },
  },
  components: {
    draggable,
  },
});
</script>

<template>
  <section>
    <draggable
      :list="tasks"
      group="tasks"
      @change="$emit('change')"
      @start="drag = true"
      @end="drag = false"
      tag="ul"
      item-key="id"
    >
      <template #header>
        <h1>
          <slot name="header"></slot>
        </h1>
      </template>
      <template #item="{ element }">
        <li>{{ element.content }} - <button @click="$emit('delete', element.id)">Delete</button></li>
      </template>
    </draggable>
  </section>
</template>

<style scoped>
section {
  border: 1px dashed black;
  padding: 1rem;
  margin: 1rem;
}
</style>
