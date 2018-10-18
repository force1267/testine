<template>
  <v-app light>
    <v-navigation-drawer
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      fixed
      app
    >

      <v-img :aspect-ratio="16/9" :src="user.avatar">
        <v-layout pa-2 column fill-height class="lightbox white--text">
          <v-spacer></v-spacer>
          <v-flex shrink>
            <div class="subheading">{{user.username}}</div>
            <div class="body-1">{{user.email}}</div>
          </v-flex>
        </v-layout>
      </v-img>
      
      <v-list>
        <v-list-tile
          router
          :to="item.to"
          :key="i"
          v-for="(item, i) in items"
          exact
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar fixed app :clipped-left="clipped">
      <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-btn
        icon
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="clipped = !clipped"
      >
        <v-icon>web</v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="fixed = !fixed"
      >
        <v-icon>remove</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- <v-btn
        icon
        @click.stop="rightDrawer = !rightDrawer"
      >
        <v-icon>menu</v-icon>
      </v-btn> -->
    </v-toolbar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <!-- <v-navigation-drawer
      temporary
      :right="right"
      v-model="rightDrawer"
      fixed
    >
      <v-list>
        <v-list-tile @click.native="right = !right">
          <v-list-tile-action>
            <v-icon light>compare_arrows</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>nothing!</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer> -->
    <v-footer :fixed="fixed" app>
      <small><em>&copy; 2018&mdash;CDS</em></small>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    computed: { // get user from store
    user () { 
      return this.$store.state.auth ? this.$store.state.auth.user : null
     }
    },
    data() {
      return {
        clipped: false,
        drawer: true,
        fixed: false,
        items: [
          { icon: 'home', title: 'Site', to: '/' },
          { icon: 'devices', title: 'Sandbox', to: '/sandbox' },
          { icon: 'security', title: 'Security Policy', to: '/cds-setup' },
          { icon: 'bubble_chart', title: 'Modules', to: '/modules' },
          { icon: 'search', title: 'Seo Setup', to: '/seo-setup' },
          { icon: 'import_contacts', title: 'Magazine Control Center', to: '/magazine-control-center' },
          { icon: 'comment', title: 'Comment Control Center', to: '/comment-control-center' },
          { icon: 'question_answer', title: 'Answer Question Control Center', to: '/answer-question-control-center' },
          { icon: 'assignment_ind', title: 'Student Control Center', to: '/student-control-center' },
          { icon: 'language', title: 'Abroad Control Center', to: '/abroad-control-center' },
          { icon: 'live_help', title: 'Consultancy Services', to: '/consultancy-services' },
          { icon: 'fingerprint', title: 'Cando Certificate', to: '/certificate-control-center' },
          { icon: 'store', title: 'Cando Services', to: '/cando-services' }
        ],
        miniVariant: false,
        right: true,
        rightDrawer: false,
        title: 'DASHBOARD'
      }
    }
  }
</script>
