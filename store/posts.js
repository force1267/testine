

import api from '~/api'

export const state = () => ({
    list: null
    // ,
    // relcom: null
})

export const mutations = {
    set_post (store, data){
        store.list = data
    },
    // set_com (store, data){
  //   store.relcom = data
  // },
  // reset_com(store){
  //   store.relcom = null
  // },
    reset_post(store){
        store.list = null
    }
}

export const actions = {
  async fetch ({ commit }) {
      const { data } = await api.post.fetchAll()
      commit('set_post', data)
      },

    // get them with response object in admin side vue ; don't use any state in here to save the fetched comments
    getrelatedComments({commit}, cuid){ // usefull in none single page mode to fetch all comments related to a post
        return api.post.getrelatedComments(cuid)
          .then(response=>{
            // commit('set_com', response.data.post)
            return response
          })
          .catch(error=>{
            // commit('reset_com')
            return error
          })
      },

      updatePost({commit}, data){
        return api.post.updatePost(data)
          .then(response => {
            commit('set_post', response.data)
            return response
          })
          .catch(error=>{
            commit('reset_post')
            return error
          })
      },
      // dispatch from admin side only! and fill the state with fetched posts 
      // so the mcc section will update with the whole bunch of new posts in a real-time manner
      addPost({commit}, data){
        return api.post.addPost(data)
          .then(response => {
            commit('set_post', response.data)
            return response
          })
          .catch(error=>{
            commit('reset_post')
            return error
          })
      },
      submitPost({commit}, cuid){
        return api.post.submitPost(cuid)
        .then(response=>{
          commit('set_post', response.data)
          return response
        })
        .catch(error=>{
          commit('reset_post')
          return error
        })
      },
      blockPost({commit}, cuid){
        return api.post.blockPost(cuid)
        .then(response=>{
          commit('set_post', response.data)
          return response
        })
        .catch(error=>{
          commit('reset_post')
          return error
        })
    
      },
      deletePost({commit}, cuid) {
        return api.post.deletePost(cuid)
          .then(response => {
            // commit the posts state to all posts after remove the desired one! to feel the run-time manner that we talked about it ;-)
            // so the computed method can recompute any change and show the posts without refreshing the page.
            commit('set_post', response.data)
            return response
          })
          .catch(error=>{
            commit('reset_post')
            return error
          })
      },
      // don't commit the post state ; 
      // use the response object in client side vue 
      // to get a single post using response object
      // dispatch from client side only!
      getPost(cuid){
        return api.post.getPost(cuid)
        .then(response=>{
        //   commit('set_post', response.data)
          return response
        })
        .catch(error=>{
        //   commit('reset_post')
          return error
        })
      }
}