

module.exports = ({express, User, Post, Comments}) => {
    const routes = express.Router()
    const crypto = require('crypto')
    const salt = crypto.randomBytes(16).toString('hex')
    const cuid = require('cuid')
    const slug = require('limax')

  // API route to add new admin in database 
    routes.post('/signup', (req, res) => {
      User = new User({
        username: req.body.username,
        email: "mazizijam@umz.ac.ir",
        lastseendate: Date.now(),
        avatar: "7929c39269a027368daea67eb4b65a241537285871986.jpg",
        bio: "Assistant Professor of the Department of English Language and Literature, Univeristy of Mazandaran, Babolsar, Iran",
        password: crypto.pbkdf2Sync('@zizi.M123', salt, 10000, 512, 'sha512').toString('hex'),
        salt: salt
      })
    
      User.save(function (err) {
          if(err!==null) res.json({type:'error', message: 'cant save!', err})
          res.json({type: 'success', message: 'Saved!', err}) // on success save it'll return err = null
      })
    })

  // API route to add new post in database
    routes.post('/add-new-post', (req, res) =>{
      Post = new Post({
        title: req.body.title,
        en_title: req.body.en_title,
        content: req.body.content,
        en_content: req.body.en_content,
        slug: req.body.title.replace(/ /g,"-"),
        tags: req.body.tags.replace(/\s/g, '').split(","),
        en_tags: req.body.en_tags.replace(/\s/g, '').split(","),
        en_slug: slug(req.body.en_title.toLowerCase(), { lowercase: true }),
        cuid: cuid()
      })

      Post.save(function(err, post){
        if(err!==null) res.json({type:'error', message: 'cant save!', err})
        res.json({type: 'success', message: 'Saved!', post})
      })

    })
  // API route to add new comment in database
    routes.post('/add-new-comment', (req, res) => {
      Comments = new Comments({
        post_cuid: req.body.post_cuid,
        name: req.body.name,
        email: req.body.email,
        content: req.body.content,
        cuid: cuid()
      })

      Comments.save((err, cmnt)=>{
        if(err!==null) res.json({type:'error', message:'cant save!', err})
        res.json({type:'success', message:'Saved!', cmnt})
      })

    })
 // API route to campare the hash of the req.body.password with stored hash in the database
    routes.post('/compare', (req, res) => {
      const email = req.body.email
      const password = req.body.password
      User.findOne({email: email}, function(error, doc){
        if(error !== null) res.json({type: 'error', message:'db error', err})
        if(doc === null) { 
          res.json({type: 'error', message: 'User with provided email not found.'})
        } if(doc.password === crypto.pbkdf2Sync(password, doc.salt, 10000, 512, 'sha512').toString('hex')) {
          res.json({
            type: 'success',
            message: 'User logged in.',
            user: {id: doc._id, email: doc.email}
          })
        } else res.json({type: 'error', message: 'Password is incorrect!'})
      })
    })

    return routes
}