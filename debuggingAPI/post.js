
/* ----------
* Post Schema
*/

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const postSchema = new Schema({
    title: { type: String, required: true },
    en_title: { type: String, required: true },
    content: { type: String, required: true }, //TODO: use CK-editor for post content!
    en_content: { type: String, required: true },
    slug: { type: String, required: true },
    en_slug: { type: String, required: true },
    cover: {type: String, type: String, default: '' },
    cuid: { type: String, required: true }
}, {timestamps: true})

let Post = mongoose.model('Post', postSchema)
module.exports = Post