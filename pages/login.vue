<template>
  <v-layout justify-center align-center>
     <v-hover>
        <v-card
          slot-scope="{ hover }"
          :class="`elevation-${hover ? 12 : 2}`"
          class="mx-auto"
          style="flex: 0 1 400px"
        >
        <v-img
        :aspect-ratio="4/3"
        src="/cds.jpg"
        ></v-img>
      <!-- <v-card-title class="headline">CDS</v-card-title> -->
      <v-card-text>
        <v-form @submit.prevent="submit">
          <v-alert v-if="alert" :type="alert.type" value="true">{{alert.message}}</v-alert>
          <v-text-field label="Email" v-model="email" :rules="emailRules" required></v-text-field>
          <v-text-field label="Password" v-model="password" type="password" :rules="passwordRules"></v-text-field>
          <v-btn type="submit" :loading="loading" :disabled="loading">Log In</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-hover>
  </v-layout>
</template>

<script>
const suid = require('rand-token').suid
const token = suid(16)
export default {
  layout: 'fullscreen',
  data () {
    return {
      alert: null,
      loading: false,
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      password: '',
      passwordRules: [
        v => !!v || 'Password is required',
      ]
    }
  },
  head () {
    return {
      title: 'cds - '+token,
      meta: [
        { hid: 'description', name: 'description', content: token },
        { hid: 'robots', name: 'robots', content: 'noindex,nofollow'}
      ]
    }
  },
  methods: {
    submit () {
      this.alert = null
      this.loading = true
      this.$store.dispatch('auth/login', {
        email: this.email,
        password: this.password
      }).then(result => {
        this.alert = {type: 'success', message: result.data.message}
        this.loading = false
        this.$router.push('/cds-setup')
      }).catch(error => {
        this.loading = false
        if (error.response && error.response.data) {
          this.alert = {type: 'error', message: error.response.data.message || error.response.status}
        }
      })
    }
  }
}
</script>