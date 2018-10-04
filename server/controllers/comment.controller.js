

/* -----------------
* Comment Controller
*/

// we have to return the whole comment documents to the comments store
// to commit the comment state and update it with a fresh documents every time 
// we dispatch an action from store to back end database in order to use the run-time
// manner in computed method vue page. the problem with REST api is we don't act like
// graph to fetch only what we need; so GraphQl is needed. because of that nature we'll
// fetch all comments in every route and send them through res.json object!

const Comments = require('../model/schema/comment')
const Posts = require('../model/schema/post')
const sanitizeHtml = require('sanitize-html')
const cuid = require('cuid')
const CommentController = {}

// API route to get all comments
CommentController.getAll = async (req, res) => {
    try{
        await Comments.find().sort('-createdAt').exec((err, comments) => {
            if (err) return res.status(500).json({type: 'error', message:'Server error', err})
            return res.json({type:'success', message:'fetched successfully', comments })
        })
    }
    catch(err){
        return res.json({type:'error', message: 'Sorry! Bad Erorr, Try Again.', err})
    }
}

// API route to get a single comment and its post info
CommentController.getComment = async (req, res) => {
    try{
        Comments.findOne({ cuid: req.params.cuid }).exec((err, comment) => {
            if (err) return res.status(500).json({type: 'error', message:'Server error', err})
            Posts.findOne({ cuid: comment.post_cuid }).exec((err, post) => {
                if (err) return res.status(500).json({type: 'error', message:'Server error', err})
                return res.json({type:'success', message:'fetched successfully', comment, post })
            })
        })
    }
    catch(err){
        return res.json({type:'error', message: 'Sorry! Bad Erorr, Try Again.', err})
    }
}

// API route to add a new comment
// this route belongs to users only to add comment for a specific post so post_cuid is required on that post page component
// TODO: validation on client side like cds-setup page using vue rules
CommentController.addComment = async (req, res) => { 
    try {
        if (!req.body.name || !req.body.email || !req.body.content) return res.status(403).json({type: 'error', message: 'email, name and content fields are essential.'})

        newComment = new Comments({
            email: sanitizeHtml(req.body.email), // I can't trust user input
            name: sanitizeHtml(req.body.name), // I can't trust user input
            post_cuid: req.body.post_cuid,
            content: req.body.content, // we can't sanitize content cause we're using ck-editor
            cuid: cuid()
        })

        newComment.save((err, comment) => {
            if (err) return res.status(500).json({type: 'error', message:'Server error', err}) // eg: for required fields like post_cuid
            return res.json({type:'success', message:'New Comment Saved Successfully!', comment })
        })
    }
    catch (err) {
        return res.json({err, message: 'Sorry! Server Erorr, Try Again.', type:'error'})
    }
}

// API route to update a single comment
CommentController.updateComment = async (req, res) => {
    try {
        if (!req.body.content) return res.status(403).json({type: 'error', message: 'content fields is essential for update.'})
        Comments.findOne({ cuid: req.params.cuid }).exec((err, comment) => {
            // Handle any possible database errors
            if (err) {
                return res.status(500).json({type: 'error', message:'Server error', err})
            } else {
                // Update each attribute with any possible attribute that may have been submitted in the body of the request
                // If that attribute isn't in the request body, default back to whatever it was before.
                comment.name = req.body.name || comment.name
                comment.content = req.body.content || comment.content // if content is empty we can't be here but we're considering the worst case!
                comment.email = req.body.email || comment.email
                comment.status = req.body.status || comment.status
                // Save the updated document back to the database
                comment.save((err, comment) => {
                    if (err) return res.status(500).json({type: 'error', message:'Server error', err})

                    // we return all comments in order to commit the comments state 
                    // again and feel the run-time manner in computed method!   
                    Comments.find().sort('-createdAt').exec((err, comments) => {
                        if (err) return res.status(500).json({type: 'error', message:'Server error', err})
                        return res.json({type:'success', message:'updated successfully', comments})
                    })
                })
            }
        })
    }
    catch (err) {
        return res.json({err, message: 'Sorry! Server Erorr, Try Again.', type:'error'})
    }
}

// API route to delete a single comment
CommentController.deleteComment = async (req, res) => {
    try {
        Comments.findOne({ cuid: req.params.cuid }).exec((err, comment) => {
            if (err) return res.status(500).json({type: 'error', message:'Server error', err})
            comment.remove(() => {
                // return res.status(200).json({type: 'success', message: 'removed successfylly', comment})
                // we return all comments in order to commit the comments state 
                // again and feel the run-time manner in computed method!
                Comments.find().sort('-createdAt').exec((err, comments) => {
                    if (err) return res.status(500).json({type: 'error', message:'Server error', err})
                    return res.json({type:'success', message:'fetched successfully', comments})
                })
            })
        })
    }
    catch (err) {
        return res.json({err, message: 'Sorry! Server Erorr, Try Again.', type:'error'})
    }
}

module.exports = CommentController