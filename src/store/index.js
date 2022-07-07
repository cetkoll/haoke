import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    haokeUser: {},
    nowCity: '北京',
    nowCityId: 'AREA|88cff55c-aaa4-e2e0',
    activeCity: 'AREA|0dd58113-90ab-4d85',
    resData: [],
    adress: ''
  },
  getters: {
  },
  mutations: {
    setToken (state, payload) {
      state.haokeUser = payload
    },
    changeNowCity (state, payload) {
      state.nowCity = payload
    },
    changeNowCityId (state, payload) {
      state.nowCityId = payload
    },
    setActiveCity (state, payload) {
      state.activeCity = payload
    },
    setResData (state, payload) {
      state.resData = payload
    },
    setAdress (state, payload) {
      state.adress = payload
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [vuexLocal.plugin]
})
