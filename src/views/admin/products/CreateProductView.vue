<script setup>
import AdminLayout from "../../../layouts/AdminLayout.vue";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { makeStore } from "../../../stores/eCommerce/products/makeStore";
import { useCategory } from "../../../stores/eCommerce/categories/useCategory";
import ErrorMessage from "../../../components/form/ErrorMessage.vue";
let previewImages = ref([]);
const images = ref([]);
const onChange = (event) => {
  images.value = event.target.files;
  // console.log(images.value);
  product.value.images = images.value;
  if (images.value.length > 0) {
    previewImages.value = [];

    for (let i = 0; i < images.value.length; i++) {
      const reader = new FileReader();
      reader.onload = (e) => {
        previewImages.value.push(e.target.result);
      };
      reader.readAsDataURL(images.value[i]);
    }
  }
};
const selectImage = (img) => {
  previewImages.value = previewImages.value.filter((_img) => {
    return img != _img;
  });
};

const { createProduct } = makeStore();
const { getCategories, getSubCategories } = useCategory();
const router = useRouter();
let categories = ref([]);
let sub_categories = ref([]);
const product = ref({
  title: "",
  description: "",
  images: [],
  category: "",
  sub_category: "",
  price: "",
  stock_quantity: "",
});
let errors = ref([]);
const onCreateProduct = async () => {
  const response = await createProduct(product.value);

  if (response && response.errors) {
    errors.value = response.errors;
    return;
  }
  if (response.status === 201) {
    // console.log(response.data);
    router.push("/admin/products");
  }
};

onMounted(async () => {
  const sub_categories_response = await getSubCategories();
  sub_categories.value = sub_categories_response.product_types;
});
</script>

<template>
  <AdminLayout>
    <section class="max-w-[520px] mx-auto my-8">
      <div>
        <h1 class="adm-title text-center mb-4">Create product</h1>
      </div>
      <div>
        <form @submit.prevent="onCreateProduct">
          <div class="mb-6">
            <label for="title" class="form-label">Title</label>
            <input
              type="text"
              id="title"
              class="form-input"
              placeholder="Writing"
              v-model="product.title"
            />
            <ErrorMessage :error="errors.name" />
          </div>
          <div class="mb-6">
            <label for="description" class="form-label">Description</label>
            <textarea
              id="description"
              rows="4"
              class="form-input"
              placeholder="About the product..."
              v-model="product.description"
            ></textarea>
            <ErrorMessage :error="errors.description" />
          </div>
          <!-- <div class="mb-6">
            <picture-input
              ref="pictureInput"
              accept="image/jpeg,image/png"
              width="500"
              height="300"
              margin="16"
              size="10"
              button-class="btn"
              :custom-strings="{
                upload: '<h1>Bummer!</h1>',
                drag: 'Drag an image or click here to select image',
              }"
              @change="onChange"
            >
            </picture-input>
          </div> -->
          <div class="mb-6">
            <label class="form-label" for="file_input">Upload images</label>
            <input
              class="file-input"
              aria-describedby="file_input_help"
              id="file_input"
              type="file"
              @change="onChange"
              multiple
            />
            <p
              class="mt-1 text-sm text-gray-500 dark:text-gray-300"
              id="file_input_help"
            >
              SVG, PNG, JPG (MAX. 2MB).
            </p>
            <ErrorMessage :error="errors.images" />
            <div class="mt-2 grid grid-cols-2 md:grid-cols-4 gap-2">
              <div
                v-for="(previewImage, index) in previewImages"
                :key="index"
                class="relative"
              >
                <img
                  :src="previewImage"
                  class="rounded aspect-square object-cover"
                  alt=""
                />
                <div class="">
                  <div
                    class="w-full h-full opacity-0 hover:opacity-100 cursor-pointer rounded overflow-hidden flex justify-end items-end bg-black/70 bg-opacity-70 absolute bottom-0 right-0"
                  >
                    <button
                      @click="selectImage(previewImage)"
                      type="button"
                      class="text-white hover:text-danger p-1"
                    >
                      <i class="fa-solid fa-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="mb-6 flex justify-between items-center">
            <!-- <div class="w-[49%]">
              <label for="countries" class="form-label">Category</label>
              <select
                v-model="product.category"
                id="countries"
                class="form-input"
              >
                <option selected>Select</option>
                <option value="US">Men's Fashion</option>
                <option value="CA">Women's Fashion</option>
                <option value="FR">Baby and Toy</option>
                <option value="DE">Electronic Accessories</option>
              </select>
            <ErrorMessage :error="errors.name" />
            </div> -->
            <div class="w-full">
              <label for="countries" class="form-label">Sub Category</label>
              <select
                v-model="product.sub_category"
                id="countries"
                class="form-input"
              >
                <option selected>Select</option>
                <option
                  v-for="sub in sub_categories"
                  :value="sub.id"
                  :key="sub.id"
                >
                  {{ sub.type }}
                </option>
              </select>
              <ErrorMessage :error="errors.product_type_id" />
            </div>
          </div>
          <div
            class="w-full flex flex-col md:flex-row md:gap-3 md:items-center mb-5"
          >
            <div class="md:w-[50%] mb-6 md:mb-0">
              <label for="price" class="form-label">Price</label>
              <input
                type="number"
                id="price"
                class="form-input"
                placeholder="#####"
                v-model="product.price"
              />
              <ErrorMessage :error="errors.price" />
            </div>
            <div class="md:w-[50%]">
              <label for="stock_quantity" class="form-label"
                >Stock Quantity</label
              >
              <input
                type="number"
                class="form-input"
                id="stock_quantity"
                placeholder="#####"
                v-model="product.stock_quantity"
              />
              <ErrorMessage :error="errors.stock_quantity" />
            </div>
          </div>
          <!-- publish -->
          <div class="flex items-start mb-6">
            <div class="flex items-center h-5">
              <input
                id="remember"
                type="checkbox"
                value=""
                class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
              />
            </div>
            <label
              for="remember"
              class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >Publish on site
            </label>
          </div>
          <button
            type="submit"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Create Product
          </button>
        </form>
      </div>
    </section>
  </AdminLayout>
</template>

<style lang="scss" scoped></style>
