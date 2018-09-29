

// TODO: we need to commit our state in each action otherwise won't have the run-time feature and computed method will be meaningless!
// TODO: this store is returned null in computed method!

import api from '~/api'

export const state = () => ({
  comments: null
})

// fill the state
export const mutations = {
  set_comment (store, data) {
    store.comments = data
  },
  reset_comment (store) {
    store.comments = null
  }
}

// interact with database and commit mutations
export const actions = {
  fetch ({commit}) {
    return api.comment.getAll()
      .then(response => {
        commit('set_comment', response.data.comments)
        return response
      })
      .catch(error => {
        commit('reset_comment')
        return error
      })
  },
  getComment({commit}, cuid){ // it might be usefull later
    return api.comment.getComment(cuid)
      .then(response=>{
        return response
      })
      .catch(error=>{
        return error
      })
  },
  updateComment({commit}, data){
    return api.comment.updateComment(data)
      .then(response => {
        return response
      })
      .catch(error=>{
        return error
      })
  },
  addComment({commit}, data){
    return api.comment.updateComment(data)
      .then(response => {
        return response
      })
      .catch(error=>{
        return error
      })
  },
  deleteComment({commit}, cuid) {
    return api.comment.deleteComment(cuid)
      .then(response => {
        return response
      })
      .catch(error=>{
          return error
      })
  }
}