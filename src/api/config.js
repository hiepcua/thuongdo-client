// Thư viện
import axios from "axios";
import ls from "local-storage";
import router from "@/router";
import store from "@/store";

// Cấu hình chung
axios.defaults.baseURL = process.env.VUE_APP_API_URL;
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.post["Accept"] = "application/json";

axios.interceptors.request.use(
  (config) => {
    const token = ls.get("authen", "");
    if (token) {
      config.headers.Authorization = `Bearer ${token.data.token}`;
      config.headers["x-organization"] = token.data.user.organization_id;
    } else {
      config.headers.Authorization = "Bearer";
    }
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    let status = error.response.status;
    if (status === 401) {
      const token = ls.get("authen", "");
      if (token) {
        ls.remove("authen");
      }
      store.dispatch("account/removeAccountInfo", null, { root: true });
      router.push({ name: "account-login" });
    }
    return error.response.data;
  }
);
