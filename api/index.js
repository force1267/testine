

/* ---------------------------------
* All api requests collected in here
*/

import axios from 'axios'

export default {
  auth: {
    me: () => axios.get('auth/me'),
    login: (data) => axios.post('auth/login', data)
  }
}