


import axios from 'axios'

export function setAuthToken (token) {
  // here we are setting the token to all axios headers
  axios.defaults.headers.common['x-access-token'] = token
}

export function resetAuthToken () {
  // here we are deleting the token from all axios headers
  delete axios.defaults.headers.common['x-access-token']
}