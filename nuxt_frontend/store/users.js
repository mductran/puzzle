import createPersistedState from 'vuex-persistedstate'
import Vue from 'vue'

import {
  parseJwt,
} from "../utils/token"

const getDefaultState = () => {
  return {
    login: false,
    currentUser: {},
    access_expired: false,
    refresh_expired: false,
  }
}


export const plugins = [
  createPersistedState({
    key: "user",
    storage: window.sessionStorage,
  })
]

export const state = getDefaultState()

export const actions = {

  async register(context, payload) {
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

    if (response.status == 201) {
      alert("Successfully registered. Please login again.")
      this.app.router.push("/")
    } else {
      alert("Error")
    }

  },

  async login(context, userCredentials) {

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
      const result = {
        ...await (response.json())
      }

      const parsedAccess = parseJwt(result.access)

      const currentUser = {
        username: userCredentials.username,
        id: parsedAccess.user_id,
        exp: parsedAccess.exp
      }

      context.commit("setCurrentUser", currentUser)
      context.dispatch("header/toggleOverlay", false, {
        root: true
      })
    } else if (response.status >= 400) {
      const message = "Incorrect username or password"
      context.dispatch("login/setLoginErrors", message, {
        root: true
      })
    }
  },

  async refresh(context, payload) {
    const url = "http://localhost:8000/refresh/"

    const response = await fetch(url, {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "applicaton/json"
      },
      redirect: "follow",
      body: JSON.stringify(payload)
    })

    if (response.status == 200) {
      // TODO
    } else {
      // sign out and wipe state if refresh fail
      context.commit("logout")
    }
  },

  async logout(context) {
    context.commit("resetState")
  },

  setAccessExpired(context, status) {
    context.commit("setAccessExpired", status)
  },

  setRefreshExpired(context, status) {
    context.commit("setRefreshExpired", status)
  },
}

export const mutations = {

  setCurrentUser(state, user) {
    Vue.set(state, "currentUser", user)
    Vue.set(state, "login", true)
  },

  setAccessExpired(state, status) {
    // state.access_expired = status
    Vue.set(state, "access_expired", status)
  },

  setRefreshExpired(state, status) {
    // state.refresh_expired = status
    Vue.set(state, "refresh_expired", status)
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
  getErrors(state) {
    return state.errors
  },
  getLogin(state) {
    return state.login
  },
  getAccessIsExpired(state) {
    return state.access_expired
  },
  getRefreshIsExpired(state) {
    return state.refresh_expired
  }
}
