// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import dbConnect from "../../db/connectDb";
import Book from "../../models/Book";
import User from "../../models/User";
import { verify } from "jsonwebtoken";
import mongoose from "mongoose";
// import { addUsers } from "../../db/function";
dbConnect();



export default async function handler(req, res) {
  // await addUsers()
  const secret = "arunmani";
  const { method } = req;
  if (method === "POST") {
    try{
    let { bookid } = req.body;
    let jwt = req.headers.authorization;
    let dataFromToken = verify(jwt, secret);
    let Regno = dataFromToken.Regno;
  	let user = await User.findOne({Regno})
    let book = await Book.findOne({_id:bookid})
    if(book){
      user.RequestedBooks.push({BookId:bookid})
    }
    await user.save();
  	let currentUser = await User.findOne({Regno})
    let requestedBooksId = currentUser.RequestedBooks

    let requestedBooksOperator = []
    for (let d of requestedBooksId){
        requestedBooksOperator.push(mongoose.Types.ObjectId(d.BookId))
    }
  
    let requestedBooks = await Book.find({
      '_id': { $in: requestedBooksOperator}
  })
    res.status(200).json(requestedBooks);
}catch(e){
  res.status(403).json({"message":"error"})
}
  }
}
