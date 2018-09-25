
<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6> <!-- xs12 md4 => Medium screens: use 4/12 (33%) of the screen | Anything smaller(sm): 8/12 -->

      use live search and admin must submit a comment


    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data(){
    // all component data here
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
    // setup seo
  }
}
</script>
