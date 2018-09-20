

module.exports = ({express, User}) => {
    const routes = express.Router()
    const crypto = require('crypto')
    const salt = crypto.randomBytes(16).toString('hex')

  // API route to add new admin in database 
    routes.post('/signup', (req, res) => {
      User = new User({
        username: req.body.username,
        email: req.body.email,
        lastseendate: Date.now(),
        avatar: "7929c39269a027368daea67eb4b65a241537285871986.jpg",
        bio: "Assistant Professor of the Department of English Language and Literature, Univeristy of Mazandaran, Babolsar, Iran",
        password: crypto.pbkdf2Sync('@zizi.M123', salt, 10000, 512, 'sha512').toString('hex'),
        salt: salt
      })
    
      User.save(function (err) {
          if(err!==null) res.json({type:'error', message: 'cant save!'})
          res.json({type: 'success', message: 'Saved!', err}) // on success save it'll return err = null
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