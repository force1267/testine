

const Router = require('express')
const CommentController = require('../controllers/comment.controller')
const router = new Router()

// Get all comments
router.get('/all', (req, res) => {
    CommentController.getAll(req, res)
})

// Get all comments related to a post_cuid for client side only!
router.get('/cmnts/client/:cuid', (req, res) => {
    CommentController.getAllForClient(req, res)
})

// Get one comment by cuid
router.get('/:cuid', (req, res) =>{
    CommentController.getrelatedPost(req,res)
})

// submit a comment
router.put('/sbt-com/:cuid', (req, res)=>{
    CommentController.submitComment(req, res)
})

// block a comment
router.put('/blc-com/:cuid', (req, res)=>{
    CommentController.blockComment(req, res)
})

// Add a new comment
router.post('/add-new', (req, res) => {
    CommentController.addComment(req, res)
})

// update a comment
router.put('/:cuid', (req, res) => {
    CommentController.updateComment(req, res)
})

// Delete a comment by cuid
router.delete('/:cuid', (req, res) => {
    CommentController.deleteComment(req, res)
})

module.exports = router