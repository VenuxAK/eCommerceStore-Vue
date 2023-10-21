<script setup>
import Sidebar from "../shared/admin/Sidebar.vue";
import Header from "../shared/admin/Header.vue";
</script>

<template>
  <div class="admin-layout">
    <Sidebar />

    <main class="main-layout">
      <Header />
      <div class="pl-10 pt-2 md:pl-4">
        <slot />
      </div>
    </main>
  </div>
</template>

<style lang="scss" scoped>
.admin-layout {
  @apply flex w-screen;
  .main-layout {
    @apply flex-1 pl-7 md:pl-0;
  }
}
</style>
