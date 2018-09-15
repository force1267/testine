<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <!-- <div class="text-xs-center">
      </div>
    <v-spacer></v-spacer> -->

    <v-card>
        <v-img
        src="/privacy.png"
        aspect-ratio="2"
        ></v-img>
       <v-card-title>
         <div> 
           <h3 class="headline mb-0">HELLO {{ user.username }}</h3>
             <div>Here you can use <span class="red--text">WHO AM I</span> button to check <br>your authentication policy!</div>
           </div>
       </v-card-title>
      <v-card-actions>
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
                     <v-icon class="green--text">verified_user</v-icon>Admin of CDS institute with a  <v-chip label outline color="green">{{ checkMe }}</v-chip> authentication token.
                </v-card-text>
                
                <v-card-text v-else>
                  <v-icon class="red--text">block</v-icon>We don't know who you really are! an  <v-chip label outline color="red">INVALID</v-chip> authentication token.
                </v-card-text>

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
        </v-card-actions>
     </v-card>

    <v-card class="mt-3">
        <v-img
        src="/privacy.png"
        aspect-ratio="2"
        ></v-img>
       <v-card-title>
         <div> 
           <h3 class="headline mb-0">UPDATE YOUR PERSONAL INFO</h3>
             <div>Feel free and make some change to your existing infos.</div>
          </div>
       </v-card-title>
        <v-card-actions>
          <!-- updating form here.. -->
        </v-card-actions>
     </v-card>
    </v-flex>
  </v-layout>
</template>

<script>

export default {
  components: {},
  data(){
   return {
    dialog: false,
    checkMe:''
   }
  },
  computed: {
    user () { 
      return this.$store.state.auth ? this.$store.state.auth.user : null 
      console.log(this.$store.state.auth.user.username)
    } // get user from store
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
