import Vue from 'vue'
import createPersistedState from 'vuex-persistedstate'

export const plugins = [
  createPersistedState()
]

const getDefaultState = () => {
  return {
    items: [],
    currentItem: [],
    errors: [],
  }
}

export const state = getDefaultState()

export const actions = {
  async getItem({ commit }, id) {
    const url = "http://localhost:8000/items?=" + page
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
    const res = await(response.json())

    if (response.status == 200) {
      commit("SET_POST", res.results)
      commit("SET_TOTAL_PAGES", res.total_pages)
    }
    else if (res.status >= 400) {
      commit("PUSH_ERROR", res)
    }
  }, 
  
  async addItems({ commit }, payload) {
    const url = "http://localhost:8000/items"
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

    if (result.status == 200) {
      alert("Item added to store")
    }
    else {
      alert("Something went wrong")
    }
  }
  
}

export const mutations = {
  SET_CURRENT_ITEM(state, currentItem) {
    // empty then push
    state.currentItem.length = 0
    state.currentItem.push(currentItem)
  }
}

export const getters = {
  getCurrentItem(state) {
    return state.currentItem
  },
  getErrors(state) {
    return state.errors
  }
}