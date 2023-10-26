<script setup>
import AdminLayout from "../../../layouts/AdminLayout.vue";
import CategoryTable from "../../../components/admin/categories/CategoryTable.vue";
</script>

<template>
  <AdminLayout>
    <section>
      <div class="mb-3">
        <h1 class="adm-title">Categories</h1>
      </div>
      <CategoryTable />
    </section>
  </AdminLayout>
</template>

<style lang="scss" scoped></style>
