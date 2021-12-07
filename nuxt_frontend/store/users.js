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

const parseJwt = (token) => {
  var base64Url = token.split('.')[1]
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
  var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
  }).join(''))

  return JSON.parse(jsonPayload);
}

export const state = getDefaultState()

export const actions = {

  async register({ commit }, payload) {
    const url = "http://localhost:8000/accounts/"

    const response = await fetch(url, {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      body: JSON.stringify(payload)
    })

    const result = { ...(await response.json()), status: response.status };

    if (response.status == 201) {
      alert("Successfully registered")
    }
    else {
      alert(response)
    }

  },

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
      const result = {...await(response.json())}
      const parsedAccess = parseJwt(result.access)
      const currentUser = {
        username: userCredentials.username,
        id: parsedAccess.user_id,
        exp: parsedAccess.exp
      }
      commit("setCurrentUser", currentUser)
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