import ls from "local-storage";
import router from "@/router";
import {
  SET_ACCOUNT_INFO,
  REMOVE_ACCOUNT_INFO,
  SET_CONFIG_LIST,
} from "@/store/mutation-types";

export default {
  [SET_ACCOUNT_INFO](state, accountInfo) {
    state.accountInfo = accountInfo;
    state.logged = true;
  },
  [REMOVE_ACCOUNT_INFO](state) {
    ls.remove("authen");
    state.accountInfo = {};
    state.logged = false;
    router.push({ name: "account-login" });
  },
  [SET_CONFIG_LIST](state, configList) {
    state.configList = configList;
  },
};
