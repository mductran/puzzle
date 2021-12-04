import createPersistedState from 'vuex-persistedstate'

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const plugins = [
  createPersistedState({
    key: "user",
    storage: window.localStorage,
  })
]

const getDefaultState = () => {
  return {
    login: false,
    currentUser: {},
    errors: [],
  }
}

export const state = getDefaultState()

export const actions = {
  async login({ commit }, userCredentials) {

    const url = "http://localhost:8000/login"
    
    const response = await fetch(url, {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      body: JSON.stringify(userCredentials)
    })
    
    if (response.status == 200) {
      commit("setCurrentUser", {
        "username": userCredentials.username,
      })
    } 
    else if (response.status >= 400) {
      commit("pushError", response)
    }
  },

  async logout({ commit }) {
    commit("resetState")
  }
}

export const mutations = {
  
  setCurrentUser(state, user) {
    state.currentUser = user
    state.login = true
  },

  resetState(state) {
    Object.assign(state, getDefaultState())
    // wipe persistedState data
    sessionStorage.clear()
  },

  pushError(state, error) {
    state.errors.push(error)
  },
}

export const getters = {
  getCurrentUser(state) {
    return state.currentUser
  },
  getLogin(state) {
    return state.login
  }
}



// export default new Vuex.Store({
//   plugins: [
//     createPersistedState()
//   ],
//   state: {
//     login: false,
//     currentUser: {},
//     errors: [],
//   },
//   actions: {
//     async login({ commit }, userCredentials) {

//       const url = "http://localhost:8000/login"
      
//       const response = await fetch(url, {
//         method: "POST",
//         mode: "cors",
//         credentials: "include",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         redirect: "follow",
//         body: JSON.stringify(userCredentials)
//       })
      
//       if (response.status == 200) {
//         commit("setCurrentUser", {
//           "username": userCredentials.username,
//         })
//       } 
//       else if (response.status >= 400) {
//         commit("pushError", response)
//       }
//     },

//     async logout({ commit }) {
//       commit("resetState")
//     }
//   },
//   mutations: {
//     setCurrentUser(state, user) {
//       state.currentUser = user
//       state.login = true
//     },

//     resetState(state) {
//       Object.assign(state, getDefaultState())
//       // wipe persistedState data
//       sessionStorage.clear()
//     },

//     pushError(state, error) {
//       state.errors.push(error)
//     },    
//   },
//   getters: () => {
//     return {
//       getCurrentUser(state) {
//         return state.currentUser
//       }
//     }
//   }
// })
