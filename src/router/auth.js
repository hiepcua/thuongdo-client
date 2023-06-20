import ls from "local-storage";
import store from "@/store";
const requireAuth = (to, from, next) => {
  let path = to.path;
  let split = path.split("/");
  store.dispatch("setPath", split[1]);
  store.dispatch("setFullPath", path);
  let token = ls.get("authen");
  if (!token) {
    next({
      path: "/login",
    });
  } else {
    next();
  }
};

const requireAuthV2 = (to, from, next) => {
  let path = to.path;
  let split = path.split("/");
  store.dispatch("setPath", split[1]);
  store.dispatch("setFullPath", path);
  next();
};

export default {
  requireAuth,
  requireAuthV2,
};
