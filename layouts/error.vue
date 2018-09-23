<template>
    <v-hover>
     <v-card 
          slot-scope="{ hover }"
          :class="`elevation-${hover ? 12 : 2}`"
          class="mt-3"
          style="flex: 0 1 400px"
        >
       <v-card-title>
         <div> 
           <h3 class="headline mb-0 red--text">{{ error.message }} <span class="info--text">{{ error.statusCode }}</span></h3>
          </div>
       </v-card-title>
        <v-card-actions>
          <v-btn color="primary" flat nuxt to="/" v-if="error.statusCode === 404">Homepage</v-btn>
        </v-card-actions>
     </v-card>
    </v-hover>
</template>

<script>
export default {
  layout: 'fullscreen',
  props: ['error']
}
</script>

<style scoped>

</style>