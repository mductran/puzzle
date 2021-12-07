import Vue from 'vue'
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

  async sharePost({ commit }, payload) {
    const url = "http://localhost:8000/posts/"
    const response = await fetch(url, {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + payload.token
      },
      redirect: "follow",
      body: JSON.stringify(payload.body)
    })
    const result = { ...(await response.json()), status: response.status };
    if (result.status == 201) {
      commit("sharePost", result)
    }
  },

  async shareComment({ commit }, payload) {
    const url = "http://localhost:8000/comments/";
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
      commit("shareComment", result)
    }
  }
}

export const mutations = {
  shareComment(state, newComment) {
    // https://stackoverflow.com/questions/40860592/vuex-getter-not-updating

    console.log(newComment)

    var index = 0
    while (index < state.posts.length) {
      if (state.posts[index].id == newComment.post_id) {
        break
      }
      index++
    }
    // deep copy
    let updatedPost = JSON.parse(JSON.stringify(state.posts[index]))
    updatedPost.comments.push(newComment)
    Vue.set(state.posts, index, updatedPost)
  },

  sharePost(state, newPost) {
    state.posts.unshift(newPost)
  },

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

  setCurrentPage(state, currentPage) {
    state.current_page = currentPage
  },

  setNext(state, nextLink) {
    state.next = nextLink
  },

  setPrev(state, prevLink) {
    state.prev = prevLink
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