import Vue from 'vue';

const getDefaultState = () => {
  return {
    loginErrors: "",
  }
}

export const state = getDefaultState()

export const actions = {
  setLoginErrors(context, message) {
    context.commit("SET_LOGIN_ERRORS", message)
  },
  resetErrors(context) {
    context.commit("RESET_ERRORS")
  }
}

export const mutations = {
  SET_LOGIN_ERRORS(state, message) {
    Vue.set(state, "loginErrors", message)
  },
  RESET_ERRORS(state) {
    Vue.set(state, 'loginErrors', "")
  }
}

export const getters = {
  getErrors(state) {
    return state.loginErrors
  }
}