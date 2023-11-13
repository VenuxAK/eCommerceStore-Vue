<script setup>
import { onMounted, ref } from "vue";
import CategoryModalBox from "../modals/CategoryModalBox.vue";
import Pagination from "../../paginations/Pagination.vue";
import ErrorMessage from "../../form/ErrorMessage.vue";
import { useCategory } from "../../../stores/eCommerce/categories/useCategory";
import { makeCategory } from "../../../stores/eCommerce/categories/makeCategory";

const openCreateCategoryModal = ref(false);
const openEditCategoryModal = ref(false);

let category = ref({
  name: "",
  thumbnail: "",
});

let slug = ref("");
let categories = ref([]);

const { getCategories } = useCategory();

const onChange = (event) => {
  category.value.thumbnail = event.target.files[0];
};

const { createCategory, updateCategory, deleteCategory } = makeCategory();
let errors = ref([]);

const handleCreateCategoryModal = () => {
  openCreateCategoryModal.value = true;
  category.value.name = "";
};
const onCreateCategory = async () => {
  const response = await createCategory(category.value);
  if (response.errors) {
    errors.value = response.errors;
    return;
  }
  openCreateCategoryModal.value = false;
};

const handleEditCategoryModal = (category_slug, name) => {
  openEditCategoryModal.value = true;
  category.value.name = name;
  slug.value = category_slug;
};
const onUpdateCategory = async () => {
  const response = await updateCategory(slug.value, category.value);
  if (response.errors) {
    errors.value = response.errors;
    return;
  }
  openEditCategoryModal.value = false;
};

const onDeleteCategory = async (slug) => {
  if (confirm("Are you sure want to delete?")) {
    await deleteCategory(slug);
    return;
  }
};

onMounted(async () => {
  const response_categories = await getCategories();
  categories.value = response_categories.categories;
});
</script>

<template>
  <!-- Category  -->
  <div class="mb-8">
    <div class="w-full mb-4 flex justify-end">
      <button class="btn-create" @click="handleCreateCategoryModal">
        Create
      </button>
    </div>
    <div class="relative overflow-x-auto">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            <th scope="col" class="px-6 py-3">#</th>
            <th scope="col" class="px-6 py-3">Name</th>
            <th scope="col" class="px-6 py-3">Sub-categories count</th>
            <th scope="col" class="px-6 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            v-if="categories.length > 0"
            v-for="category in categories"
            :key="category"
          >
            <th
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              {{ category.id }}
            </th>
            <td class="px-6 py-4">{{ category.name }}</td>
            <td class="px-6 py-4">
              {{ category.types.length }}
            </td>
            <td class="px-6 py-4 flex items-center space-x-4">
              <div>
                <button
                  @click="handleEditCategoryModal(category.slug, category.name)"
                  class="btn-edit"
                >
                  Edit
                </button>
              </div>
              <div>
                <button
                  :disabled="category.types.length > 0"
                  @click="onDeleteCategory(category.slug)"
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
    <div class="mt-4 mb-6" v-if="categories.length > 0">
      <Pagination />
    </div>
  </div>
  <!-- Create Category -->
  <CategoryModalBox
    :open="openCreateCategoryModal"
    title="Create New Category"
    @close="openCreateCategoryModal = false"
  >
    <form @submit.prevent="onCreateCategory">
      <div class="mb-6">
        <label for="name" class="form-label" style="color: white">
          Category name
        </label>
        <input
          type="text"
          id="name"
          class="form-input"
          v-model="category.name"
        />
        <ErrorMessage v-if="errors.name" :error="errors.name" />
      </div>
      <div class="mb-6">
        <label class="form-label" style="color: white" for="file_input">
          Upload file
        </label>
        <input
          class="file-input"
          id="file_input"
          type="file"
          @change="onChange"
        />
        <ErrorMessage v-if="errors.thumbnail" :error="errors.thumbnail" />
      </div>
      <div class="mb-4">
        <button class="btn-create" type="submit">Submit</button>
      </div>
    </form>
  </CategoryModalBox>

  <!-- Edit Category -->
  <CategoryModalBox
    :open="openEditCategoryModal"
    title="Edit Category"
    @close="openEditCategoryModal = false"
  >
    <form @submit.prevent="onUpdateCategory">
      <div class="mb-4">
        <label for="name" class="form-label" style="color: white">
          Category name
        </label>
        <input
          type="text"
          id="name"
          class="form-input"
          v-model="category.name"
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
