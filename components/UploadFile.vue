
<template>
  <v-hover>
    <v-card 
          slot-scope="{ hover }"
          :class="`elevation-${hover ? 12 : 2}`"
          class="mt-3"
          style="flex: 0 1 400px"
        >
        <v-img
        aspect-ratio="2"
        v-bind:src="imagePreview" v-show="showPreview"
        ></v-img>
       <v-card-title>
           <h3 class="headline mb-0">{{dynamicText}}</h3>
       </v-card-title>
       <v-alert v-if="alert" :type="alert.type" value="true" dismissible>{{alert.message}}</v-alert>
        <v-card-actions>
            <input class="mr-2" type="file" id="file" ref="file" accept="image/*" v-on:change="handleFileUpload()"/>
            <v-btn @click="submitFile()" :disabled="!shouldUpload">upload</v-btn>
        </v-card-actions>

     </v-card>
  </v-hover>
</template>

<script>
  export default {
    props: ['userID'],
    data(){
      return {
        file: '',
        shouldUpload: false, 
        alert: null,
        showPreview: false,
        imagePreview: '',
        dynamicText: ''
      }
    },
    methods: {
     submitFile(){
        let formData = new FormData()
        this.dynamicText = ''
        formData.append('file', this.file) // append the selected file to formData object
        formData.append('userID', this.userID) // append the userID to formData object to use findByIdAndUpdate
        // for (var p of formData) {
        //     console.log(p)
        // }
       this.$store.dispatch('auth/upload', formData).then(result => {
            this.alert = {type: 'success', message: result.data.message}
             }).catch(error => {
                if (error.response && error.response.data) {
                 this.alert = {type: 'error', message: error.response.data.message || error.response.status}
             }
          })
        
        // clear above shits after uploading!
        const input = this.$refs.file
        input.type = 'text'
        input.type = 'file'
        this.showPreview = false
        this.shouldUpload = false
        this.imagePreview = ''
      },
      handleFileUpload(){
        /*
          Set the local file variable to what the user has selected.
        */
        this.file = this.$refs.file.files[0]
        this.dynamicText = 'NOW HIT THE UPLOAD BUTTON!'
        this.shouldUpload = true

        /*
          Initialize a File Reader object
        */
       let reader  = new FileReader()

        /*
          Add an event listener to the reader that when the file
          has been loaded, we flag the show preview as true and set the
          image to be what was read from the reader.
        */
        reader.addEventListener("load", function () {
            this.showPreview = true
          this.imagePreview = reader.result
        }.bind(this), false)

        /*
          Check to see if the file is not empty.
        */
       if( this.file ){
          /*
            Ensure the file is an image file.
          */
         if ( /\.(jpe?g|png|gif)$/i.test( this.file.name ) ) {
            /*
              Fire the readAsDataURL method which will read the file in and
              upon completion fire a 'load' event which we will listen to and
              display the image in the preview.
            */
            reader.readAsDataURL( this.file )
          }
        }
      }
    }
  }
</script>
