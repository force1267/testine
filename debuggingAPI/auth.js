

module.exports = ({express, User}) => {
    const routes = express.Router()
    const cph = require('./cph.controller')

    routes.post('/login', (req, res) => {
    
      User = new User({
        username: req.body.username,
        email: req.body.email,
        bio: "this is my bio!",
        password: cph.hashMe("@zizi.M123").hp,
        salt: cph.hashMe("@zizi.M123").slt
      })
    
      User.save(function (err) {
          if(err) console.log(err)
      })
    })

    return routes
}