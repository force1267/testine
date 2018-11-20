

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
  },
  comment:{
    getAllForClient: (cuid) => axios.get('comments/cmnts/client/'+cuid), // get all comments related to a post_cuid for client side only!
    getrelatedPost: (cuid) => axios.get('comments/'+cuid), // get a single post related to a comment cuid
    fetchAll: () => axios.get('comments/all'), // get all comments from database
    updateComment: (data) => axios.put('comments/'+data.cuid, data), // update a single comment; contain comment cuid
    deleteComment: (cuid) => axios.delete('comments/'+cuid), // delete a single comment
    addComment: (data) => axios.post('comments/add-new', data), // add comment into database; only for clients
    submitComment: (cuid) => axios.put('comments/sbt-com/'+cuid), // update the status of comment to true to submit a comment
    blockComment: (cuid) => axios.put('comments/blc-com/'+cuid) // update the status of comment to false to block a comment
 },
 post:{
  getrelatedComments: (cuid) => axios.get('posts/cmnts/admin/'+cuid), // get all comments related to a single post
   fetchAll: () => axios.get('posts/all'), // get all posts
   getPost: (cuid) => axios.get('posts/'+cuid), // get a single post for client side only!
   addPost: (data) => axios.post('posts/add-new', data), // add a new post by admin only!
   updatePost: (data) => axios.put('posts/'+data.cuid, data), // update a single post
   deletePost: (cuid) => axios.delete('posts/'+cuid), // delete a single post
   submitPost: (cuid) => axios.put('posts/able-pst/'+cuid), // enable a single post
   blockPost: (cuid) => axios.put('posts/dsble-pst/'+cuid) // disable a single post
 }
}