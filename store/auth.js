

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
the cookie in the browser. The second one will parse the cookie header on server side
and we can access our token. We’ll not use api requests directly from components and pages, 
but dispatch an action to the store instead
*/


import api from '~/api'
import {setAuthToken, resetAuthToken} from '~/utils/auth'
import cookies from 'js-cookie' // to parse cookie on client side

export const state = () => ({ // here we are setting up a state called user to null at first in our entire components
  user: null
})

/* ----------------------------------------------------------------------------------
*  The only way to actually change state in a Vuex store is by committing a mutation.
*/
export const mutations = {
  set_user (store, data) { // setting up our user state to received data from server
    store.user = data
  },
  reset_user (store) { // setting up our user state to null
    store.user = null
  }
}

/* --------------------------------------------------------
* Instead of mutating the state, actions commit mutations.
* Actions can contain arbitrary asynchronous operations.
*/
export const actions = {
  fetch ({commit}) {
    return api.auth.me() // all client side apis are in api folder; see index.js inside api folder
      .then(response => {
        commit('set_user', response.data.result) // commit(change/set) the user in sotre to fetched data
        return response
      })
      .catch(error => {
        commit('reset_user') // if there was any error then reset the user data
        return error
      })
  },
  login ({commit}, data) {
    return api.auth.login(data) // all client side apis are in api folder; see index.js inside api folder
      .then(response => {
        commit('set_user', response.data.user) // commit(change/set) the user in sotre to returned data from /login route 
        setAuthToken(response.data.token) // set authentication token
        cookies.set('x-access-token', response.data.token, {expires: 60*60*24*30}) // storing received token from the server in cookie
        return response // return the whole response to the client
      })
  },
  reset ({commit}) { // logout process 
    commit('reset_user')  // set user data to null
    resetAuthToken() // delete authentication token
    cookies.remove('x-access-token') // remove the token from cookies
    return Promise.resolve() // solve any error
  }
}