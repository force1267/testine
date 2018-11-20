<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6> <!-- xs12 md4 => Medium screens: use 4/12 (33%) of the screen | Anything smaller(sm): 8/12 -->
            
              <!-- also show all comments for a single post in its page => use a component 
                   use a component to upload the cover(get help from UploadFile.vue component)
              -->
     
      <div>

        <v-alert v-if="alert" :type="alert.type" value="true" dismissible>{{alert.message}}</v-alert>  

          <v-toolbar flat color="white">
            <v-toolbar-title>Post CRUD</v-toolbar-title>
            <v-divider
              class="mx-2"
              inset
              vertical
            ></v-divider>
            <v-spacer></v-spacer>
            <v-text-field
              class="mr-5"
              v-model="search"
              append-icon="search"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
            <v-dialog v-model="dialog" max-width="500px" :fullscreen="$vuetify.breakpoint.xsOnly">
              <v-btn slot="activator" color="primary" dark class="mb-2">New Post</v-btn>
              <v-card>
                <v-card-title>
                  <span class="headline">{{formTitle}}</span>
                </v-card-title>
        
                <v-card-text>
                  <v-container grid-list-md>
                    <v-layout wrap>
                      <v-flex xs12 sm6 md4>
                        <v-text-field v-model="editedItem.name" label="Dessert name"></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6 md4>
                        <v-text-field v-model="editedItem.calories" label="Calories"></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6 md4>
                        <v-text-field v-model="editedItem.fat" label="Fat (g)"></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6 md4>
                        <v-text-field v-model="editedItem.carbs" label="Carbs (g)"></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6 md4>
                        <v-text-field v-model="editedItem.protein" label="Protein (g)"></v-text-field>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-card-text>
                  
                  <!-- error handling inside card -->
                  <v-alert v-if="alert" :type="alert.type" value="true" dismissible>{{alert.message}}</v-alert>  
                
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
                  <v-btn color="blue darken-1" flat @click.native="save">Save</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
          <v-data-table
            :headers="headers"
            :items=postList.posts
            :search="search"
            hide-actions
            class="elevation-1"
          >
            <template slot="items" slot-scope="props">
              <td>{{ props.item.title }}</td>
              <td class="text-xs-right">{{ props.item.en_title }}</td>
              <td class="text-xs-right">{{ props.item.slug }}</td>
              <td class="text-xs-right">{{ props.item.en_slug }}</td>
              <td class="text-xs-right"><timeago :datetime="props.item.createdAt" :auto-update="60"></timeago></td>
              <td class="text-xs-right"><timeago :datetime="props.item.updatedAt" :auto-update="60"></timeago></td>
              
              <td class="justify-center layout px-0">
                <!-- all api actions -->
                <v-icon
                  small
                  class="mr-2"
                  @click="editItem(props.item)"
                >
                  edit
                </v-icon>
                <v-icon
                  small
                  @click="deleteItem(props.item.cuid)"
                >
                  delete
                </v-icon>
                <v-tooltip bottom>
                <v-icon v-if="props.item.status==false"
                  small
                  class="green--text mt-3"
                  slot="activator"
                  @click="submitItem(props.item.cuid)"
                >
                  beenhere
                </v-icon>
                <span>Submit Me!</span>
              </v-tooltip>
              <v-tooltip bottom>
                <v-icon v-if="props.item.status==true"
                  small
                  slot="activator"
                  class="red--text mt-3"
                  @click="blockItem(props.item.cuid)"
                >
                  block
                </v-icon>
                <span>Block Me!</span>
              </v-tooltip>
              </td>
            </template>
            <v-alert slot="no-results" :value="true" color="error" icon="warning">
              Your search for "{{ search }}" found no results.
            </v-alert>
            <!-- <template slot="no-data">
              <v-btn color="primary" @click="initialize">Reset</v-btn>
            </template> -->
          </v-data-table>
      </div>


    </v-flex>
  </v-layout>
</template>

<script>
const suid = require('rand-token').suid
const token = suid(16)
export default {
    watchQuery: ['page'],
    data(){
    // all component data here
     return {
      search: '',
      alert: null,
      dialog: false,
      headers: [
        { text: 'Title', value: 'title' },
        { text: 'en_Title', value: 'en_title' },
        { text: 'Slug', value: 'slug' },
        { text: 'en_Slug', value: 'en_slug' },
        { text: 'Created At', value: 'createdAt' },
        { text: 'Updated At', value: 'updatedAt' },
        { text: 'Actions', value: 'name', sortable: false }
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0
      },
      defaultItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0
      }
   }
  },
  computed:{// recompute any changes back from store state in a run-time manner!
    // fetch all comments from store before rendering the page
    postList(){
      // console.log(this.$store.state.posts.list)
      if(this.$store.state.posts){
        return this.$store.state.posts.list 
      }
      else return null
      //  return this.$store.state.comments ? this.$store.state.comments.list : null
    },
    user () { 
      return this.$store.state.auth ? this.$store.state.auth.user.username : null
    },
    formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    }
  },
    // is called everytime before loading the component to fill the store 
  // it can be called from the server-side or before navigating to the corresponding route 
  // at first we have a null state and we have to fill it on loading component so we'll use the fetch method!
    async fetch ({ store, params }) {
        await store.dispatch('posts/fetch') // we have unhandled error for this action!
    },  
  watch: {
      dialog (val) {
        val || this.close()
      }
    },
  created () {

  },
  methods:{
    // all inner methods and store interaction here
      editItem (item) {
        this.$store.dispatch('posts/getrelatedComments', item.cuid).then((result)=>{
            console.log(result.data.comments) // we're gonna show only comments related to a post in our dialog insdide a component
          }).catch(error=>{ // if everythig went wrong client should call us !
            if (error.response && error.response.data) {
                  this.alert = {type: 'error', message: error.response.data.message || error.response.status}
            }
        })

        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        // const index = this.desserts.indexOf(item)
         confirm('Are you sure you want to delete this comment?') && this.$store.dispatch('posts/deletePost', cuid).then((result)=>{
        }).catch(error=>{
          if (error.response && error.response.data) {
                  this.alert = {type: 'error', message: error.response.data.message || error.response.status}
            }
        })
      },
      // submit a post
      submitItem (cuid) {
        this.$store.dispatch('posts/submitPost', cuid).then((result)=>{
        }).catch(error=>{ // if everythig went wrong client should call us !
            if (error.response && error.response.data) {
                  this.alert = {type: 'error', message: error.response.data.message || error.response.status}
            }
        })
      },
      // block a post
      blockItem (cuid) {
        this.$store.dispatch('posts/blockPost', cuid).then((result)=>{
        }).catch(error=>{ // if everythig went wrong client should call us !
            if (error.response && error.response.data) {
                  this.alert = {type: 'error', message: error.response.data.message || error.response.status}
            }
        })
      },
      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      save () {
        if (this.editedIndex > -1) { // dispatch edit a post
          Object.assign(this.desserts[this.editedIndex], this.editedItem)
        } else { // dispatch a new post
          this.desserts.push(this.editedItem)
        }
        this.close()
      }
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

