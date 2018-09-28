
<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6> <!-- xs12 md4 => Medium screens: use 4/12 (33%) of the screen | Anything smaller(sm): 8/12 -->

      use live search pagination and admin must submit a comment and he can send email to those comment name
      edit every comment in a dialog which is in a ck-editor and load its post cover with post_cuid; its a kinda single page editting
      for upload and delete we use comment cuid as params in axios config
      also use cehckbox for submit a comment and don't forget for error handling using alert
      https://vuetifyjs.com/en/layout/grid

      <v-alert v-if="alert" :type="alert.type" value="true" dismissible>{{alert.message}}</v-alert>  

      <ul>
        <li v-for="comment in comments" :key="comment.id">
          {{comment}}
        </li>
      </ul>


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
  computed:{ // recompute any changes
    // fetch all comments from store before rendering the page
    comments(){
       if(this.$store.state.comments){
         console.log(this.$store.state.comments)
        return this.$store.state.comments.comments
      } else return null
    }
  },
  methods:{
    // all inner methods and store interaction here
  },
  head(){ // https://gist.github.com/lancejpollard/1978404
    // setup seo
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
