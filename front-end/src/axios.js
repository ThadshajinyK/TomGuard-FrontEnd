import axios from "axios";

const instance = axios.create();

instance.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));

    config.baseURL = "/api/";
    config.headers.Authorization = `Bearer ${user?.token}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    return Promise.reject(error);
  }
);

export default instance;
