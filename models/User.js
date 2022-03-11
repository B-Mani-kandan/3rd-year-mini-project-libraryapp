import mongoose from 'mongoose'
const Schema = mongoose.Schema;


const userModel = new Schema({
    Regno:{ type: Number, required: true },
    Name:{ type: String, required: true },
    DOB:{ type: String, required: true },
    Department:{type: String, required: true},
    Books:[  {
        type:Schema.Types.ObjectId,
        ref:'Book'
    }],
    RequestedBooks:[
        {
            BookId:{type: String, required: true}
        }
    ],
    ReturnBooks:[
        {
            BookId:{type: String, required: true}
        }
    ]
},
{ timestamps: true })

module.exports = mongoose.models.User ||  mongoose.model("User", userModel);
