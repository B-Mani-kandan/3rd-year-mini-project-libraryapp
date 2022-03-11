import mongoose from 'mongoose'
const Schema = mongoose.Schema;


const bookModel = new Schema({
    Title:{ type: String, required: true },
    Authors:{ type: String, required: true },
    Publishers:{ type: String, required: true },
    currentHolder : {type: String, required: true}
},
{ timestamps: true })

module.exports = mongoose.models.Book || mongoose.model("Book", bookModel);