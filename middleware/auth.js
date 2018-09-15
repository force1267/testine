



/* ------------------------------------------------------------------------
* this is our middleware to check that we've already authenticated or not?!
* it's a kinda guard for all routes in our entire application
*/

export default function ({store, redirect, route}) {
    
    const userIsLoggedIn = !!store.state.auth.user
    const cdsSetupR = /^\/cds-setup(\/|$)/.test(route.fullPath)
    const postsR = /^\/magazine-control-center(\/|$)/.test(route.fullPath) // TODO: set auth middleware for each post!
    const commentsR = /^\/comment-control-center(\/|$)/.test(route.fullPath)
    const modulesR = /^\/modules(\/|$)/.test(route.fullPath)
    const sandboxR = /^\/sandbox(\/|$)/.test(route.fullPath)
    const ucR = /^\/user-control-center(\/|$)/.test(route.fullPath)
    const ciR = /^\/consultancy-issues(\/|$)/.test(route.fullPath)
    const AQR = /^\/answer-question-control-center(\/|$)/.test(route.fullPath)
    const formsR = /^\/forms(\/|$)/.test(route.fullPath)
    
    const urlRequiresNonAuth = /^\/login(\/|$)/.test(route.fullPath)

    if (!userIsLoggedIn && (cdsSetupR || postsR || modulesR || sandboxR || formsR || AQR || commentsR || ucR || ciR)) {
      return redirect('/login')
    }
    if (userIsLoggedIn && urlRequiresNonAuth) {
      return redirect('/cds-setup')
    }
    return Promise.resolve()
  }