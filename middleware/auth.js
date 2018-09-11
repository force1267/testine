


export default function ({store, redirect, route}) {
    
    const userIsLoggedIn = !!store.state.auth.user
    const cdsSetupR = /^\/cds-setup(\/|$)/.test(route.fullPath)
    const postsR = /^\/posts(\/|$)/.test(route.fullPath)
    const modulesR = /^\/modules(\/|$)/.test(route.fullPath)
    const urlRequiresNonAuth = /^\/login(\/|$)/.test(route.fullPath)

    if (!userIsLoggedIn && cdsSetupR || postsR || modulesR) {
      return redirect('/login')
    }
    if (userIsLoggedIn && urlRequiresNonAuth) {
      return redirect('/cds-setup')
    }
    return Promise.resolve()
  }