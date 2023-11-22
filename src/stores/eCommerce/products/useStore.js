import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";
export const useStore = defineStore("useStore", () => {
  let products = ref([]);

  const raw = async (uri) => {
    try {
      const response = await axios.get(uri);
      return response.data;
    } catch (err) {
      console.log(err);
      return err;
    }
  };

  const getProducts = async (query = "") => {
    try {
      const response = await axios.get(`/api/v1/products?${query}`);
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
      // console.log(err.response.data);
      return err.response.data || err;
    }
  };

  return {
    products,
    getProducts,
    getProduct,
    raw,
  };
});
