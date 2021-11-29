import createPersistedState from 'vuex-persistedstate'

export const plugins = [
  createPersistedState()
]

const getDefaultState = () => {
  return {
    currentUser: {},
    errors: [],
  }
}

export const state = getDefaultState()

export const actions = {
  async login({commit}, userCredentials) {
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
      alert("Login successfully.")
      commit("setCurrentUser")
    } else if (response.status >= 400) {
      commit("pushError", response)
    }
  },

  async logout({commit}) {
    commit("resetState")
  }
}

export const mutations = {
  setCurrentUser(state, user) {
    state.currentUser = user
    state.loggedIn = true
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
  }
}

// export const users = {
//   namespaced: true,
//   plugins,
//   state,
//   actions,
//   mutations,
// }