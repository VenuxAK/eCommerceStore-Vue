<script setup>
import { ref } from "vue";
import CategoryModalBox from "../modals/CategoryModalBox.vue";
import Pagination from "../../paginations/Pagination.vue";
const openCreateCategoryModal = ref(false);
const openEditCategoryModal = ref(false);
const openAddSubCategoryModal = ref(false);

const createNewCategory = () => {
  openCreateCategoryModal.value = !openCreateCategoryModal.value;
};
</script>

<template>
  <div class="w-full mb-4 flex justify-end">
    <button class="btn-create" @click="createNewCategory">Create</button>
  </div>
  <div class="relative overflow-x-auto">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead
        class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
      >
        <tr>
          <th scope="col" class="px-6 py-3">#</th>
          <th scope="col" class="px-6 py-3">Name</th>
          <th scope="col" class="px-6 py-3">Sub-categories</th>
          <th scope="col" class="px-6 py-3">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
          v-for="i in 10"
          :key="i"
        >
          <th
            scope="row"
            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            {{ i }}
          </th>
          <td class="px-6 py-4">Category name</td>
          <td class="px-6 py-4">Sub 1, Sub 2, Sub 3</td>
          <td class="px-6 py-4 flex items-center space-x-4">
            <div>
              <button @click="openEditCategoryModal = true" class="btn-edit">
                Edit
              </button>
            </div>
            <div>
              <button class="btn-delete">Delete</button>
            </div>
            <div>
              <button
                @click="openAddSubCategoryModal = true"
                class="btn-create"
              >
                Add
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="mt-4 mb-6">
    <Pagination />
  </div>

  <CategoryModalBox
    :open="openCreateCategoryModal"
    title="Create New Category"
    @close="openCreateCategoryModal = false"
  />
  <CategoryModalBox
    :open="openEditCategoryModal"
    title="Edit Category"
    @close="openEditCategoryModal = false"
  />
  <CategoryModalBox
    :open="openAddSubCategoryModal"
    title="Add Sub Category"
    for_use="sub-category"
    @close="openAddSubCategoryModal = false"
  />
</template>

<style lang="scss" scoped>
.btn-edit {
  @apply bg-transparent font-bold px-3 py-2 border border-gray-200 dark:border-gray-600 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-all focus:outline-none;
}
.btn-delete {
  @apply bg-danger font-bold text-white px-3 py-2 border border-transparent rounded hover:bg-danger/70 dark:hover:bg-danger/80 transition-all focus:outline-none;
}
.btn-create {
  @apply bg-primary text-white px-3 py-2 rounded inline-flex items-center space-x-2 hover:bg-primary/90 dark:hover:bg-primary/80 transition-all focus:outline-none;
}
</style>
