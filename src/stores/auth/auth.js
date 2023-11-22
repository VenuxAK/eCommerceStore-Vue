import axios from "axios";

const auth = () => {
  let user = null;
  let token = null;

  const getToken = async () => {
    try {
      let response = await axios.get("/api/get-token");
      return response.data.token;
    } catch (err) {
      return null;
    }
  };

  const onAuthState = async () => {
    try {
      token = await getToken();
      if (!token) {
        throw Error("Authentication require!");
      }
      let response = await axios.get("/api/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(response.data.user);
      user = response.data.user;
      return response.data.user;
    } catch (err) {
      // console.log(err.message);
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
};

export default auth;
