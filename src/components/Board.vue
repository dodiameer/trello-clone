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
        <h1 class="title">
          <slot name="header"></slot>
        </h1>
      </template>
      <template #item="{ element }">
        <li>{{ element.content }} - <button @click="$emit('delete', element.id)" class="button">Delete</button></li>
      </template>
    </draggable>
  </section>
</template>

<style scoped>
section {
  border: 1px dashed white;
  margin: 1rem;
}
.title {
  text-align: center;
  margin-bottom: 1.5rem;
}
ul {
  padding: 1rem;
  height: 100%;
}
li {
  margin-left: 1rem;
  margin-bottom: 1rem;
}
li:last-of-type {
  margin-bottom: none;
}
</style>
