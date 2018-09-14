
// https://codeburst.io/nuxt-authentication-from-scratch-a7a024c7201b
// https://ponyfoo.com/articles/json-web-tokens-vs-session-cookies
// https://security.stackexchange.com/questions/16354/whats-the-advantage-of-using-pbkdf2-vs-sha256-to-generate-an-aes-encryption-key
// TO HASH A PSWD: crypto.pbkdf2Sync(password, crypto.randomBytes(16).toString('hex'), 10000, 512, 'sha512').toString('hex')

module.exports = ({express, jwt, User, crypto}) => {
    const routes = express.Router()
    const cfg = require('../config/.config')
 // API route to login
    routes.post('/login', (req, res) => {
      const email = req.body.email
      const password = req.body.password
      if (!email || !password) return res.status(400).json({type: 'error', message: 'email and password fields are essential for authentication.'})
      User.findOne({email: email}, function(error, doc){
        if(error !== null) return res.status(500).json({type: 'error', message:'Server error', err})
        if(doc === null) return res.status(402).json({type: 'error', message: 'User with provided email not found.'})
        if(doc.password === crypto.pbkdf2Sync(password, doc.salt, 10000, 512, 'sha512').toString('hex')) {
          res.json({
            type: 'success',
            message: 'User logged in.',
            user: {id: doc._id, email: doc.email, username: doc.username, bio: doc.bio, activation_token: doc.activation_token , createdAt: doc.createdAt, updatedAt: doc.updatedAt},
            token: jwt.sign({id: doc._id, email: doc.email}, cfg.JWT_SECRET, {expiresIn: cfg.JWT_TOKEN_TIME})
          })
        } else return res.status(403).json({type: 'error', message: 'Password is incorrect!'})
      })
    })
// API route to check the user
    routes.get('/me', (req, res) => {
      const token = req.headers['x-access-token']
      if (!token) return res.status(400).json({type: 'error', message: 'x-access-token header not found.'})
      jwt.verify(token, cfg.JWT_SECRET, (error, result) => {
        if (error) return res.status(403).json({type: 'error', message: 'Provided token is invalid.', error})
        return res.json({
          type: 'success',
          message: 'Provided token is valid.',
          result // payload
        })
      })
    })
  
    return routes
}