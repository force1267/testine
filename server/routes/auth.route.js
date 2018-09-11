
// https://codeburst.io/nuxt-authentication-from-scratch-a7a024c7201b

module.exports = ({express, bcrypt, jwt, Admin, config}) => {
    const routes = express.Router()
  
    routes.post('/login', (req, res) => {
      const email = req.body.email
      const password = req.body.password
      if (!email || !password) return res.status(400).json({type: 'error', message: 'email and password fields are essential for authentication.'})
      Admin.find({email: email}).exec((error, doc)=>{
        if (error) return res.status(500).json({type: 'error', message: 'db error', error})
        if (doc.length == 0) return res.status(403).json({type: 'error', message: 'User with provided email not found in database.'})
        bcrypt.compare(password, doc.password, (error, result) => {
          if (error) return res.status(500).json({type: 'error', message: 'bcrypt error', error})
          if (result) {
            res.json({
              type: 'success',
              message: 'User logged in.',
              user: {id: doc._id, email: doc.email},
              token: jwt.sign({id: doc._id, email: doc.email}, config.JWT_SECRET, {expiresIn: config.JWT_TOKEN_TIME})
            })
          } else return res.status(403).json({type: 'error', message: 'Password is incorrect.'})
        })
      })
    })
  
    routes.get('/me', (req, res) => {
      const token = req.headers['x-access-token']
      if (!token) return res.status(400).json({type: 'error', message: 'x-access-token header not found.'})
      jwt.verify(token, config.JWT_SECRET, (error, result) => {
        if (error) return res.status(403).json({type: 'error', message: 'Provided token is invalid.', error})
        return res.json({
          type: 'success',
          message: 'Provided token is valid.',
          result
        })
      })
    })
  
    return routes
}