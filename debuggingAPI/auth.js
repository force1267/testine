

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
        bio: "study abroad and student consultancy",
        password: crypto.pbkdf2Sync('Qwe%$[rty]*@;123', salt, 10000, 512, 'sha512').toString('hex'),
        salt: salt
      })
    
      User.save(function (err) {
          res.json({type: 'error', message: 'Cant Save', err}) // on success save it'll return err = null
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