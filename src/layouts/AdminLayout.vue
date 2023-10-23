<script setup>
import Sidebar from "../shared/admin/Sidebar.vue";
import Header from "../shared/admin/Header.vue";
import { onMounted, ref } from "vue";
let is_expanded = ref(true);
let screen_sm = ref(false);

const toggleSidebar = (cond) => {
  if (window.innerWidth > 768) {
    screen_sm.value = false;
    if (!cond) {
      is_expanded.value = !is_expanded.value;
      localStorage.setItem("is_expanded", is_expanded.value);
      return;
    }
    is_expanded.value = true;
    localStorage.setItem("is_expanded", is_expanded.value);
    return;
  } else {
    if (!cond) {
      is_expanded.value = !is_expanded.value;
      screen_sm.value = true;
      localStorage.setItem("is_expanded", false);
      return;
    }
    is_expanded.value = true;
    screen_sm.value = true;
    localStorage.setItem("is_expanded", false);
    return;
  }
};

onMounted(() => {
  if (window.innerWidth > 768) {
    is_expanded.value = localStorage.getItem("is_expanded") == "true";
  } else {
    is_expanded.value = false;
    localStorage.setItem("is_expanded", "false");
  }
});
window.addEventListener("resize", () => {
  if (window.innerWidth < 768) {
    is_expanded.value = false;
    localStorage.setItem("is_expanded", "false");
  }
});

</script>

<template>
  <div class="admin-layout">
    <Sidebar
      :is_expanded="is_expanded"
      :screen_sm="screen_sm"
      @sidebar_expanded="toggleSidebar"
    />

    <main
      class="main-layout"
      :class="{
        'sidebar-expand': is_expanded ? true : false,
        'screen-sm': screen_sm ? true : false,
      }"
    >
      <div>
        <Header />
      </div>
      <div class="mt-3">
        <div class="admin-container">
          <slot />
        </div>
      </div>
    </main>
  </div>
</template>

<style lang="scss" scoped>
.admin-layout {
  @apply bg-gray-100 dark:bg-gray-950;
  .main-layout {
    @apply ml-[3.5rem] duration-200 ease-in-out;
    &.sidebar-expand {
      @apply ml-[280px] duration-200 ease-in-out;
      &.screen-sm {
        @apply ml-[3.5rem];
      }
    }
  }
}
</style>
