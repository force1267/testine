



/* ------------------------------------------------------------------------
* this is our middleware to check that we've already authenticated or not?!
* it's a kinda guard for all routes in our entire application
*/

export default function ({store, redirect, route}) {
    // inside nuxtServerInit we check for token inside client cookie on server side 
    // and if we have one which contain that token then we set it on all axios headers on client side 
    // and dispatch the fetch action to fill the user state before rendering the page so if everything
    // was ok then we have store.state.auth.user in our entire application!
    const userIsLoggedIn = !!store.state.auth.user
    // client must be authorized to access below resources
    const cdsSetupR = /^\/cds-setup(\/|$)/.test(route.fullPath)
    const postsR = /^\/magazine-control-center(\/|$)/.test(route.fullPath) // TODO: set auth middleware for post id!
    const commentsR = /^\/comment-control-center(\/|$)/.test(route.fullPath)
    const modulesR = /^\/modules(\/|$)/.test(route.fullPath)
    const sandboxR = /^\/sandbox(\/|$)/.test(route.fullPath)
    const scR = /^\/student-control-center(\/|$)/.test(route.fullPath)
    const ciR = /^\/consultancy-services(\/|$)/.test(route.fullPath)
    const AQR = /^\/answer-question-control-center(\/|$)/.test(route.fullPath)
    const ABR = /^\/abroad-control-center(\/|$)/.test(route.fullPath)
    const csR = /^\/cando-services(\/|$)/.test(route.fullPath)
    const certsR = /^\/certificate-control-center(\/|$)/.test(route.fullPath)
    
    const urlRequiresNonAuth = /^\/login(\/|$)/.test(route.fullPath)

    if (!userIsLoggedIn && (cdsSetupR || postsR || modulesR || sandboxR || AQR || commentsR || scR || ciR || ABR || csR || certsR)) {
      return redirect('/login') // unauthorized access!
    }
    if (userIsLoggedIn && urlRequiresNonAuth) {
      return redirect('/cds-setup')
    }
    return Promise.resolve()
  }