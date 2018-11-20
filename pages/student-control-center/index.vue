<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6> <!-- xs12 md4 => Medium screens: use 4/12 (33%) of the screen | Anything smaller(sm): 8/12 -->
            
            use the same admin panel for user registration system with v-if directive
           use vuetify tab to fetch all user with their info in one single page
            this is the control center of registred user like ezapply site
            use live search and admin can add new student edit and delete them
            so we need a new login/registration system based on isAdmin flag structure 
            in ownerinfo document and store getters feature with a dashboard page for our students
            /auth/student/register ==== /auth/login ==== /auth/student/update .....
            we store all public infos in ownerinfo document about our users in both admin and student mode
            we need another collection and another store state to store the panel info of each student 
            but we use auth.route.js and auth.js store file for both mode about their personal infos(don't wory about changing application state cause store is on client side)
            setup head() for seo => https://gist.github.com/lancejpollard/1978404
  
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