

/* ---------------------------------
* All api requests collected in here
*/

import axios from 'axios'

// here we'll define an object of all methods for each route in server side
export default {
  auth: {
    me: () => axios.get('auth/me'), // fetch user after successfull login like token and its payload in order to just check that we have a user with token! see auth/fetch in auth.js store file and auth/me in auth.route.js
    login: (data) => axios.post('auth/login', data) // we need the data object to set token in client cookie and other user info to welcome him in cds-setup.vue
  }
}