
/* --------------
* Comment Schema
*/
// TODO: validation on client side like cds-setup page
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const commentSchema = new Schema({
    post_cuid: { type: String, required: true },
    name: { type: String, required: true },
    email:{ type: String, require: true },
    status: {type: Boolean, default: false },
    content: { type: String, required: true }, //TODO: use CK-editor for comment content!
    cuid: { type: String, required: true } // use instead of _id
}, {timestamps: true})

let Comments = mongoose.model('Comment', commentSchema)
module.exports = Comments