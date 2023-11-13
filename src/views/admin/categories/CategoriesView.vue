<script setup>
import AdminLayout from "../../../layouts/AdminLayout.vue";
import CategoryTable from "../../../components/admin/categories/CategoryTable.vue";
import SubCategoryTable from "../../../components/admin/categories/SubCategoryTable.vue";
</script>

<template>
  <AdminLayout>
    <section>
      <div class="mb-3">
        <h1 class="adm-title">Categories</h1>
      </div>
      <CategoryTable />
      <SubCategoryTable />
    </section>
  </AdminLayout>
</template>

<style lang="scss" scoped></style>
