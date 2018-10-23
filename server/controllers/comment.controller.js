

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


// API to fetch all comments related to a post_cuid for client side only! 
// we need a state for this one to fill it only with those comments which are related to a post_cuid
CommentController.getAllForClient = async (req, res) => {
    try{
        await Comments.find({ post_cuid: req.params.cuid }).exec((err, comments) => {
            if (err) return res.status(500).json({type: 'error', message:'Server error', err})
            return res.json({type:'success', message:'fetched successfully', comments })
        })
    }
    catch(err){
        return res.json({type:'error', message: 'Sorry! Bad Erorr, Try Again.', err})
    }
}

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
// you can use this route to fetch a single comment in single page mode
// you can also send a single comment through json formating in res object
// but for now we're calling it from the vue to load a single post 
// related to a comment cuid and fill the post state
CommentController.getrelatedPost = async (req, res) => {
    try{
        await Comments.findOne({ cuid: req.params.cuid }).exec((err, comment) => {
            if (err) return res.status(500).json({type: 'error', message:'Server error', err})
            Posts.findOne({ cuid: comment.post_cuid }, 'title').exec((err, post) => {
                if (err) return res.status(500).json({type: 'error', message:'Server error', err})
                return res.json({type:'success', message:'fetched successfully', post}) // you can also send the comment document in Comments.findOne callback through json formating
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
            content: sanitizeHtml(req.body.content),
            cuid: cuid()
        })

        newComment.save((err, comment) => {
            if (err) return res.status(500).json({type: 'error', message:'Server error', err}) // eg: for required fields like post_cuid
            // we return all comments in order to commit the comments state 
            // again and feel the run-time manner in computed method! 
            // so the admin can see every new comment comming from the 
            // db without refreshing the page or waiting for a notif    
            Comments.find().sort('-createdAt').exec((err, comments) => {
                if (err) return res.status(500).json({type: 'error', message:'Server error', err})
                return res.json({type:'success', message:'added successfully', comments})
            })
        })
    }
    catch (err) {
        return res.json({err, message: 'Sorry! Server Erorr, Try Again.', type:'error'})
    }
}

// API route to update a single comment
CommentController.updateComment = async (req, res) => {
    try {
        // if (!req.body.content) return res.status(403).json({type: 'error', message: 'content fields is essential for update.'})
        Comments.findOne({ cuid: req.params.cuid }).exec((err, comment) => {
            // Handle any possible database errors
            if (err) {
                return res.status(500).json({type: 'error', message:'Server error', err})
            } else {
                // Update each attribute with any possible attribute that may have been submitted in the body of the request
                // If that attribute isn't in the request body, default back to whatever it was before.
                comment.name = sanitizeHtml(req.body.name) || comment.name
                comment.email = sanitizeHtml(req.body.email) || comment.email
                comment.content = sanitizeHtml(req.body.content) || comment.content // if content is empty we can't be here but we're considering the worst case!
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
        await Comments.findOne({ cuid: req.params.cuid }).exec((err, comment) => {
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

// API route to submit a comment
CommentController.blockComment = async (req, res) => {
    try{
        Comments.findOne({ cuid: req.params.cuid }).exec((err, comment) => {
            // Handle any possible database errors
            if (err) {
                return res.status(500).json({type: 'error', message:'Server error', err})
            } else {
                comment.status = false
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
    catch{
        return res.json({err, message: 'Sorry! Server Erorr, Try Again.', type:'error'})
    }
}

// API route to block a comment
CommentController.submitComment = async(req, res) =>{
    try{
        Comments.findOne({ cuid: req.params.cuid }).exec((err, comment) => {
            // Handle any possible database errors
            if (err) {
                return res.status(500).json({type: 'error', message:'Server error', err})
            } else {
                comment.status = true
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
    catch{
        return res.json({err, message: 'Sorry! Server Erorr, Try Again.', type:'error'})
    }

}

module.exports = CommentController