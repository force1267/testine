<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6> <!-- xs12 md4 => Medium screens: use 4/12 (33%) of the screen | Anything smaller(sm): 8/12 -->
            
            
            about us and contact us info and its messages with email sending feature to those messages(users opinion) - FAQ => use ckeditor
            setup head() for seo - use auth store and its user state to bind admin user.email in email field - social media links
            https://gist.github.com/lancejpollard/1978404
  
     <v-alert v-if="alert" :type="alert.type" value="true" dismissible>{{alert.message}}</v-alert>  
  
    </v-flex>
  </v-layout>
</template>

<script>
const suid = require('rand-token').suid
const token = suid(16)
export default {
  data(){
    // all component data here
    return {
      alert: null,
   }
  },
  computed:{
    // recompute any changes back from store state in a run-time manner!
  },
  methods:{
    // all inner methods and store interaction here
  },
  head(){ // https://gist.github.com/lancejpollard/1978404
    // setup seo and other head tags
    return {
      title: 'cds - '+token,
      meta: [
        { hid: 'description', name: 'description', content: token },
        { hid: 'robots', name: 'robots', content: 'noindex,nofollow'}
      ]
    }
  }
  
}
</script>