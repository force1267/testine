

/* ----------------------
* it’s related to the api
* https://github.com/axios/axios
*/

import axios from 'axios'
import {baseURL} from '~/config'
import cookies from 'js-cookie'
import {setAuthToken, resetAuthToken} from '~/utils/auth'

axios.defaults.baseURL = baseURL // setting the axios base url for whole apis url

const token = cookies.get('x-access-token') // get the token from cookie in client side(browser)

if (token) setAuthToken(token) // setting authentication token
else resetAuthToken() // reset authentication token