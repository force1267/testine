# cds

> study abroad and student consultancy institute

## Build Setup

``` bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, checkout [Nuxt.js docs](https://nuxtjs.org).
to import data for a collection in robo3t:
```
Right click on collection.
Select 'insert Document'.
enter image description here
Paste your json data
Click validate.
Click save.
```
or you can use below command
## mongoimport --jsonArray -d <DataBase Name> -c <Collection Name> --file /path/to/my/db.json
