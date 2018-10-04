

/* -----------------------------------------
   https://vuex.vuejs.org/guide/modules.html
   -----------------------------------------
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
import cookies from 'js-cookie' // to parse and set cookie on client side

/* 
* we defined two state one for user data after successfull login and the other for auth/me route to check the authentication policy
* it would be an override process if we define one state called user cause two routes will use one state for their fetched data and
* we'll lose the first one data which is user state; cause it use computed method to load the data in component and me state use created method.
* set up data observation, compile the template, mount the instance to the DOM, and update the DOM when data changes!
*/

// this store and its state it's for admin only
export const state = () => ({ // here we are setting up a state called user to null at first in our entire components
  user: null
})

/* ----------------------------------------------------------------------------------
*  The only way to actually change state in a Vuex store is by committing a mutation.
*  due to using a single state tree, divide ur store into modules
*/
export const mutations = {
  set_user (store, data) { // setting up our user state to received data from server
    store.user = data
  },
  reset_user (store) { // setting up our user state to null
    store.user = null
  }
}

/* -----------------------------------------------------------------------
* Instead of mutating the state, actions commit mutations.
* Actions can contain arbitrary asynchronous operations.
*/
export const actions = { // actions are promises that we can use .then and .catch in them
  fetch ({commit}) {
    return api.auth.me() // all client side apis are in api folder; see index.js inside api folder
      .then(response => {
        commit('set_user', response.data.user) // set the user state in sotre to fetched data from auth/me route
        return response
      })
      .catch(error => {
        commit('reset_user') // if there was any error then reset the user state
        return error
      })
  },
  update({commit}, data){ // update action to edit admin info
    return api.auth.update(data) // call the update api
      .then(response => {
        commit('set_user', response.data.updatedData) // commit the current user to updated info; now user state has a fresh info!
        return response
      })
      .catch(error=>{
        commit('reset_user')
        return error
      })
  },
  upload({commit}, data){ // upload action to update avatar
    return api.auth.upload(data)
      .then(response => {
        commit('set_user', response.data.updatedData)
        return response
      })
      .catch(error=>{
        commit('reset_user')
        return error
      })
  },
  login ({commit}, data) { // we'll fill the store using login action
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