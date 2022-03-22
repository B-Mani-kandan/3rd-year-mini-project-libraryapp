// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import dbConnect from "../../db/connectDb";
import Book from "../../models/Book";
import User from "../../models/User";
import mongoose from "mongoose";
import { chechAuth } from "../../functions";
dbConnect();

export default async function handler(req, res) {
  
  if (method === "POST") {
    let registerNum = chechAuth(req)

    if(!registerNum){
       res.status(403).json({"message":"user not found"});
    }

    const { bookId } = req.body;

    let currentUser = await User.findOneAndUpdate(
      { Regno },
      { $pull: { Books: bookId } },
      { new: true }
    );

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

    res.status(200).json({returnBooks,myBooks ,'status':200});
  }
}
