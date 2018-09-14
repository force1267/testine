



/* ------------------------------------------------------------------------
* this is our middleware to check that we've already authenticated or not?!
* it's a kinda guard for all routes in our entire application
*/

export default function ({store, redirect, route}) {
    
    const userIsLoggedIn = !!store.state.auth.user
    const cdsSetupR = /^\/cds-setup(\/|$)/.test(route.fullPath)
    const postsR = /^\/posts(\/|$)/.test(route.fullPath) // TODO: set auth middleware for each post!
    const modulesR = /^\/modules(\/|$)/.test(route.fullPath)
    const formsR = /^\/forms(\/|$)/.test(route.fullPath)
    const sandboxR = /^\/sandbox(\/|$)/.test(route.fullPath)
    const emailR = /^\/email(\/|$)/.test(route.fullPath)
    const urlRequiresNonAuth = /^\/login(\/|$)/.test(route.fullPath)

    if (!userIsLoggedIn && (cdsSetupR || postsR || modulesR || sandboxR || formsR || emailR)) {
      return redirect('/login')
    }
    if (userIsLoggedIn && urlRequiresNonAuth) {
      return redirect('/cds-setup')
    }
    return Promise.resolve()
  }