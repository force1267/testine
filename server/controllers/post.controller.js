
/* --------------
* Post Controller
*/
// TODO: use upload.single('file') for post cover
// TODO: use comment schema to show the number of comments for a single post
const Post = require('../model/schema/post')
const Comments = require('../model/schema/comment')
const cuid = require('cuid')
const sanitizeHtml = require('sanitize-html') // or use xss
const PostController = {}

// API route to fetch all posts
PostController.getAll = async (req, res) => {
    try{
        await Post.find().sort('-createdAt').exec((err, posts) => {
            if (err) return res.status(500).json({type: 'error', message:'Server error', err})
            return res.json({type:'success', message:'fetched successfully', posts })
        })
    }
    catch(err){
        return res.json({type:'error', message: 'Sorry! Bad Erorr, Try Again.', err})
    }
}

// API route to fetch a single post for client side only!
// cause in admin side we're using spa manner to see a post!
// and we don't need to fetch a single post cause we'll see it
// in edit item window!
// this method will dispatch from client side only.
PostController.getPost = async (req, res) => {
    try{
        Post.findOne({ cuid: req.params.cuid }).exec((err, post) => {
            if (err) return res.status(500).json({type: 'error', message:'Server error', err})
            return res.json({type:'success', message:'fetched successfully', post })
        })
    }
    catch(err){
        return res.json({type:'error', message: 'Sorry! Bad Erorr, Try Again.', err})
    }
}

// get all comments related to a single post
PostController.getrelatedComments = async (req, res) => {
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

// API route to add a post
// get post cover using req.file.filename
PostController.addPost = async (req, res) => {
    try {
        if (!req.body.title || 
            !req.body.en_title || 
            !req.body.content || 
            !req.body.en_content ||
            !req.body.tags ||
            !req.body.en_tags ||
            !req.file.filename) return res.status(403).json({type: 'error', message: 'all credentials are required!'})
        
        Post = new Post({
            title: sanitizeHtml(req.body.title),
            en_title: sanitizeHtml(req.body.en_title),
            content: req.body.content,
            en_content: req.body.en_content,
            slug: req.body.title.replace(/ /g,"-"),
            en_slug: slug(req.body.en_title.toLowerCase(), { lowercase: true }),
            tags: req.body.tags.replace(/\s/g, '').split(","), // sparate them by comma in UI eg) canada, visa
            en_tags: req.body.en_tags.replace(/\s/g, '').split(","),
            cuid: cuid(),
            status: true,
            cover: req.file.filename
          })

        Post.save((err, saved) => {
            if (err) return res.status(500).json({type: 'error', message:'Server error', err}) // maybe bad credentials !
            Post.find().sort('-createdAt').exec((err, posts) => {
                if (err) return res.status(500).json({type: 'error', message:'Server error', err})
                return res.json({type:'success', message:'added successfully', posts})
            })
        })
    }
    catch (err) {
        return res.json({type:'error', message: 'Sorry! Bad Erorr, Try Again.', err})
    }
}

// API route to update a post
PostController.updatePost = async (req, res) => {
    try {
        // if (!req.body.title || 
        //     !req.body.en_title || 
        //     !req.body.content || 
        //     !req.body.en_content ||
        //     !req.body.tags ||
        //     !req.body.en_tags ||
        //     !req.file.filename) return res.status(403).json({type: 'error', message: 'all credentials are required!'})

        Post.findOne({ cuid: req.params.cuid }).exec((err, post) => {
            // Handle any possible database errors
            if (err) return res.status(500).json({type: 'error', message:'Server error', err})
             else {
                // Update each attribute with any possible attribute that may have been submitted in the body of the request
                // If that attribute isn't in the request body, default back to whatever it was before.
                post.title = sanitizeHtml(req.body.title) || post.title
                post.slug = req.body.title.replace(/ /g,"-") || post.slug // in those case that title and en_title are empty!
                post.en_slug = slug(req.body.en_title.toLowerCase(), { lowercase: true }) || post.en_slug
                post.en_title = sanitizeHtml(req.body.en_title) || post.en_title
                post.content = req.body.content || post.content
                post.en_content = req.body.en_content || post.en_content
                post.tags = req.body.tags.replace(/\s/g, '').split(",") || post.tags
                post.en_tags = req.body.en_tags.replace(/\s/g, '').split(",") || post.en_tags
                post.cover = req.file.filename || post.cover
                // Save the updated document back to the database
                post.save((err, post) => {
                    if (err) return res.status(500).json({type: 'error', message:'Server error', err})
                    // we return all posts in order to commit the posts state 
                    // again and feel the run-time manner in computed method!   
                    Post.find().sort('-createdAt').exec((err, posts) => {
                        if (err) return res.status(500).json({type: 'error', message:'Server error', err})
                        return res.json({type:'success', message:'updated successfully', posts})
                    })
                })
            }
        })
    }
    catch (err) {
        return res.json({type:'error', message: 'Sorry! Bad Erorr, Try Again.', err})
    }
}

// API route to delete a post
PostController.deletePost = async (req, res) => {
    try {
        await Post.findOne({ cuid: req.params.cuid }).exec((err, post) => {
            if (err) return res.status(500).json({type: 'error', message:'Server error', err})
            post.remove(() => {
                // return res.status(200).json({type: 'success', message: 'removed successfylly', post})
                // we return all posts in order to commit the posts state 
                // again and feel the run-time manner in computed method!
                Post.find().sort('-createdAt').exec((err, posts) => {
                    if (err) return res.status(500).json({type: 'error', message:'Server error', err})
                    return res.json({type:'success', message:'fetched successfully', posts})
                })
            })
        })
    }
    catch (err) {
        return res.json({err, message: 'Sorry! Server Erorr, Try Again.', type:'error'})
    }
}

// API route to disable a post
PostController.blockPost = async (req, res) => {
    try{
        Post.findOne({ cuid: req.params.cuid }).exec((err, post) => {
            // Handle any possible database errors
            if (err) {
                return res.status(500).json({type: 'error', message:'Server error', err})
            } else {
                post.status = false
                // Save the updated document back to the database
                post.save((err, post) => {
                    if (err) return res.status(500).json({type: 'error', message:'Server error', err})
                    // we return all posts in order to commit the posts state 
                    // again and feel the run-time manner in computed method!   
                    Post.find().sort('-createdAt').exec((err, posts) => {
                        if (err) return res.status(500).json({type: 'error', message:'Server error', err})
                        return res.json({type:'success', message:'updated successfully', posts})
                    })
                })
            }
        })
    }
    catch{
        return res.json({err, message: 'Sorry! Server Erorr, Try Again.', type:'error'})
    }
}

// API route to enable a post
PostController.submitPost = async(req, res) =>{
    try{
        Post.findOne({ cuid: req.params.cuid }).exec((err, post) => {
            // Handle any possible database errors
            if (err) {
                return res.status(500).json({type: 'error', message:'Server error', err})
            } else {
                post.status = true
                // Save the updated document back to the database
                post.save((err, post) => {
                    if (err) return res.status(500).json({type: 'error', message:'Server error', err})
                    // we return all posts in order to commit the posts state 
                    // again and feel the run-time manner in computed method!   
                    Post.find().sort('-createdAt').exec((err, posts) => {
                        if (err) return res.status(500).json({type: 'error', message:'Server error', err})
                        return res.json({type:'success', message:'updated successfully', posts})
                    })
                })
            }
        })
    }
    catch{
        return res.json({err, message: 'Sorry! Server Erorr, Try Again.', type:'error'})
    }
}
    

module.exports = PostController