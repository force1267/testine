
// https://github.com/Kasheftin/nuxt-auth-from-scratch
// https://ponyfoo.com/articles/json-web-tokens-vs-session-cookies
// https://security.stackexchange.com/questions/16354/whats-the-advantage-of-using-pbkdf2-vs-sha256-to-generate-an-aes-encryption-key

module.exports = ({express, jwt, User, crypto}) => {
    const routes = express.Router()
    const cfg = require('../config/.config')
    const multer = require('multer')
    const path = require('path')
    var storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, 'static/')
      },
      filename: function (req, file, cb) {
        crypto.pseudoRandomBytes(16, function (err, raw) {
          cb(null, raw.toString('hex') + Date.now() + path.extname(file.originalname))
        });
      }
  })
  const upload = multer({storage: storage})

 // API route to login
    routes.post('/login', (req, res) => {
      const email = req.body.email
      const password = req.body.password
      if (!email || !password) return res.status(400).json({type: 'error', message: 'email and password fields are essential for authentication.'})
      User.findOne({email: email}, function(error, doc){
        if(error !== null) return res.status(500).json({type: 'error', message:'Server error', err})
        if(doc === null) return res.status(402).json({type: 'error', message: 'User with provided email not found.'}) // (Payment Required)
        if(doc.password === crypto.pbkdf2Sync(password, doc.salt, 10000, 512, 'sha512').toString('hex')) {
          doc.lastseendate = Date.now() // we're updating lastseendate everytime the admin try to log in!
          // save the new lastseendate value
          User.updateOne({_id: doc._id}, doc, function (err, u) {
                if (err) res.status(400).json({type: 'error', message: 'Cant update lastseendate!', err})
                res.json({ // we can't set the header after they are sent to the client so we put the res.json inside the update process and send to client!
                  type: 'success',
                  message: 'User logged in.',
                  user: {id: doc._id, isAdmin: doc.isAdmin, email: doc.email, username: doc.username, avatar: doc.avatar, bio: doc.bio, createdAt: doc.createdAt, updatedAt: doc.updatedAt, lastseendate: doc.lastseendate, activation_token: doc.activation_token},
                  token: jwt.sign({id: doc._id}, cfg.JWT_SECRET, {expiresIn: cfg.JWT_TOKEN_TIME})
                })
            })
        } else return res.status(403).json({type: 'error', message: 'Password is incorrect!'}) // (Forbidden)
      })
    })
// API route to check the user
    routes.get('/me', (req, res) => { 
      const token = req.headers['x-access-token']
      if (!token) return res.status(400).json({type: 'error', message: 'x-access-token header not found.'})
      jwt.verify(token, cfg.JWT_SECRET, (error, result) => {
        if (error) return res.status(403).json({type: 'error', message: 'Provided token is invalid.', error})
        // we are finding our user using its jwt decoded id to update its info and send the entire user document
        // with our response in order not to lose our user state in our store. if we send only the result of decoded jwt and the message 
        // we'll lose our user state data(we need the whole doc cause of security policy section manner which contain updaing process). 
        // due to single state tree in our store we can only use one state in our entire store of our application
        // cause of this issue it'll override the prev content of our user state object!
        // we can use modules feature to handle multiple states in our store.
        // we could use this feature for this route but know this that every module is for a specific route CRUD
        // and we are using auth.js for all auth routes CRUD which is belong to our user state! 
        // and for something like posts state we have to use posts module in our store.
        User.findOne({_id: result.id}, 
          function(err, model) {
              if(!err){
                return res.status(201).json({
                    message: 'VALID',
                    user:{
                      isAdmin: model.isAdmin,
                      activation_token: model.activation_token,
                      id: model._id,
                      username: model.username,
                      email: model.email,
                      avatar: model.avatar,
                      bio: model.bio,
                      createdAt: model.createdAt,
                      updatedAt: model.updatedAt,
                      lastseendate: model.lastseendate
                    }
                 })
              } else{
                  return res.status(500).json({
                     type: 'error',
                     message: "not found any relative data! call support team.",
                     error
                  })
              }
          })
      })
    })
// API route to update the user
    routes.post('/update', (req,res) => {
    // we are finding our user by its id to update his document.
    // after that we'll send our response along with the updated 
    // document in order to save it on our user state in our auth store!
    // in our vue page we use computed method to load a user 
    // this propery is useful for manipulating data and recomputing any changes in component
      User.findByIdAndUpdate(req.body.id, req.body, {new: true}, 
      function(err, model) {
          if(!err){
            return res.status(201).json({
                message: 'credentials updated successfully!',
                updatedData:{
                  isAdmin: model.isAdmin,
                  activation_token: model.activation_token,
                  id: model._id,
                  username: model.username,
                  email: model.email,
                  avatar: model.avatar,
                  bio: model.bio,
                  createdAt: model.createdAt,
                  updatedAt: model.updatedAt,
                  lastseendate: model.lastseendate
                }
             })
          } else{
              return res.status(500).json({
                 type: 'error',
                 message: "not found any relative data! call support team.",
                 error
              })
          }
        })
    })
// API route to upload and update avatar(i think we need graphql just not to send the whole user info again)
    routes.post('/upload', upload.single('file'), (req,res)=>{
    // we are using multer to handle incomming files in req from client
    // we are updating the user avatar and sending the entire modeldocumnet again(cause of sore structure)
    // along with the successfull message.
      User.findByIdAndUpdate(req.body.userID, {'avatar': req.file.filename}, {new: true}, 
      function(err, model){
        if(!err){
          return res.status(201).json({
              message: 'uploaded successfully!',
              updatedData:{
                isAdmin: model.isAdmin,
                activation_token: model.activation_token,
                id: model._id,
                username: model.username,
                email: model.email,
                avatar: model.avatar,
                bio: model.bio,
                createdAt: model.createdAt,
                updatedAt: model.updatedAt,
                lastseendate: model.lastseendate
              }
           })
        } else{
            return res.status(500).json({
               type: 'error',
               message: "not found any relative data! call support team.",
               error
            })
        }
      }) 
    })

    return routes
}