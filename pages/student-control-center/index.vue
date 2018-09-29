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
                so we need a login/registration system for our students
                use live search and admin can add new student edit and delete them
                use another login page for students control center and create a dashboard page for them
                we need a another store state for our students but the route is auth and is the same as for admin
                /auth/student/register ==== /auth/login ==== /auth/student/update .....
                create student reg sys based on isAdmin flag structure in ownerinfo document and store getters feature
                setup head() for seo => https://gist.github.com/lancejpollard/1978404
            </div>
          </small>
        </footer>
      </blockquote>
    </v-flex>
  </v-layout>
</template>
