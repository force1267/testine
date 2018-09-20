<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6> <!-- xs12 md4 => Medium screens: use 4/12 (33%) of the screen | Anything smaller(sm): 8/12 -->
              live search like tag and header() nuxt feature for all posts seo also add new post button here(new post component)
              set auth middlewate for post id - also show all comments for a single post in its page
              create a comment component and bind post._id as a props on its attribute from inside _id.vue
              then in comment component disptach all comments related to that post and show them in vue 
              finally load the comment component in _id.vue
              https://gist.github.com/lancejpollard/1978404
              https://vuetifyjs.com/en/layout/grid
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  
}
</script>

