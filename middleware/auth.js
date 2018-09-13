





export default function ({store, redirect, route}) {
    
    const userIsLoggedIn = !!store.state.auth.user
    const cdsSetupR = /^\/cds-setup(\/|$)/.test(route.fullPath)
    const postsR = /^\/posts(\/|$)/.test(route.fullPath) // TODO: set auth middleware for each post!
    const modulesR = /^\/modules(\/|$)/.test(route.fullPath)
    const formsR = /^\/forms(\/|$)/.test(route.fullPath)
    const bodySR = /^\/body-settings(\/|$)/.test(route.fullPath)
    const urlRequiresNonAuth = /^\/login(\/|$)/.test(route.fullPath)

    if (!userIsLoggedIn && cdsSetupR || postsR || modulesR || bodySR || formsR) {
      return redirect('/login')
    }
    if (userIsLoggedIn && urlRequiresNonAuth) {
      return redirect('/cds-setup')
    }
    return Promise.resolve()
  }