import Vue from "vue";
import Vuex from "vuex";
import router from "./router";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    barColor: "#272727",
    barImage: "",
    drawer: null,
    idToken: localStorage.getItem("tokin"),
    userId: localStorage.getItem("userId"),
    fullname: localStorage.getItem("fullname"),
    ognaizationId: localStorage.getItem("ognaizationId"),
    ognaizationName: localStorage.getItem("ognaizationName"),
    roleId: localStorage.getItem("roleId"),
    roleName: localStorage.getItem("roleName"),
    userName: localStorage.getItem("userName")

  },
  mutations: {
    SET_BAR_IMAGE(state, payload) {
      state.barImage = payload;
    },
    SET_DRAWER(state, payload) {
      state.drawer = payload;
    },
    SET_SCRIM(state, payload) {
      state.barColor = payload;
    },
    authUser(state, userData) {
      state.userId = userData.userId;
      state.fullname = userData.fullname;
      state.ognaizationId = userData.ognaizationId;
      state.ognaizationName = userData.ognaizationName;
      state.roleId = userData.roleId;
      state.roleName = userData.roleName;
      state.userName = userData.userName;

    },
    clearAuth(state) {
      state.userId = null;
      state.fullname = null;
      state.ognaizationId = null;
      state.ognaizationName = null;
      state.roleId = null;
      state.roleName = null;
      state.userName = null;

    }
  },
  actions: {
    login({ commit }, userData) {
      // localStorage.setItem('tokin', userData.token)
      localStorage.setItem("userId", userData.id);
      localStorage.setItem("fullname", userData.fullName);
      localStorage.setItem("ognaizationId", userData.ognaizationId);
      localStorage.setItem("ognaizationName", userData.ognaizationName);
      localStorage.setItem("roleId", userData.roleId);
      localStorage.setItem("roleName", userData.roleName);
      localStorage.setItem("userName", userData.userName);

      commit("authUser", {
        // token: userData.token,
        userId: userData.userId,
        fullname: userData.fullName,
        ognaizationId: userData.ognaizationId,
        ognaizationName: userData.ognaizationName,
        roleId: userData.roleId,
        roleName: userData.roleName,
        userName: userData.userName
      });

      router.push({
        name: "dashbord"
      });
    },

    logout({ commit }) {
      commit("clearAuth");
      localStorage.setItem("userId", "");
      localStorage.setItem("fullname", "");
      localStorage.setItem("userId", "");
      localStorage.setItem("fullname", "");
      localStorage.setItem("ognaizationId", "");
      localStorage.setItem("ognaizationName", "");
      localStorage.setItem("roleId", "");
      localStorage.setItem("roleName", "");
      localStorage.setItem("userName", "");
    }
  }
});
