<script setup>
import { onMounted, ref } from "vue";
import AdminLayout from "../../../layouts/AdminLayout.vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "../../../stores/eCommerce/products/useStore";
import { makeStore } from "../../../stores/eCommerce/products/makeStore";

const router = useRouter();
const props = defineProps(["slug"]);

const product = ref(null);
const { getProduct } = useStore();

const { deleteProduct } = makeStore();

const onDelete = async (slug) => {
  if (confirm("Are you sure want to delete?")) {
    const response = await deleteProduct(slug);
    if (response.status === 204) {
      router.push("/admin/products");
    }
  }
};

onMounted(async () => {
  const response = await getProduct(props.slug);
  product.value = response.product;
  // console.log(product.value);
});
</script>
<template>
  <AdminLayout>
    <section v-if="product">
      <div class="mb-6 mt-3">
        <!-- <h1 class="adm-title">{{ product.name }}</h1> -->
      </div>
      <div class="bg-gray-100 dark:bg-gray-800 py-8">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex flex-col md:flex-row -mx-4">
            <div class="md:flex-1 px-4">
              <div
                class="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4"
              >
                <img
                  class="w-full h-full object-cover"
                  src="https://cdn.pixabay.com/photo/2020/05/22/17/53/mockup-5206355_960_720.jpg"
                  alt="Product Image"
                />
              </div>
              <div class="flex -mx-2 mb-4">
                <div class="w-1/2 px-2">
                  <RouterLink
                    :to="`/admin/products/${product.slug}/edit`"
                    class="w-full block text-center bg-gray-900 dark:bg-gray-600 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700"
                  >
                    Edit
                  </RouterLink>
                </div>
                <div class="w-1/2 px-2">
                  <button
                    @click="onDelete(product.slug)"
                    class="w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-4 rounded-full font-bold hover:bg-gray-300 dark:hover:bg-gray-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
            <div class="md:flex-1 px-4">
              <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                {{ product.name }}
              </h2>
              <p class="text-gray-600 dark:text-gray-300 text-sm mb-4">
                {{ product.description }}
              </p>
              <div class="flex mb-4">
                <div class="mr-4">
                  <span class="font-bold text-gray-700 dark:text-gray-300"
                    >Price:</span
                  >
                  <span class="text-gray-600 dark:text-gray-300">
                    ${{ product.price }}
                  </span>
                </div>
                <div>
                  <span class="font-bold text-gray-700 dark:text-gray-300"
                    >Availability:</span
                  >
                  <span class="text-gray-600 dark:text-gray-300">In Stock</span>
                </div>
              </div>
              <div class="mb-4">
                <span class="font-bold text-gray-700 dark:text-gray-300"
                  >Select Color:</span
                >
                <div class="flex items-center mt-2">
                  <button
                    class="w-6 h-6 rounded-full bg-gray-800 dark:bg-gray-200 mr-2"
                  ></button>
                  <button
                    class="w-6 h-6 rounded-full bg-red-500 dark:bg-red-700 mr-2"
                  ></button>
                  <button
                    class="w-6 h-6 rounded-full bg-blue-500 dark:bg-blue-700 mr-2"
                  ></button>
                  <button
                    class="w-6 h-6 rounded-full bg-yellow-500 dark:bg-yellow-700 mr-2"
                  ></button>
                </div>
              </div>
              <div class="mb-4">
                <span class="font-bold text-gray-700 dark:text-gray-300"
                  >Select Size:</span
                >
                <div class="flex items-center mt-2">
                  <button
                    class="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600"
                  >
                    S
                  </button>
                  <button
                    class="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600"
                  >
                    M
                  </button>
                  <button
                    class="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600"
                  >
                    L
                  </button>
                  <button
                    class="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600"
                  >
                    XL
                  </button>
                  <button
                    class="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600"
                  >
                    XXL
                  </button>
                </div>
              </div>
              <div>
                <span class="font-bold text-gray-700 dark:text-gray-300"
                  >Product Description:</span
                >
                <p class="text-gray-600 dark:text-gray-300 text-sm mt-2">
                  {{ product.description }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </AdminLayout>
</template>

<style lang="scss" scoped></style>
