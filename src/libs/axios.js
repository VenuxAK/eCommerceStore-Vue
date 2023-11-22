import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000";
// axios.defaults.baseURL = "http://192.168.1.31:8000";
axios.defaults.headers.common.Accept = "application/json";
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.withCredentials = true;
