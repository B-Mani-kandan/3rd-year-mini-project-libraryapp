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
  const { cookies, method } = req;

  const jwt = cookies.OursiteJWT;

  if (method === "POST") {
    const { bookId } = req.body;

    let dataFromToken = verify(jwt, secret);

    if (!dataFromToken) {
      res.status(200).json({ message: "something went to wrong" });
    }
    let Regno = dataFromToken.Regno;
    // let user = await User.findOne({ Regno });

    let currentUser = await User.findOneAndUpdate(
      { Regno },
      { $pull: { Books: bookId } },
      { new: true }
    );

    // console.log(currentUser)

    await currentUser.ReturnBooks.push({ BookId: bookId });

    await currentUser.save();

    let user = await User.findOne({ Regno }).populate({ path: "Books" });

    let myBooks = user.Books;

    let returnBooksId = user.ReturnBooks;

    let returnBookOperator = [];
    for (let d of returnBooksId) {
      returnBookOperator.push(mongoose.Types.ObjectId(d.BookId));
    }

    let returnBooks = await Book.find({
      _id: { $in: returnBookOperator },
    });

    // if(book){
    //   user.RequestedBooks.push({BookId:bookid})
    // }
    // await user.save();
    // let currentUser = await User.findOne({Regno})
    // let requestedBooksId = currentUser.RequestedBooks

    // let requestedBooksOperator = []
    // for (let d of requestedBooksId){
    //     requestedBooksOperator.push(mongoose.Types.ObjectId(d.BookId))
    // }

    // let requestedBooks = await Book.find({
    //   '_id': { $in: requestedBooksOperator}
    //   })
    res.status(200).json({returnBooks,myBooks ,'status':200});
  }
}
