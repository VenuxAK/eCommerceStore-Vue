import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";
import auth from "../../../stores/auth/auth";

const { getToken } = auth();
export const makeCategory = defineStore("makeCategory", () => {
  let categories = ref([]);
  let sub_categories = ref([]);

  const createCategory = async (category) => {
    const { name, thumbnail } = category;
    try {
      const token = await getToken();
      if (!token) {
        throw new Error("Unauthenticated!");
      }
      await axios.get("/sanctum/csrf-cookie");
      const response = await axios.post(
        "/api/v1/categories",
        {
          name,
          thumbnail,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log(response.data);
      return response.data;
    } catch (err) {
      const error = err.response.data;
      // console.log("Error!!!", error);
      return error;
    }
  };

  const updateCategory = async (slug, category) => {
    try {
      const token = await getToken();
      if (!token) {
        throw new Error("Unauthenticated!");
      }
      await axios.get("/sanctum/csrf-cookie");
      const response = await axios.patch(
        `/api/v1/categories/${slug}/update`,
        {
          name: category.name,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (err) {
      console.log(err.response.data);
      return err.response.data;
    }
  };

  const deleteCategory = async (slug) => {
    try {
      const token = await getToken();
      if (!token) {
        throw new Error("Unauthenticated!");
      }
      await axios.get("/sanctum/csrf-cookie");
      const response = await axios.delete(`/api/v1/categories/${slug}/delete`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 204) {
        return true;
      }
    } catch (err) {
      console.log(err.response);
      return err.response;
    }
  };

  const createSubCategory = async (category_id, name) => {
    try {
      const token = await getToken();
      if (!token) {
        throw new Error("Unauthenticated!");
      }
      await axios.get("/sanctum/csrf-cookie");
      const response = await axios.post(
        "/api/v1/products/types/create",
        {
          name,
          category_id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return true;
    } catch (err) {
      console.log(err.response.data);
      return err.response.data;
    }
  };

  const updateSubCategory = async (name, slug) => {
    try {
      const token = await getToken();
      if (!token) {
        throw new Error("Unauthenticated!");
      }
      await axios.get("/sanctum/csrf-cookie");
      const response = await axios.patch(
        `/api/v1/products/types/${slug}/update`,
        {
          name,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (err) {
      console.log(err);
      return err.response;
    }
  };

  const deleteSubCategory = async (slug) => {
    try {
      const token = await getToken();
      if (!token) {
        throw new Error("Unauthenticated!");
      }
      await axios.get("/sanctum/csrf-cookie");
      const response = await axios.delete(
        `/api/v1/products/types/${slug}/delete`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 204) {
        return true;
      }
    } catch (err) {
      console.log(err.response);
      return err.response;
    }
  };
  return {
    createCategory,
    updateCategory,
    deleteCategory,
    createSubCategory,
    updateSubCategory,
    deleteSubCategory,
  };
});
