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

## To Import Data For A Collection In robo3t:
```
$ Right click on collection
$ Select 'insert Document'
$ Paste your json data
$ Click validate
$ Click save

OR IN COMMAND LINE:

$ mongoimport --jsonArray -d <DataBase Name> -c <Collection Name> --file /path/to/my/document.json

OR USE debuggingAPI folder FOR INSERT OPS
```