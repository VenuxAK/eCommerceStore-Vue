<script setup>
import AdminLayout from "../../layouts/AdminLayout.vue";
import Dashboard from "./dashboard/Dashboard.vue";
</script>

<template>
  <AdminLayout>
    <div class="">
      <h1 class="adm-title">Dashboard</h1>
    </div>
    <Dashboard />
  </AdminLayout>
</template>

<style lang="scss">
.adm-title {
  @apply text-gray-800 dark:text-gray-300 font-bold text-2xl;
}
</style>
