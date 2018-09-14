
/* ----------
* Post Schema
*/

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const postSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true }, //TODO: use CK-editor for post content!
    slug: { type: String, required: true },
    magpic: {type: String, required: true},
    cuid: { type: String, required: true }
}, {timestamps: true})

let Post = mongoose.model('Post', postSchema)
module.exports = Post