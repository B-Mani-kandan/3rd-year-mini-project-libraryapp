import mongoose from 'mongoose'
const Schema = mongoose.Schema;


const adminModel = new Schema({
    ID:{ type: Number, required: true },
    PWD:{ type: String, required: true },
    Name:{ type: String, required: true }
},
{ timestamps: true })

module.exports = mongoose.models.Admin ||  mongoose.model("Admin", adminModel);
