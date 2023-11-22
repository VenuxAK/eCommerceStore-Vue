<script setup>
import { onMounted, ref } from "vue";
import CategoryModalBox from "../modals/CategoryModalBox.vue";
import Pagination from "../../paginations/Pagination.vue";
import ErrorMessage from "../../form/ErrorMessage.vue";
import { useCategory } from "../../../stores/eCommerce/categories/useCategory";
import { makeCategory } from "../../../stores/eCommerce/categories/makeCategory";

const openAddModal = ref(false);
const openEditModal = ref(false);

let sub_category = ref({
  name: "",
  category_id: "",
});
let categories = ref([]);
let sub_categories = ref([]);
let slug = ref("");
let errors = ref([]);

const { getSubCategories, getCategories } = useCategory();
const { createSubCategory, updateSubCategory, deleteSubCategory } =
  makeCategory();

const handleAddModal = () => {
  openAddModal.value = true;
  sub_category.value.name = "";
  slug.value = "";
};
const onAddSubCategory = async () => {
  const response = await createSubCategory(
    sub_category.value.category_id,
    sub_category.value.name
  );
  if (response.errors) {
    errors.value = response.errors;
    return;
  }
  openAddModal.value = false;
};

const handleEditModal = (name, _slug) => {
  openEditModal.value = true;
  sub_category.value.name = name;
  slug.value = _slug;
};
const onUpdateSubCategory = async () => {
  const response = await updateSubCategory(sub_category.value.name, slug.value);
  if (response.errors) {
    errors.value = response.errors;
    return;
  }
  openEditModal.value = false;
};

const onDeleteSubCategory = async (slug) => {
  if (confirm("Are you sure want to delete?")) {
    await deleteSubCategory(slug);
  }
};

onMounted(async () => {
  const response = await getSubCategories();
  sub_categories.value = response.product_types;

  const response_categories = await getCategories();
  categories.value = response_categories.categories;
});
</script>

<template>
  <!-- Sub category -->
  <div class="mb-8" v-if="sub_categories.length > 0">
    <div class="w-full">
      <div class="flex justify-between items-center mb-4">
        <h1 class="text-xl text-gray-700 dark:text-gray-200 font-medium">
          Sub categories
        </h1>
        <div>
          <button @click="handleAddModal" class="btn-create">Create</button>
        </div>
      </div>
      <div class="relative overscroll-x-auto">
        <table
          class="w-full text-sm text-left text-gray-500 dark:text-gray-400"
        >
          <thead
            class="text-sm text-gray-700 dark:text-gray-400 uppercase bg-gray-50 dark:bg-gray-700"
          >
            <tr>
              <th scope="col" class="px-6 py-3">#</th>
              <th scope="col" class="px-6 py-3">Name</th>
              <th scope="col" class="px-6 py-3">Category</th>
              <th scope="col" class="px-6 py-3">Products count</th>
              <th scope="col" class="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="product_type in sub_categories"
              :key="product_type.id"
              class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            >
              <td class="px-6 py-4">{{ product_type.id }}</td>
              <td class="px-6 py-4">{{ product_type.type }}</td>
              <td class="px-6 py-4">{{ product_type.category }}</td>
              <td class="px-6 py-4">{{ product_type.products.length }}</td>
              <td class="px-6 py-4 flex items-center space-x-4">
                <div>
                  <button
                    @click="
                      handleEditModal(product_type.type, product_type.slug)
                    "
                    class="btn-edit"
                  >
                    Edit
                  </button>
                </div>
                <div>
                  <button
                    :disabled="product_type.products.length > 0"
                    @click="onDeleteSubCategory(product_type.slug)"
                    class="btn-delete disabled:bg-danger/80"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="mt-4 mb-6">
      <Pagination />
    </div>
  </div>
  <div v-else>
    <div class="flex flex-col items-center justify-center py-16  space-y-3 border-t border-gray-200 dark:border-gray-800">
      <h1 class="text-gray-600 dark:text-gray-500 text-xl font-medium">
        No Sub-categories were created yet
      </h1>
      <div>
        <button class="btn-create" @click="handleAddModal">
          Create New Sub Category
        </button>
      </div>
    </div>
  </div>

  <!-- Add Sub Category -->
  <CategoryModalBox
    :open="openAddModal"
    title="Add Sub Category"
    for_use="sub-category"
    @close="openAddModal = false"
  >
    <form @submit.prevent="onAddSubCategory">
      <div class="mb-4">
        <label class="form-label" for="category_id">Category</label>
        <select
          v-model="sub_category.category_id"
          class="form-input"
          id="category_id"
        >
          <option selected>Select category</option>
          <option v-for="category in categories" :value="category.id">
            {{ category.name }}
          </option>
        </select>
        <ErrorMessage v-if="errors.category_id" :error="errors.category_id" />
      </div>
      <div class="mb-4">
        <label for="name" class="form-label" style="color: white">
          Sub Category
        </label>
        <input
          type="text"
          id="name"
          class="form-input"
          v-model="sub_category.name"
        />
        <ErrorMessage v-if="errors.name" :error="errors.name" />
      </div>

      <div class="mb-4">
        <button class="btn-create" type="submit">Add</button>
      </div>
    </form>
  </CategoryModalBox>

  <!-- Edit Sub Category -->
  <CategoryModalBox
    :open="openEditModal"
    title="Edit Sub Category"
    for_use="sub-category"
    @close="openEditModal = false"
  >
    <form @submit.prevent="onUpdateSubCategory">
      <div class="mb-4">
        <label class="form-label" for="edit_sub_category_name"
          >Sub category</label
        >
        <input
          class="form-input"
          type="text"
          id="edit_sub_category_name"
          v-model="sub_category.name"
        />
        <ErrorMessage v-if="errors.name" :error="errors.name" />
      </div>
      <div class="mb-4">
        <button class="btn-create" type="submit">Edit</button>
      </div>
    </form>
  </CategoryModalBox>
</template>

<style lang="scss" scoped></style>
