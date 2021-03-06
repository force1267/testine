
const Router = require('express')
const PostController = require('../controllers/post.controller')
const router = new Router()
const multer = require('multer')
const path = require('path')
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'static/cover/')
    },
    filename: function (req, file, cb) {
      crypto.pseudoRandomBytes(16, function (err, raw) {
        cb(null, raw.toString('hex') + Date.now() + path.extname(file.originalname))
      });
    }
 })
const upload = multer({storage: storage})

// Get all Posts
router.get('/all', (req, res) => {
    PostController.getAll(req, res)
})

// Get one post by cuid
router.get('/:cuid', (req, res) =>{
    PostController.getPost(req,res)
})

// Get all comments related to a post_cuid for admin side only!
router.get('/cmnts/admin/:cuid', (req, res) => {
    PostController.getrelatedComments(req, res)
})

// enable a post
router.put('/able-pst/:cuid', (req, res)=>{
    PostController.submitPost(req, res)
})

// disable a post
router.put('/dsble-pst/:cuid', (req, res)=>{
    PostController.blockPost(req, res)
})

// Add a new Post
// use UplodFile.vue and use req.file.filename in post.controller.js to get the user file for post cover
router.post('/add-new', upload.single('file'), (req, res) => {
    PostController.addPost(req, res)
})

router.put('/:cuid', upload.single('file'), (req, res) => {
    PostController.updatePost(req, res)
})

// Delete a post by cuid
router.delete('/:cuid', (req, res) => {
    PostController.deletePost(req, res)
})

module.exports = router