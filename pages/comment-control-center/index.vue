
<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6> <!-- xs12 md4 => Medium screens: use 4/12 (33%) of the screen | Anything smaller(sm): 8/12 -->
    
      <div>

        <v-alert v-if="alert" :type="alert.type" value="true" dismissible>{{alert.message}}</v-alert>  

          <v-toolbar flat color="white">
            <v-toolbar-title>Comment CRUD</v-toolbar-title>
            <v-divider
              class="mx-2"
              inset
              vertical
            ></v-divider>
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="search"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
            <v-dialog v-model="dialog" max-width="500px" :fullscreen="$vuetify.breakpoint.xsOnly">
              <!-- <v-btn slot="activator" color="primary" dark class="mb-2">New Comment</v-btn> -->
              <v-card>
                <v-card-title>
                  <span class="headline">{{formTitle}}</span>
                </v-card-title>
        
                <v-card-text>
                  <v-container grid-list-md>
                    <v-layout wrap>
                      <v-flex xs12 sm6 md4>
                        <v-text-field v-model="postTitle" label="Post Title" :disabled="ok"></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6 md4>
                        <v-text-field v-model="editedItem.cuid" label="CUID" :disabled="ok"></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6 md4>
                        <v-text-field v-model="editedItem._id" label="ID" :disabled="ok"></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6 md4>
                        <v-text-field v-model="editedItem.post_cuid" label="Post Cuid" :disabled="ok"></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6 md4>
                        <v-text-field v-model="editedItem.name" label="Name"></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6 md4>
                        <v-text-field v-model="editedItem.email" label="Email"></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6 md4>
                        <v-text-field v-model="editedItem.content" label="Content"></v-text-field>
                      </v-flex>
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
            :items="commentList.comments"
            :search="search"
            hide-actions
            class="elevation-1"
          >
            <template slot="items" slot-scope="props">
              <!-- <td>{{ props.item.cuid }}</td>
              <td class="text-xs-right">{{ props.item._id }}</td> -->
              <!-- <td class="text-xs-right">{{ props.item.post_cuid }}</td> -->
              <td class="text-xs-right">{{ props.item.name }}</td>
              <td class="text-xs-right">{{ props.item.email }}</td>
              <td class="text-xs-right">{{ props.item.content }}</td>
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
      ok: true,
      alert: null,
      dialog: false,
      postTitle: '',
      headers: [
        // { text: 'CUID', value: 'cuid' },
        // { text: 'ID', value: '_id' },
        // { text: 'Post Cuid', value: 'post_cuid' },
        { text: 'Name', value: 'name' },
        { text: 'E-mail', value: 'email' },
        { text: 'Content', value: 'content' },
        { text: 'Created At', value: 'createdAt' },
        { text: 'Updated At', value: 'updatedAt' },
        { text: 'Actions', value: 'name', sortable: false }
      ],
      editedItem: {
        cuid: '',
        _id: '',
        post_cuid: '',
        name: '',
        email: '',
        content: '',
        createdAt: '',
        updatedAt: ''

      }
   }
  },
  // is called everytime before loading the component to fill the store 
  // it can be called from the server-side or before navigating to the corresponding route 
  // at first we have a null state and we have to fill it on loading component so we'll use the fetch method!
  async fetch ({ store, params }) {
    await store.dispatch('comments/fetch') // we have unhandled error for this action!
  },
  computed:{ // recompute any changes back from store state in a run-time manner!
    // fetch all comments from store before rendering the page
    commentList(){ // where should i call this according to the structure that i have here ???
      // console.log(this.$store.state.comments.list)
      if(this.$store.state.comments){
        return this.$store.state.comments.list 
      }
      else return null
      //  return this.$store.state.comments ? this.$store.state.comments.list : null
    },
    formTitle () {
        return 'Edit Comment'
    }
  },
  watch: {
      dialog (val) {
        val || this.close()
      }
    },
  created () {
  },
  methods:{
    // all inner methods and store interactions here
      editItem (item) {  
        // we're dispatching getrelatedPost action related to a comment cuid on edit button click to see the related post to that comment that we just want to edit it
        // we're gonna show the post cover and title related to this comment in edit dialog!
        // we didn't use the computed or created method cause we don't wanna see any recomputation process or any rendered file after the instance created
        // we'll use the response object backed from the store(api) to show the post infos related to a comment cuid in comment dialog
        // we're not gonna edit the post we're gonna just show the post cover and title related to a comment cuid so best method is fetching on edit button click  
          this.$store.dispatch('comments/getrelatedPost', item.cuid).then((result)=>{
            this.postTitle = result.data.post.title // we're gonna show only post title related to a comment in our dialog
          }).catch(error=>{ // if everythig went wrong client should call us !
            if (error.response && error.response.data) {
                  this.alert = {type: 'error', message: error.response.data.message || error.response.status}
            }
        })
          
          this.editedItem = Object.assign({}, item)
          this.dialog = true

      },
      // delete a comment
      deleteItem (cuid) {
        // const index = this.comments.indexOf(item)
        confirm('Are you sure you want to delete this comment?') && this.$store.dispatch('comments/deleteComment', cuid).then((result)=>{
        }).catch(error=>{
          if (error.response && error.response.data) {
                  this.alert = {type: 'error', message: error.response.data.message || error.response.status}
            }
        })
      },
      // submit a comment
      submitItem (cuid) {
        this.$store.dispatch('comments/submitComment', cuid).then((result)=>{
        }).catch(error=>{ // if everythig went wrong client should call us !
            if (error.response && error.response.data) {
                  this.alert = {type: 'error', message: error.response.data.message || error.response.status}
            }
        })
      },
      // block a comment
      blockItem (cuid) {
        this.$store.dispatch('comments/blockComment', cuid).then((result)=>{
        }).catch(error=>{ // if everythig went wrong client should call us !
            if (error.response && error.response.data) {
                  this.alert = {type: 'error', message: error.response.data.message || error.response.status}
            }
        })
      },
      // close the dialog
      close () {
        this.dialog = false
      },
      // save an edited comment
      save (item) {
          this.$store.dispatch('comments/updateComment', item).then((result)=>{
          }).catch(error=>{ // if everythig went wrong client should call us !
            if (error.response && error.response.data) {
                  this.alert = {type: 'error', message: error.response.data.message || error.response.status}
            }
         })

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
