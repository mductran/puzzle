import Vue from 'vue'

const getDefaultState = () => {
  return {
    trades: [],
    errors: [],
    total_pages: 1,
  }
}

export const state = getDefaultState()

export const actions = {
  async getTrades({ commit }, page = 1) {
    const url = "http://localhost:8000/trades?page=" + page
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
      commit("setTrades", res.results)
      commit("setTotalPages", res.total_pages)
    }
  },

  async shareTrades({ commit }, payload) {
    const url = "http://localhost:8000/trades/"
    const response = await fetch(url, {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      redirect: "follow",
      body: JSON.stringify(payload)
    })
    const res = { ...(await response.json()), status: response.status };
    if (res.status == 201) {
      commit("shareTrade", res)
    }
  },

  async shareOffer({ commit }, payload) {
    const url = "http://localhost:8000/offers/";
    const response = await fetch(url, {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      body: JSON.stringify(payload),
    });
    const result = { ...(await response.json()), status: response.status };
    if (result.status == 201) {
      commit("shareOffer", result)
    }
  }
}

export const mutations = {
  setTrades(state, trades) {
    state.trades.length = 0
    for (var i = 0; i < trades.length; i++) {
      state.trades.push(trades[i])
    }
  },

  setTotalPages(state, totalPages) {
    state.total_pages = totalPages
  },

  resetState(state) {
    Object.assign(state, getDefaultState())
  },

  pushError(state, error) {
    state.errors.push(error)
  }
}

export const getters = {
  getTrades(state) {
    return state.trades
  },
  getTotalPages(state) {
    return state.total_pages
  }
}
