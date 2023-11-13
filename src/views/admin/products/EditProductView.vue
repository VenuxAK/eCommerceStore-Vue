<script setup>
import AdminLayout from "../../../layouts/AdminLayout.vue";
import ErrorMessage from "../../../components/form/ErrorMessage.vue";
import { onMounted, ref } from "vue";
import { useStore } from "../../../stores/eCommerce/products/useStore";
import { makeStore } from "../../../stores/eCommerce/products/makeStore";
import { useCategory } from "../../../stores/eCommerce/categories/useCategory";
import { useRouter } from "vue-router";
let previewImages = ref([]);

const { getProduct } = useStore();
const { getSubCategories } = useCategory();
const { updateProduct } = makeStore();
const props = defineProps(["slug"]);
const product = ref(null);
const sub_categories = ref([]);
const router = useRouter();

let formData = ref({
  name: "",
  description: "",
  product_type: "",
  price: "",
  stock_quantity: "",
});
let errors = ref([]);

const onChange = (event) => {
  const files = event.target.files;
  if (files.length > 0) {
    previewImages.value = [];

    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.onload = (e) => {
        previewImages.value.push(e.target.result);
      };
      reader.readAsDataURL(files[i]);
    }
  }
};

const selectImage = (img) => {
  previewImages.value = previewImages.value.filter((_img) => {
    return img != _img;
  });
};

const onUpdateProduct = async () => {
  const response = await updateProduct(formData.value, props.slug);
  if (response && response.errors) {
    errors.value = response.errors;
  }
  if (response.status === 201) {
    router.push("/admin/products");
  }
};

onMounted(async () => {
  const response = await getProduct(props.slug);
  product.value = response.product;
  const response_sub_categories = await getSubCategories();
  sub_categories.value = response_sub_categories.product_types;
  // console.log(product.value, sub_categories.value);

  formData.value.name = product.value.name;
  formData.value.description = product.value.description;
  formData.value.price = product.value.price;
  formData.value.product_type = product.value.product_type_id;
  formData.value.stock_quantity = product.value.stock_quantity;
  // console.log(formData.value);
});
</script>

<template>
  <AdminLayout>
    <section class="max-w-[520px] mx-auto my-8">
      <div>
        <h1 class="adm-title text-center mb-4">Edit product</h1>
      </div>
      <div>
        <form v-if="product" @submit.prevent="onUpdateProduct">
          <div class="mb-6">
            <label for="title" class="form-label">Title</label>
            <input
              type="text"
              id="title"
              class="form-input"
              placeholder="Writing"
              v-model="formData.name"
            />
            <ErrorMessage v-if="errors.name" :error="errors.name" />
          </div>
          <div class="mb-6">
            <label for="description" class="form-label">Description</label>
            <textarea
              id="description"
              rows="4"
              class="form-input"
              placeholder="About the product..."
              v-model="formData.description"
            ></textarea>
            <ErrorMessage
              v-if="errors.description"
              :error="errors.description"
            />
          </div>
          <div class="mb-6">
            <label class="form-label" for="file_input">Upload images</label>
            <input
              class="file-input"
              aria-describedby="file_input_help"
              id="file_input"
              type="file"
              @change="onChange"
              multiple
              :disabled="1 == 1"
            />
            <p
              class="mt-1 text-sm text-gray-500 dark:text-gray-300"
              id="file_input_help"
            >
              SVG, PNG, JPG (MAX. 2MB).
            </p>
            <div class="mt-2 grid grid-cols-2 md:grid-cols-4 gap-2">
              <div
                v-for="(previewImage, index) in product.images"
                :key="index"
                class="relative"
              >
                <img
                  :src="previewImage"
                  class="rounded aspect-square object-cover"
                  alt=""
                />
                <div class="" v-if="false">
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
            <div class="w-full">
              <label for="countries" class="form-label">Category</label>
              <select
                v-model="formData.product_type"
                id="countries"
                class="form-input"
              >
                <option>Select</option>
                <option
                  v-if="sub_categories.length > 0"
                  v-for="sub in sub_categories"
                  :key="sub.id"
                  :value="sub.id"
                  :selected="sub.id == formData.product_type"
                >
                  {{ sub.type }}
                </option>
              </select>
              <ErrorMessage
                v-if="errors.product_type_id"
                :error="errors.product_type_id"
              />
            </div>
          </div>
          <div class="mb-6">
            <div class="flex w-full gap-3">
              <div class="w-[50%]">
                <label
                  for="price"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Price</label
                >
                <input
                  type="number"
                  id="price"
                  class="form-input"
                  placeholder="#####"
                  v-model="formData.price"
                />
                <ErrorMessage v-if="errors.price" :error="errors.price" />
              </div>
              <div class="w-[50%]">
                <label for="stock_quantity" class="form-label"
                  >Stock Quantity</label
                >
                <input
                  type="number"
                  class="form-input"
                  id="stock_quantity"
                  placeholder="#####"
                  v-model="formData.stock_quantity"
                />
                <ErrorMessage
                  v-if="errors.stock_quantity"
                  :error="errors.stock_quantity"
                />
              </div>
            </div>
          </div>
          <button
            type="submit"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Edit Product
          </button>
        </form>
      </div>
    </section>
  </AdminLayout>
</template>

<style lang="scss" scoped></style>
