import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuth = defineStore("authStore", () => {
  let user = ref(null);
  let token = ref(null);

  const getToken = async () => {
    try {
      let response = await axios.get("/api/get-token");
      token.value = response.data.token;
      return response.data.token;
    } catch (err) {
      // console.log(err);
      return null;
    }
  };

  const onAuthState = async () => {
    try {
      token.value = await getToken();
      if (!token.value) {
        throw Error("Authentication require!");
      }
      let response = await axios.get("/api/user", {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      });
      user.value = response.data.user;
      return response.data.user;
    } catch (err) {
      console.log(err.message);
      return null;
    }
  };

  const logout = async () => {
    try {
      const token = await getToken();
      if (!token) {
        throw Error("You are not authenticated yet.");
      }
      const response = await axios.post(
        "/api/auth/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 204) {
        user.value = null;
        return true;
      }
    } catch (err) {}
  };

  return {
    user,
    token,
    getToken,
    onAuthState,
    logout,
  };
});
