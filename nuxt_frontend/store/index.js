import createPersistedState from 'vuex-persistedstate'

export const plugins = [
  createPersistedState({
    storage: window.sessionStorage,
  })
]

// export const state = {
//   beforeRoute: "http://localhost:3000"
// }

// export const actions = {
//   setLastBeforeRoute({ commit }, route) {
//     commit("setLastBeforeRoute", route)
//   }
// }

// export const mutations = {
//   setLastBeforeRoute(state, route) {
//     state.beforeRoute = route
//   }
// }
