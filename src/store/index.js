import Vue from "vue";
import Vuex from "vuex";

/**
 * -----------------------------------------------------------------------------------------------------------
 * Loading vuex modules
 * -----------------------------------------------------------------------------------------------------------
 */
import account from "@/views/account/store";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    path: "",
    full_path: "",
  },
  getters: {
    path: (state) => state.path,
    full_path: (state) => state.full_path,
  },
  mutations: {
    setPath(state, path) {
      state.path = path;
    },
    setFullPath(state, full_path) {
      state.full_path = full_path;
    },
  },
  actions: {
    setPath({ commit }, path) {
      commit("setPath", path);
    },
    setFullPath({ commit }, full_path) {
      commit("setFullPath", full_path);
    },
  },
  modules: {
    account,
  },
});
