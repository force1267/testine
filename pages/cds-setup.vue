<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <div class="text-xs-center">
        <logo/>
        <v-alert v-if="alert" :type="alert.type" value="true">{{alert.message}}</v-alert>
      </div>
      <v-card>
        <v-card-title class="headline">Study Abroad And Student Consultancy Institute</v-card-title>
        <v-card-text>
          <p>load components about app security here use vuex dispatch stuff to send req to server</p>
          <p v-if="user">Hello, {{user.username}}</p>
          <p v-else>Something went wrong with authentication system!</p>
          <div class="text-xs-right">
            <em><small>&mdash; woshi</small></em>
          </div>
          <hr class="my-3">
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" flat @click="checkMe">Check Me</v-btn>
          <!-- <v-btn color="primary" flat @click="logOut">Log Out</v-btn> -->
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import Logo from '~/components/Logo'

export default {
  components: {Logo},
  data(){
   return{
    check_ME:'',
    alert: null
   }
  },
  computed: {
    user () { return this.$store.state.auth ? this.$store.state.auth.user : null } // get user from store
  },
  methods: {
    checkMe () {
      this.$store.dispatch('auth/fetch').then(result => {
        this.check_ME = result.data.message
        this.alert = {type: 'success', message: result.data.message}
      })
    }
  }
}
</script>
