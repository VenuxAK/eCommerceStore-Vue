import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";
import auth from "../../auth/auth";
const { getToken } = auth();

export const makeStore = defineStore("makeStore", () => {
  let products = ref([]);

  const createProduct = async (product) => {
    const { title, description, images, sub_category, price, stock_quantity } =
      product;

    try {
      const token = await getToken();
      if (!token) {
        throw new Error("Authentication required!");
      }
      const response = await axios.post(
        "/api/v1/products",
        {
          name: title,
          description,
          price,
          stock_quantity,
          product_type_id: sub_category,
          images: images,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // console.log(response);
      return response;
    } catch (err) {
      // console.log("Error!", err.response.data);
      return err.response.data;
    }
  };
  const updateProduct = async (product, slug) => {
    try {
      // console.log(product,slug);
      const token = await getToken();
      if (!token) {
        throw new Error("Authentication required!");
      }
      const response = await axios.put(
        `/api/v1/products/${slug}/update`,
        {
          name: product.name,
          description: product.description,
          product_type_id: product.product_type,
          price: product.price,
          stock_quantity: product.stock_quantity,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response;
    } catch (err) {
      // console.log(err);
      return err.response.data ?? err;
    }
  };
  const deleteProduct = async (slug) => {
    try {
      const token = await getToken();
      if (!token) {
        throw new Error("Authentication Required");
      }
      const response = await axios.delete(`/api/v1/products/${slug}/delete`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response;
    } catch (err) {
      console.log(err);
      return err.response;
    }
  };

  return {
    createProduct,
    updateProduct,
    deleteProduct,
  };
});
