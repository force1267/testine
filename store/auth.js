

/* ----------------------------
   https://vuex.vuejs.org/guide
   ----------------------------
We have to store the auth token somewhere at the client, and this will be cookies. 
We can’t use local storage, because the browser does not send them in request, 
it’s not visible on server side from the nuxt server. Also we’ll push the token into 
the axios setting on client side so that every next request before page reload will 
pass the authentication. And then, on nuxt server side initialization, we have to 
retrieve the cookie header and pass it into the axios config on server side before 
any other fetch / asyncData requests will go. We’ll use js-cookie and cookie packages. 
They are different. The first one works on client side, we’ll use it to set and clear 
the cookie in the browser. The second one will parse the cookie header on server side.
We’ll not use api requests directly from components and pages, 
but dispatch an action to the store instead
*/


import api from '~/api'
import {setAuthToken, resetAuthToken} from '~/utils/auth'
import cookies from 'js-cookie'

export const state = () => ({
  user: null
})

/* ----------------------------------------------------------------------------------
*  The only way to actually change state in a Vuex store is by committing a mutation.
*/
export const mutations = {
  set_user (store, data) {
    store.user = data
  },
  reset_user (store) {
    store.user = null
  }
}

/* --------------------------------------------------------
* Instead of mutating the state, actions commit mutations.
* Actions can contain arbitrary asynchronous operations.
*/
export const actions = {
  fetch ({commit}) {
    return api.auth.me()
      .then(response => {
        commit('set_user', response.data.result)
        return response
      })
      .catch(error => {
        commit('reset_user')
        return error
      })
  },
  login ({commit}, data) {
    return api.auth.login(data)
      .then(response => {
        commit('set_user', response.data.user)
        setAuthToken(response.data.token)
        cookies.set('x-access-token', response.data.token, {expires: 60*60*24*30})
        return response
      })
  },
  reset ({commit}) {
    commit('reset_user')
    resetAuthToken()
    cookies.remove('x-access-token')
    return Promise.resolve()
  }
}