const getDefaultState = () => {
  return {
    overlay: false,
  }
}

export const state = getDefaultState()

export const actions = {
  toggleOverlay(context, payload) {
    if (!payload) { // reset login errors upon closing dialog
      context.dispatch("login/resetErrors", {},  {root: true})
    }
    context.commit("setOverlay", payload) 
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