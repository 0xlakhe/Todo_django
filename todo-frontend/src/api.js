import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
});

const myToken = "53c3d6d5dfdfb9d615a9cca9d86592873b70965c";

api.defaults.headers.common["Authorization"] = `Token ${myToken}`;

export default api;
