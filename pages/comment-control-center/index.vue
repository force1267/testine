
<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6> <!-- xs12 md4 => Medium screens: use 4/12 (33%) of the screen | Anything smaller(sm): 8/12 -->

      use live search pagination and admin must submit a comment and he can send email to those comment name
      edit every comment in a dialog(by dispatching getComment action) which is in a ck-editor and load its post cover with post_cuid and the post title/content(just a few words) inside a v-card; its a kinda single page editting
      also use cehckbox for submit a comment and don't forget for error handling using alert
      https://vuetifyjs.com/en/components/data-tables#example-crud


      <v-alert v-if="alert" :type="alert.type" value="true" dismissible>{{alert.message}}</v-alert>  

      <ul>
        <li v-for="comment in comments.comments" :key="comment.id">
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
  watchQuery: ['page'],
  data(){
    // all component data here
     return {
       alert: null
   }
  },
  // is called everytime before loading the component. 
  // it can be called from the server-side or before navigating to the corresponding route 
  async fetch ({ store, params }) {
    await store.dispatch('comments/fetch') // we have unhandled error for this action!
  },
  computed:{ // recompute any changes back from store state in a run-time manner!
    // fetch all comments from store before rendering the page
    comments(){
       return this.$store.state.comments ? this.$store.state.comments.list : null
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
