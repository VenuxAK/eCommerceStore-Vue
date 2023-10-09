<script setup>
import { ref } from "vue";

const props = defineProps(["title", "height"]);

let showMenu = ref(false);

const toggleShow = () => {
  showMenu.value = !showMenu.value;
};
</script>

<template>
  <li class="list-none block">
    <div
      class="flex items-center justify-between mb-2 cursor-pointer"
      @click="toggleShow"
    >
      <p class="text-secondary font-bold">{{ title }}</p>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        :class="{ 'rotate-90': showMenu }"
        class="dropdown-menu"
        viewBox="0 0 24 24"
      >
        <path fill="none" d="M0 0h24v24H0V0z" />
        <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
      </svg>
    </div>
    <ul
      class="ml-4 overflow-hidden dropdown-menu font-normal"
      :class="showMenu ? 'h-auto' : 'h-0'"
    >
      <slot />
    </ul>
  </li>
</template>

<style lang="scss" scoped>
.dropdown-menu {
  //   transition: 300ms;
  @apply transition-all;
}
.rotate-90 {
  transform: rotate(90deg);
}
</style>
