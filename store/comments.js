

// we need to commit our state in each action otherwise 
// won't have the run-time feature and computed method will be meaningless!

import api from '~/api'

export const state = () => ({
    list: null
})

// fill the state
export const mutations = {
  set_comment (store, data) {
    store.list = data
  },
  reset_comment (store) {
    store.list = null
  }
}

// interact with database and commit mutations
export const actions = {
  async fetch ({ commit }) {
    const { data } = await api.comment.fetchAll()
    commit('set_comment', data)
  },
  getComment({commit}, cuid){
    return api.comment.getComment(cuid)
      .then(response=>{
        return response
      })
      .catch(error=>{
        commit('reset_comment')
        return error
      })
  },
  updateComment({commit}, data){
    return api.comment.updateComment(data)
      .then(response => {
        commit('set_comment', response.data.comments)
        return response
      })
      .catch(error=>{
        commit('reset_comment')
        return error
      })
  },
  // dispatch from client side only!
  addComment({commit}, data){
    return api.comment.addComment(data)
      .then(response => {
        // commit('set_comment', response.data.comments)
        return response
      })
      .catch(error=>{
        // commit('reset_comment')
        return error
      })
  },
  deleteComment({commit}, cuid) {
    return api.comment.deleteComment(cuid)
      .then(response => {
        // commit the comments state to all comments after remove the desired one! to feel the run-time manner that we talked about it ;-)
        // so the computed method can recompute any change and show the comments without refreshing the page.
        commit('set_comment', response.data.comments)
        return response
      })
      .catch(error=>{
        commit('reset_comment')
        return error
      })
  }
}