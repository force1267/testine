<template>
  <v-layout>
    <v-flex text-xs-center>
      <img src="/cds.svg" alt="cds" class="mb-5">
      <blockquote class="blockquote">
        UNDER
        <footer>
          <small>
            <em>&mdash;CONSTRUCTION - also use live search and header() nuxt feature for all posts seo</em>
            <div>
              like and tag(for its seo and use head() in vue page(nuxt feature).) feature for blogs
                 https://gist.github.com/lancejpollard/1978404
              <!-- use below MVVM style for posts
              <template>
                    <div>
                      <post :title="title"></post>
                    </div>
                  </template>

                  <script>
                    import Post from './Post.vue'

                    export default {
                      name: 'post-container',
                      components: { Post },
                      data () {
                        return {
                          title: 'Example blog post'
                        }
                      }
                    }
                  </script>
                 -->
            </div>
          </small>
        </footer>
      </blockquote>
    </v-flex>
  </v-layout>
</template>
