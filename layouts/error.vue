<template>
  <section class="container">
    <v-chip label outline color="red">{{ error.statusCode }}</v-chip>
    <v-alert
      :value="true"
      color="error"
      icon="warning"
      outline
    >
      {{ error.message }}
    </v-alert>
    
     <v-btn color="primary" flat nuxt to="/" v-if="error.statusCode === 404">Homepage</v-btn>

    <logo/>
  </section>
</template>

<script>
import Logo from '~/components/Logo'
export default {
  layout: 'fullscreen',
  components: {Logo},
  props: ['error']
}
</script>

<style scoped>

</style>