// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import dbConnect from "../../db/connectDb"
import Book from '../../models/Book'
import User from '../../models/User'
import { verify } from "jsonwebtoken";
import mongoose from "mongoose";

export default async function handler(req, res) {

 const secret = "arunmani";
 let jwt =   req.headers.authorization

 let dataFromToken =  verify(jwt, secret);

 let Regno = dataFromToken.Regno

  dbConnect()
	let data = await Book.find({})
	let user = await User.find({Regno})



  let requestedBooksId = user[0].RequestedBooks

  let requestedBooksOperator = []
  for (let d of requestedBooksId){
      requestedBooksOperator.push(mongoose.Types.ObjectId(d.BookId))
  }

  let requestedBooks = await Book.find({
    '_id': { $in: requestedBooksOperator}
})


  // console.log(requestedBooks)

  res.status(200).json({data,user,requestedBooks})
}
