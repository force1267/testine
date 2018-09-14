<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <div class="text-xs-center">
        <logo/>
      </div>
    <v-spacer></v-spacer>

  <!--================================== DIALOG FOR WHO AM I ==================================-->
          <v-dialog
            v-model="dialog"
            width="500"
          >
            <v-btn
              slot="activator"
              color="red lighten-2"
              dark
            >
              WHO AM I?
            </v-btn>
             <v-card>
                <v-card-title
                  class="headline grey lighten-2"
                  primary-title
                >
                  Privacy Policy
                </v-card-title>
                <v-card-text v-if="user">
                    <v-chip>
                      <v-avatar class="teal">{{user.username}}</v-avatar>
                       Admin of CDS institute with a  <v-chip label outline color="green">{{ checkMe }}</v-chip> authentication token.
                    </v-chip>
                </v-card-text>
                <v-card-text v-else>Admin of CDS institute with a  <v-chip label outline color="red">INVALID</v-chip> authentication token.</v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="primary"
                    flat
                    @click="dialog = false"
                  >
                    I accept
                  </v-btn>
                </v-card-actions>
              </v-card>
          </v-dialog>
  <!--================================== END DIALOG FOR WHO AM I ==================================-->
    
          <v-btn color="error" flat @click="logOut">log me out!</v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
import Logo from '~/components/Logo'

export default {
  components: {Logo},
  data(){
   return {
    dialog: false,
    checkMe:''
   }
  },
  computed: {
    user () { return this.$store.state.auth ? this.$store.state.auth.user : null } // get user from store
  },
  created: function(){ // return the result of auth/me route on server side
      this.$store.dispatch('auth/fetch').then(result => {
      this.checkMe = result.data.message
      }) 
  },
  methods: {
    logOut () {
        this.$store.dispatch('auth/reset').then(() => {
          this.$router.push('/')
        })
    }
  }
}
</script>
