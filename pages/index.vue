<template>
<div>

   implement CANDO.rar url validation and cookie for whole site. search bar for magazine and whole site 
   multilingual setup(https://medium.com/@allenhwkim/multiple-language-with-nuxt-vuejs-efc3dad45eac)
   setup seo head() => https://gist.github.com/lancejpollard/1978404 and youtube videos and https://www.npmjs.com/package/express-robots
   write contract for middle prices and support time(use ur support app for cds proj just see wocfulab.todo to know how to create it!)
   see wocfulab.todo for security issues for admin panel - append the wocam name at the footer - social media links
   use vue loader component to wait to load data of a page component from the back-end like youtube style using github.com/f/vue-wait => only on client side
    ezapply.ir
    visamondial.com
    cds.org.ir
    ezam-daneshjoo.ir
    iliadint.com


    CDS-FINAL-TOUCH:
    ENV VARIABLE FOR SERVER SECRET KEY
    support(todo) app for CDS (multi-platform jwt rest api/graphql based with video and voice call streaming feature)[create-nuxt-app(nuxtv2), nuxt-electron(use express stuff as serverMiddleware or python tornado/flask), flutter] => see wocfulab.todo for more details
    remove debuggingAPI folder or ignore it when u'r pulling the proj on vps for security reasons
    At the web server level, require SSL with a verified client certificate
    Expose the admin service only on a private IP address which is accessible only via a VPN
    Expose the service only on "localhost" and access it using SSH port forwarding.
    Require 2-factor authentication within the admin app itself.
    Some combination of the above.
    use a cryptographic URL to access the admin area
    use a reverse proxy like nginx for handling rate limiting also see npmjs.com/package/express-limiter 
    add more feature about security in security policy section and use ur backdoor in cds to support client
    we need a vps to deploy our project on it and configure dns settings from scratch(also u can use raspi and ngrok[build smt like ngrok])
    we have to configure dns setting for existing domains
    we have to move the content of the cds.org.ir to educationbroad.ir and use the cds.org.ir domain for our new work with https
    we have to first free the cds.org.ir from its DNS host in order to use it on our VPS. we need cpanel user pass
    we can use htaccess set up to redirect the whole contents of oldomain.com to newdomain.com
    see stackoverflow.com/questions/1945568/htaccess-redirect-all-pages-to-new-domain
    use docker or virtualenv to move cds proj into vps(specially mongodb setup[user/pass/host for mongodb] and its collections) and write a contracct for middle prices
   

</div>
</template>

<script>
export default {
  layout: 'fullscreen'
}
</script>
