import mongoose from 'mongoose'
const Schema = mongoose.Schema;


const userModel = new Schema({
    RegistorNumber:{ type: String, required: true },
    name:{ type: String, required: true },
    Dob:{ type: String, required: true },
    Books:[  {
        type:Schema.Types.ObjectId,
        ref:'Book'
    }],
    RequestedBooks:[
        {
            BookId:{type: String, required: true}
        }
    ]
},
{ timestamps: true })

module.exports = mongoose.model("User", userModel);
