<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6> <!-- xs12 md4 => Medium screens: use 4/12 (33%) of the screen | Anything smaller(sm): 8/12 -->
            
            
           we can setup body components here like some UIs activity about site<br>
              and vuetify sanbox with logo changing for whole site and login vue footer and header settings we build careers section<br>
              https://vuetifyjs.com/en/directives/ripples#example-custom-ripple
              setup head() for seo => https://gist.github.com/lancejpollard/1978404
              use vuetify sandbox page => https://vuetifyjs.com/en/examples/layouts/sandbox
              use props vue feature to build the whole sandbox(or use store) => dealing with store is more easier!
  
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
