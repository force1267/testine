<template>
  <v-layout>
    <v-flex text-xs-center>
      <img src="/cds.svg" alt="cds" class="mb-5">
      <blockquote class="blockquote">
        UNDER
        <footer>
          <small>
            <em>&mdash;CONSTRUCTION</em>
            <div>
                use vuetify tab to fetch all user with their info in one single page
                this is the control center of registred user like ezapply site
                use live search and admin can add new student edit and delete them
                so we need a new login/registration system based on isAdmin flag structure 
                in ownerinfo document and store getters feature with a dashboard page for our students
                /auth/student/register ==== /auth/login ==== /auth/student/update .....
                we store all public infos in ownerinfo document about our users in both admin and student mode
                we need another collection and another store state to store the panel info of each student 
                but we use auth.route.js and auth.js store file for both mode(don't wory about changing application state cause store is on client side)
                setup head() for seo => https://gist.github.com/lancejpollard/1978404
            </div>
          </small>
        </footer>
      </blockquote>
    </v-flex>
  </v-layout>
</template>
