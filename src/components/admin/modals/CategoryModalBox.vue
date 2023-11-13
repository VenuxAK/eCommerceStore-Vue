<script setup>
import { ref } from "vue";

const emit = defineEmits(["close"]);
const props = defineProps(["open", "title", "for_use"]);

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    close();
  }
});
let setAnimationOut = ref(false);
const close = () => {
  setAnimationOut.value = true;
  setTimeout(() => {
    emit("close");
    setAnimationOut.value = false;
  }, 200);
};
</script>
<template>
  <div
    v-if="open"
    class="bg-black bg-opacity-50 dark:bg-opacity-80 backdrop-blur fixed top-0 left-0 w-full h-screen z-[1000] md:z-[200] flex items-center justify-center overflow-hidden duration-500"
    @click.self="close"
  >
    <div
      :class="setAnimationOut ? 'animated-out' : ''"
      class="animated-bounce max-w-[380px] w-[450px] border border-gray-600 dark:border-gray-800 rounded overflow-hidden shadow-xl"
    >
      <div
        class="flex justify-between items-center p-3 border-b border-gray-600 dark:border-gray-800"
      >
        <h1 class="text-white dark:text-gray-300 font-bold">{{ title }}</h1>
        <div>
          <button
            @click="close"
            class="text-gray-300 dark:text-white hover:text-gray-700 dark:hover:text-gray-200"
          >
            <i class="fa-solid fa-xmark text-xl"></i>
          </button>
        </div>
      </div>
      <div class="p-3">
        <slot />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.animated-bounce {
  animation: zoomIn;
  animation-duration: 0.5s;
}
.animated-out {
  animation: zoomOut;
  animation-duration: 0.5s;
}
</style>
