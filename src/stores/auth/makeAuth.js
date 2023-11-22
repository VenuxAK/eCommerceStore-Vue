import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";
export const makeAuth = defineStore("makeAuth", () => {
  let user = ref(null);
  const register = async (credentials) => {
    const { name, username, email, password, address, phone_no } = credentials;
    await axios.get("/sanctum/csrf-cookie");
    try {
      let response = await axios.post("/api/auth/register", {
        name,
        username,
        email,
        password,
        address,
        phone_no,
      });
      return response.data;
    } catch (err) {
      return err.response.data;
    }
  };
  const login = async (credentials) => {
    const { email, password } = credentials;
    await axios.get("/sanctum/csrf-cookie");
    try {
      const response = await axios.post("/api/auth/login", {
        email,
        password,
      });
      // console.log(response.data);
      return response.data;
    } catch (err) {
      return err.response.data;
    }
  };
  const logout = async () => {};

  return { user, register, login, logout };
});
