<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <div class="text-xs-center">
        <logo/>
      </div>
      <v-card>
        <v-card-title class="headline">Study Abroad And Student Consultancy Institute</v-card-title>
        <v-card-text>
          <p>load components here like modules and posts</p>
          <p v-if="user">Hello, {{user.email}}</p>
          <p v-else>Something went wrong with authentication!</p>
          <div class="text-xs-right">
            <em><small>&mdash; woshi</small></em>
          </div>
          <hr class="my-3">
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" flat nuxt to="/">Site</v-btn>
          <v-btn color="primary" flat @click="checkMe">Check Me</v-btn>
          <v-btn color="primary" flat @click="logOut">Log Out</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import Logo from '~/components/Logo'

export default {
  components: {Logo},
  computed: {
    user () { return this.$store.state.auth ? this.$store.state.auth.user : null }
  },
  methods: {
    checkMe () {
      this.$store.dispatch('auth/fetch').then(result => {
        console.log('Check Me Result:', result.data.message)
      })
    },
    logOut () {
      this.$store.dispatch('auth/reset').then(() => {
        this.$router.push('/')
      })
    }
  }
}
</script>
