const getDefaultState = () => {
  return {
    overlay: false,
  }
}

export const state = getDefaultState()

export const actions = {
  toggleOverlay({ commit }, payload) {
    commit("setOverlay", payload)
  }
}

export const mutations = {
  setOverlay(state, payload) {
    state.overlay = payload
  }
}

export const getters = {
  getOverlay(state) {
    return state.overlay
  }
}