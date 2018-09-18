

/* ---------------------------------
* All api requests collected in here
*/

import axios from 'axios'

// here we'll define an object of all methods for each route in server side
export default {
  auth: {
    me: () => axios.get('auth/me'), // fetch user after successfull login like token and its payload in order to just check that we have a user with token! see auth/fetch in auth.js store file and auth/me in auth.route.js
    login: (data) => axios.post('auth/login', data), // we need the data object to save user info in db and set retrieved token in client cookie along with other user info to welcome him in cds-setup.vue
    update: (data) => axios.post('auth/update', data), // sending data object containing all updated user ingo to the server
    upload: (data) => axios.post('auth/upload', data) // sending data object containing user avatar to the server
  }
}