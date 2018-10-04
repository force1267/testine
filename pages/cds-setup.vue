<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>

<!-- ========================first-card-to-check-authorized-admin======================== -->
   <v-hover>
    <v-card 
          slot-scope="{ hover }"
          :class="`elevation-${hover ? 12 : 2}`"
          class="mx-auto"
          style="flex: 0 1 400px"
    >
        <v-img
        src="/privacy.png"
        aspect-ratio="2"
        ></v-img>
       <v-card-title>
         <div> 
           <h3 class="headline mb-0">HELLO {{ user.username }}</h3>
             <div><v-icon class="red--text">format_quote</v-icon> Here you can use <span class="red--text">WHO AM I</span> button to check your identity!</div>
           </div>
       </v-card-title>
      <v-card-actions>
          <v-dialog
            v-model="dialog"
            width="600"
            :fullscreen="$vuetify.breakpoint.xsOnly"
          >
            <v-btn
              slot="activator"
              color="red lighten-2"
              dark
              @click="getMe"
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
                     <v-icon class="green--text">verified_user</v-icon>Admin of CDS institute with a  <v-chip label outline color="green">{{ checkMe }}</v-chip> authentication token
                     since <timeago :datetime="createdTime" :auto-update="60" class="red--text"></timeago><br>
                </v-card-text>
                
                <v-card-text v-else>
                  <v-icon class="red--text">error</v-icon>We don't know who you really are! <v-chip label outline color="red">INVALID</v-chip> authentication token. <br>
                  You see this because either you are a hacker and loged in here without any authentication process or this page is not under auth middleware!
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
          <v-btn color="error" flat @click="logOut" class="ml-2">log me out!</v-btn>
          <small class="ml-1"><em><v-icon class="red--text">touch_app</v-icon><timeago :datetime="lastseenTime" :auto-update="60"></timeago></em></small>
          <small class="ml-1"><em><v-icon class="red--text">update</v-icon><timeago :datetime="updatedTime" :auto-update="60"></timeago></em></small>
        </v-card-actions>
    </v-card>
   </v-hover> <!-- ========================end-first-card======================== -->


<!-- ========================second-card-to-edit-info======================== -->
  <v-hover>
    <v-card 
          slot-scope="{ hover }"
          :class="`elevation-${hover ? 12 : 2}`"
          class="mt-3"
          style="flex: 0 1 400px"
        >
        <v-img
        :src="user.avatar"
        aspect-ratio="2"
        ></v-img>
       <v-card-title>
         <div> 
           <h3 class="headline mb-0">UPDATE YOUR PERSONAL INFO</h3>
             <div><v-icon class="red--text">format_quote</v-icon> Feel free and make some changes to your info.<br> 
                  Password must contain at least one lowercase alphabetical character,<br>
                  one uppercase alphabetical character, one numeric character,<br>
                  one special character and must be eight characters or longer.<br>
             </div>
          </div>
       </v-card-title>
          <v-alert v-if="alert" :type="alert.type" value="true" dismissible>{{alert.message}}</v-alert>  
        <v-card-actions>
          <!-- updating form here.. -->
          <!-- v-model is essentially syntax sugar for updating data on user input events, plus special care for some edge cases. -->
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              v-model="username"
              :rules="usernameRules"
              :counter="10"
              label="Username"
              required
            ></v-text-field>
            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="E-mail"
              required
            ></v-text-field>
            <v-text-field
              v-model="password"
              :rules="passwordRules"
              label="Password" 
              type="password"
              required
            ></v-text-field>
            <v-textarea
              v-model="bio"
              auto-grow
              :rules="bioRules"
              box
              color="deep-purple"
              label="Bio"
              rows="1"
              required
            ></v-textarea>
            <v-checkbox
              v-model="checkbox"
              :rules="[v => !!v || 'You must agree to continue!']"
              label="Do you agree to privacy policy?"
              required
            ></v-checkbox>
            <v-btn
              :disabled="!valid"
              @click="submit"
            >
              update
            </v-btn>
            <v-btn @click="clear">clear</v-btn>
          </v-form>
        </v-card-actions>
     </v-card>
    </v-hover> <!-- ========================end-second-card======================== -->

      <!-- here we are passing userID as a prop in order to be accessible in other components -->
    <upload-file :userID="userID"></upload-file> <!-- third-card-to-upload-avatar -->

    </v-flex>
  </v-layout>
</template>

<script>
import crypto from 'crypto'
import UploadFile from '@/components/UploadFile'

export default {
  components: {UploadFile},
  watchQuery: ['page'],
  data(){ // validate on client side babe ;-)
   return {
    metaCont: '',
    dialog: false,
    checkMe:'',
    valid: true,
    userID: '',
    alert: null,
    updatedTime: '',
    createdTime: '',
    lastseenTime: '',
    bio: '',
    bioRules: [
      v => !!v || 'Bio is required',
      v => (v && v.length <= 150) || 'Bio must be less than 150 characters'
    ],
    username: '',
    usernameRules: [
      v => !!v || 'Username is required',
      v => (v && v.length <= 10) || 'Username must be less than 10 characters'
    ],
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+/.test(v) || 'E-mail must be valid'
    ],
    password: '',
    passwordRules: [
      v => !!v || 'Password is required',
      v => /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(v) || 'Password validation error!'
    ],
    checkbox: false
   }
  },
  head () {
    return {
      title: 'cds - '+this.metaCont,
      meta: [
        { hid: 'description', name: 'description', content: this.metaCont },
        { hid: 'robots', name: 'robots', content: 'noindex,nofollow'}
      ]
    }
  },
  computed: { // get user from store and recompute any changes; for manipulating data that already exists
    user () { 
      if(this.$store.state.auth){
        this.updatedTime = this.$store.state.auth.user.updatedAt
        this.createdTime = this.$store.state.auth.user.createdAt
        this.lastseenTime = this.$store.state.auth.user.lastseendate
        this.userID = this.$store.state.auth.user.id // need for findByIdAndUpdate mongoose method on server side!
        this.metaCont = this.$store.state.auth.user.activation_token
        this.bio = this.$store.state.auth.user.bio
        return this.$store.state.auth.user
      } else return null
    } 
  },
  methods: {
    logOut () {
        this.$store.dispatch('auth/reset').then(() => {
          this.$router.push('/')
        })
    },
    getMe(){ // dispatch auth/fetch action to check the validation of token (see auth/me in auth.route.js)
      this.$store.dispatch('auth/fetch').then((result)=>{
        this.checkMe = result.data.message
      }).catch(error=>{ // if everythig went wrong client should call us !
        if (error.response && error.response.data) {
              this.alert = {type: 'error', message: error.response.data.message || error.response.status}
          }
      })
    },
    submit () { // submit the update form and dispatch the auth/update route from the store
        if (this.$refs.form.validate()) {
          const salt = crypto.randomBytes(16).toString('hex')
          this.alert = null
          this.$store.dispatch('auth/update', {
            username: this.username,
            bio: this.bio,
            id: this.userID,
            email: this.email,
            salt: salt,
            password: crypto.pbkdf2Sync(this.password, salt, 10000, 512, 'sha512').toString('hex') // hash it on client side babe ;-)
          }).then(result => {
            this.alert = {type: 'success', message: result.data.message}
          }).catch(error => {
            if (error.response && error.response.data) {
              this.alert = {type: 'error', message: error.response.data.message || error.response.status}
            }
          })
        }
      },
    clear () {
      this.$refs.form.reset()
    }
  }
}
</script>
