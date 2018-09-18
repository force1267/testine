

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


import cookie from 'cookie' // to parse cookie on server side and extract jwt token
import {setAuthToken, resetAuthToken} from '~/utils/auth'

/* 
Vuex uses a single state tree - that is, this single object 
contains all your application level state and serves as the 
"single source of truth". This also means usually you will have 
only one store for each application. A single state tree makes it 
straightforward to locate a specific piece of state, and allows 
us to easily take snapshots of the current app state for debugging purposes
Actions are triggered with the store.dispatch method
If the action nuxtServerInit is defined in the store, 
Nuxt.js will call it with the context (only from the server-side).
It's useful when we have some data on the server we want to give directly to the client-side.
For example, let's say we have sessions on the server-side 
and we can access the connected user through req.session.user. 
To give the authenticated user to our store, we update our store/index.js to the following
*/

export const actions = {
  nuxtServerInit ({dispatch}, context) { // nuxServerInit interact with server stuff in nuxt project so we can act like server here..
    return new Promise((resolve, reject) => {
      // parse the cookie header and pass it into the axios config on server side 
      const cookies = cookie.parse(context.req.headers.cookie || '')
      if (cookies.hasOwnProperty('x-access-token')) {
        setAuthToken(cookies['x-access-token'])
        dispatch('auth/fetch')
          .then(result => {
            resolve(true)
          })
          .catch(error => {
            console.log('fetch user error', error)
            resetAuthToken()
            resolve(false)
          })
      } else {
        resetAuthToken()
        resolve(false)
      }
    })
  }
}

/* Async functions can make use of the await expression. 
This will pause the async function and wait for the Promise to resolve prior to moving on. 
https://medium.com/@tkssharma/writing-neat-asynchronous-node-js-code-with-promises-async-await-fa8d8b0bcd7c
*/