import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";
export const useStore = defineStore("useStore", () => {
  let products = ref([]);

  const getProducts = async () => {
    try {
      const response = await axios.get("/api/v1/products");
      //   console.log(response.data);
      return response.data;
    } catch (err) {
      console.log(err);
      return err.response.data;
    }
  };
  const getProduct = async (slug) => {
    try {
      const response = await axios.get(`/api/v1/products/${slug}`);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  };

  return {
    products,
    getProducts,
    getProduct,
  };
});
