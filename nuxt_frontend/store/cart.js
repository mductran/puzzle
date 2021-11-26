import createPersistedState from 'vuex-persistedstate'

export const plugins = [
  createPersistedState()
]

const getDefaultState = () => {
  return {
    cart: [],
    errors: []
  }
}

export const state = getDefaultState()

export const actions = {
  addItemToCart({ commit }, item) {
    commit('addItem', item)
  },
  removeItemFromCart({ commit }, item) {
    commit('removeItem', item)
  },
  wipeCart({ commit }) {
    commit('clearCart')
  }
}

export const mutations = {
  addItem(state, item) {
    for (let i = 0; i < state.cart.length; i++) {
      if (state.cart[i].name === item.name) {
        state.cart[i].quantity += 1
      }
    }
    state.cart.push(item)
  },

  removeItem(state, item) {
    for (let i = 0; i < state.cart.length; i++) {
      if (state.cart[i].name === item.name) {
        state.cart.splice(i, 1)
      }
    }
  },

  clearCart(state) {
    Object.assign(state, getDefaultState())
  }
}

// export const cart = {
//   namespaced: true,
//   state,
//   actions,
//   mutations,
//   plugins
// }