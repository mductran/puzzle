import createPersistedState from 'vuex-persistedstate'

export const plugins = [
  createPersistedState()
]

const getDefaultState = () => {
  return {
    posts: [],
    currentPost: [],
    errors: [],
    total_pages: 0,
    current_page: 0,
    next: "",
    prev: "",
  }
}

export const state = getDefaultState()


export const actions = {
  switchPage({ commit }, page) {
    commit('setCurrentPage', page)
  },

  async getPosts({ commit }, page = 1) {
    commit("wipePost")
    const url = "http://localhost:8000/posts?page=" + page
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
    const res = await (response.json())

    if (response.status == 200) {
      commit("setPosts", res.results)
      commit("setTotalPages", res.total_pages)
      if (res.links.next) {
        commit("setNext", res.links.next)
      }
      if (res.links.prev) {
        commit("setPrev", res.links.prev)
      }
    } else if (res.status >= 400) {
      commit("pushError", res)
    }
  },

  async getPost({ commit }, postId) {
    const url = "http://localhost:8000/posts/" + postId
    const respones = await fetch(url, {
      method: "GET",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      body: JSON.stringify()
    })
    const res = await (response.json())
    if (response.status == 200) {
      commit("setCurrentPage", res)
    } else if (response.status >= 400) {
      commit("pushError", res)
    }
  },
}

export const mutations = {
  wipePost(state) {
    state.posts.length = 0
  },

  resetState(state) {
    Object.assign(state, getDefaultState())
  },

  setPosts(state, posts) {
    for (let i = 0; i < posts.length; i++) {
      state.posts.push(posts[i])
    }
  },

  setTotalPages(state, pageCount) {
    state.total_page = pageCount
  },

  setCurrentPage(state, currentPage) {
    state.current_page = currentPage
  },

  setCurrentPost(state, newPost) {
    state.current_page = newPost 
  },

  setNext(state, nextLink) {
    state.next = nextLink
  },

  setPrev(state, prevLink) {
    state.prev = prevLink
  },

  setCurrentPage(state, page) {
    state.current_page = page
  },

  setTotalPages(state, totalPages) {
    state.total_pages = totalPages
  },

  pushError(state, error) {
    state.errors.push(error)
  }
}

export const getters = {
  getPosts(state) {
    return state.posts
  },
  getCurrentPost(state) {
    return state.currentPost
  },
  getCurrentPage(state) {
    return state.current_page
  },
  getTotalPages(state) {
    return state.total_pages
  }
}