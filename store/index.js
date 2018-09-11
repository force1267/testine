

/* 
We have to store the auth token somewhere at the client, and this will be cookies. 
We can’t use local storage, because the browser does not send them in request, 
it’s not visible on server side from the nuxt server. Also we’ll push the token into 
the axios setting on client side so that every next request before page reload will 
pass the authentication. And then, on nuxt server side initialization, we have to 
retrieve the cookie header and pass it into the axios config on server side before 
any other fetch / asyncData requests will go. We’ll use js-cookie and cookie packages. 
They are different. The first one works on client side, we’ll use it to set and clear 
the cookie in the browser. The second one will parse the cookie header on server side.
*/


import cookie from 'cookie'
import {setAuthToken, resetAuthToken} from '~/utils/auth'

export const state = () => ({
  sidebar: false
})

export const mutations = {
  toggleSidebar (state) {
    state.sidebar = !state.sidebar
  }
}

export const actions = {
  nuxtServerInit ({dispatch}, context) {
    return new Promise((resolve, reject) => {
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