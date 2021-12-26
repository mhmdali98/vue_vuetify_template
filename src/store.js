import Vue from 'vue'
import Vuex from 'vuex'
import router from './router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
<<<<<<< HEAD
<<<<<<< HEAD
    barColor: 'rgba(0, 0, 0, .8), rgba(0, 0, 0, .8)',
=======
    barColor: '#272727',
>>>>>>> parent of 6afc3d2 (df)
=======
    barColor: '#272727',
>>>>>>> parent of 6afc3d2 (df)
    barImage: '',
    drawer: null,
    idToken: localStorage.getItem('tokin'),
    userId: localStorage.getItem('userId'),
    fullname: localStorage.getItem('fullname'),
    policyNumber: localStorage.getItem('policyNumber'),


  },
  mutations: {
    SET_BAR_IMAGE(state, payload) {
      state.barImage = payload
    },
    SET_DRAWER(state, payload) {
      state.drawer = payload
    },
    SET_SCRIM(state, payload) {
      state.barColor = payload
    },
    authUser(state, userData) {
      state.idToken = userData.token
      state.userId = userData.userId
      state.fullname = userData.fullname
      state.policyNumber = userData.policyNumber



    },
    clearAuth(state) {
      state.idToken = null
      state.userId = null
      state.fullname = null
      state.policyNumber = null
    },
  },
  actions: {
    login({
      commit
    }, userData) {

      localStorage.setItem('tokin', userData.token)
      localStorage.setItem('userId', userData.userId)
      localStorage.setItem('fullname', userData.fullName)
      localStorage.setItem('policyNumber', userData.policyNumber)


      commit('authUser', {
        token: userData.token,
        userId: userData.userId,
        fullname: userData.fullName,
        policyNumber: userData.policyNumber,


      });

      router.push({
        name: 'dashbord'
      });

    },

    logout({
      commit
    }) {
      commit('clearAuth')
      localStorage.setItem("tokin", "")
      localStorage.setItem("userId", "")
      localStorage.setItem('fullname', "")
      localStorage.setItem('policyNumber', "")


    },
  }
})
