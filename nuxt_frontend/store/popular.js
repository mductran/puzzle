import createPersistedState from 'vuex-persistedstate'

export const plugins = [
  createPersistedState()
]

function getDefaultState() {
  return {}
}

export const state = getDefaultState()

export const actions = {
  async getMostPopular({ commit }, page) {
    const url = "http://localhost:8000/popular?page=" + page
    const response = await fetch(url, {
      method: "GET",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      body: JSON.stringify()
    })
  }
}

export const mutations = {

}

export const getters = {

}