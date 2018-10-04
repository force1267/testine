<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6> <!-- xs12 md4 => Medium screens: use 4/12 (33%) of the screen | Anything smaller(sm): 8/12 -->
              live search like tag pagination add new post button here(new post component)
              set auth middlewate for post id - also show all comments for a single post in its page
              create a comment component and bind post._id as a props on its attribute from inside _id.vue
              then in comment component disptach all comments related to that post and show them in vue 
              finally load the comment component in _id.vue(comment container)
              https://vuetifyjs.com/en/layout/grid
  
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
    // fetch all posts from store before rendering the page
    posts(){
      
    }
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

