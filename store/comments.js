

// we need to commit our state in each action with updated data backed from the server 
// otherwise won't have the run-time feature and computed method will be meaningless on recomputation process!

import api from '~/api'

export const state = () => ({
    list: null
    // relpost: null
})

// fill the state
export const mutations = {
  set_comment (store, data) {
    store.list = data
  },
  // set_post (store, data){
  //   store.relpost = data
  // },
  // reset_post(store){
  //   store.relpost = null
  // },
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
  getrelatedPost({commit}, cuid){ // usefull in none single page mode to fetch single comment
    return api.comment.getrelatedPost(cuid)
      .then(response=>{
        // commit('set_post', response.data.post)
        return response
      })
      .catch(error=>{
        // commit('reset_post')
        return error
      })
  },
  updateComment({commit}, data){
    return api.comment.updateComment(data)
      .then(response => {
        commit('set_comment', response.data)
        return response
      })
      .catch(error=>{
        commit('reset_comment')
        return error
      })
  },
  // dispatch from client side only! and fill the state with fetched comments 
  // so the ccc section will update with the whole bunch of new comments in a real-time manner
  addComment({commit}, data){
    return api.comment.addComment(data)
      .then(response => {
        commit('set_comment', response.data)
        return response
      })
      .catch(error=>{
        commit('reset_comment')
        return error
      })
  },
  submitComment({commit}, cuid){
    return api.comment.submitComment(cuid)
    .then(response=>{
      commit('set_comment', response.data)
      return response
    })
    .catch(error=>{
      commit('reset_comment')
      return error
    })
  },
  blockComment({commit}, cuid){
    return api.comment.blockComment(cuid)
    .then(response=>{
      commit('set_comment', response.data)
      return response
    })
    .catch(error=>{
      commit('reset_comment')
      return error
    })

  },
  deleteComment({commit}, cuid) {
    return api.comment.deleteComment(cuid)
      .then(response => {
        // commit the comments state to all comments after remove the desired one! to feel the run-time manner that we talked about it ;-)
        // so the computed method can recompute any change and show the comments without refreshing the page.
        commit('set_comment', response.data)
        return response
      })
      .catch(error=>{
        commit('reset_comment')
        return error
      })
  },
  // this action will load all related comments to a post_cuid for client side only!
  // and show them using response object in your post vue on client side
  // dont commit the list state cause it'll lose the perviouse data ; u can use another state
  // to sotre all comments related to a single post in it or u can use response object on client side 
  // to fetch those comments.
  getAllForClient(cuid){
    return api.comment.getAllForClient(cuid)
    .then(response=>{
      return response // get all comments in client side vue post using response object
    })
    .catch(error=>{
      return error
    })
  }
}