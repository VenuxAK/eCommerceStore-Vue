import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useCategory = defineStore("useCategory", () => {
  let categories = ref([]);
  let sub_categories = ref([]);

  const getCategories = async () => {
    try {
      const response = await axios.get("/api/v1/categories");
      //   console.log(response.data);
      return response.data;
    } catch (err) {
      console.log(err.response);
      return err.response;
    }
  };
  const getCategory = async (slug) => {
    try {
      const response = await axios.get(`/api/v1/categories/${slug}`);
      //   console.log(response.data);
      return response.data;
    } catch (err) {
      console.log(err.response);
      return err.response;
    }
  };
  const getSubCategories = async () => {
    try {
      const response = await axios.get("/api/v1/products/types/all");
    //   console.log(response.data);
      return response.data;
    } catch (err) {
      console.log(err.response);
      return err.response;
    }
  };

  return {
    categories,
    sub_categories,
    getCategories,
    getCategory,
    getSubCategories,
  };
});
