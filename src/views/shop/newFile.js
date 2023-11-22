import { watch } from "vue";
import {
  router,
  routeParamChange,
  fetchSubCategoryProducts,
  fetchProducts,
} from "./Shop.vue";

watch(
  () => router.currentRoute.value.query,
  async (toQuery, fromQuery) => {
    // console.log("Route parameters changes:", toQuery, fromQuery);
    let query = toQuery;
    routeParamChange.value = query;

    if (query.sub_category) {
      await fetchSubCategoryProducts(query.sub_category);
    } else if (query.price) {
      if (query.price === "low") {
        await fetchProducts("?price=low");
      } else if (query.price === "high") {
        await fetchProducts("?price=high");
      }
    } else {
      await fetchProducts();
    }
  }
);
