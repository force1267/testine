<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6> <!-- xs12 md4 => Medium screens: use 4/12 (33%) of the screen | Anything smaller(sm): 8/12 -->
            
     
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
                  <span class="headline" v-if="formTitle == 'Edit Item'">Edit Item</span>
                  <span class="headline" v-else>New Item</span>
                </v-card-title>
        <!-- build another card for adding new item using v-if and editedIndex -->
                <v-card-text>
                  <v-container grid-list-md>
                    <v-layout wrap>
                      <v-flex xs12 sm6 md4>
                        <v-text-field v-model="editedItem.cuid" label="CUID" :disabled="ok"></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6 md4>
                        <v-text-field v-model="editedItem._id" label="ID" :disabled="ok"></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6 md4>
                        <v-text-field v-model="editedItem.title" label="Title"></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6 md4>
                        <v-text-field v-model="editedItem.en_title" label="en_Title"></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6 md4>
                        <v-text-field v-model="editedItem.slug" label="Slug"></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6 md4>
                        <v-text-field v-model="editedItem.en_slug" label="en_Slug"></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6 md4>
                        <!-- cover component ; get inspire from UploadFile.vue -->
                      </v-flex>
                      <v-flex xs12 sm6 md4>
                        <!-- tags field -->
                      </v-flex>
                      <v-flex xs12 sm6 md4>
                        <!-- en_tags field -->
                      </v-flex>
                      <v-flex xs12 sm6 md4>
                        <!-- content editor -->
                      </v-flex>
                    </v-layout>
                    <v-layout warp>
                      {{ getRelComms }}
                    </v-layout>
                  </v-container>
                </v-card-text>
                
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
                  <v-btn color="blue darken-1" flat @click.native="save(editedItem)">Save</v-btn>
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
                <span v-if="props.item.status==false">Submit Me!</span>
                <v-icon v-if="props.item.status==true"
                  small
                  slot="activator"
                  class="red--text mt-3"
                  @click="blockItem(props.item.cuid)"
                >
                  block
                </v-icon>
                <span v-if="props.item.status==true">Block Me!</span>
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
import RelComms from '@/components/RelComms'
const suid = require('rand-token').suid
const token = suid(16)
export default {
    components: {RelComms},
    watchQuery: ['page'],
    data(){
    // all component data here
     return {
      search: '',
      ok: true,
      alert: null,
      dialog: false,
      getRelComms: null,
      headers: [
        { text: 'Title', value: 'title' },
        { text: 'en_Title', value: 'en_title' },
        { text: 'Slug', value: 'slug' },
        { text: 'en_Slug', value: 'en_slug' },
        { text: 'Created At', value: 'createdAt' },
        { text: 'Updated At', value: 'updatedAt' },
        { text: 'Actions', value: 'name', sortable: false }
      ],
      postCUID: '',    
      editedIndex: -1,
      editedItem: {
        cuid:'',
        _id:'',
        title: '',
        en_title: '',
        slug: '',
        en_slug: '',
        cover:'',
        tags: null,
        en_tags: null,
        content: ''
      }
   }
  },
  computed:{// recompute any changes back from store state in a run-time manner!
    // fetch all posts from store before rendering the page
    postList(){
      // console.log(this.$store.state.posts.list)
      if(this.$store.state.posts){
        return this.$store.state.posts.list 
      }
      else return null
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
        // we're dispatching the getrelatedComments api to fill our getRelComms data variable
        // every time we hit the edit button for a specific post
        this.$store.dispatch('posts/getrelatedComments', item.cuid).then((result)=>{
           this.getRelComms = result.data
        }).catch(error=>{
          if (error.response && error.response.data) {
                  this.alert = {type: 'error', message: error.response.data.message || error.response.status}
            }
        })
        this.postCUID = item.cuid
        this.editedItem = Object.assign({}, item)
        this.dialog = true
        this.editedIndex = 0
      },

      deleteItem (item) {
        // const index = this.desserts.indexOf(item)
         confirm('Are you sure you want to delete this post?') && this.$store.dispatch('posts/deletePost', cuid).then((result)=>{
           // TODO: do something with result object
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
          this.editedIndex = -1
        // setTimeout(() => {
        //   this.editedItem = Object.assign({}, this.defaultItem)
        // }, 300)
      },

      save (item) {
        if (this.editedIndex > -1) { // dispatch edit a post
          // Object.assign(this.desserts[this.editedIndex], this.editedItem)
          this.$store.dispatch('posts/updatePost', item).then((result)=>{
            // TODO: do something with result object
          }).catch(error=>{ // if everythig went wrong client should call us !
            if (error.response && error.response.data) {
                  this.alert = {type: 'error', message: error.response.data.message || error.response.status}
            }
         })
        } else { // dispatch a new post
          // this.desserts.push(this.editedItem)
          this.$store.dispatch('posts/addPost', item).then((result)=>{
            // TODO: do something with result object
          }).catch(error=>{ // if everythig went wrong client should call us !
            if (error.response && error.response.data) {
                  this.alert = {type: 'error', message: error.response.data.message || error.response.status}
            }
         })
        }
        // close the dialog
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

