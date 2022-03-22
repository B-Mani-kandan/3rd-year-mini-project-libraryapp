// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import dbConnect from "../../db/connectDb";
import Book from "../../models/Book";
import User from "../../models/User";
import mongoose from "mongoose";
import Admin from "../../models/Admin";
import { ownerApi } from "../../functions";
dbConnect();

export default async function handler(req, res) {
 

  let ID = ownerApi(req)

  let admin = await Admin.findOne({ ID });

  if (!admin) {
    return res.status(401).json({ message: "unauthorized" });
  }

  let users = await User.find({ "RequestedBooks.0": { $exists: true } });

  let dataTOsendForRequest = [];

  for (let user of users) {
    let bookId = [];

    for (let req of user.RequestedBooks) {
      bookId.push(mongoose.Types.ObjectId(req.BookId));
    }

    let requestedBooks = await Book.find({
      _id: { $in: bookId },
    });

    dataTOsendForRequest.push({
      Name: user.Name,
      RegNo: user.Regno,
      requestedBooks,
    });
  }

  let returnBookUsers = await User.find({"ReturnBooks.0":{$exists: true }})
  // console.log(returnBookUsers)

  let returnBookData = []
 
  for (let user of returnBookUsers) {
    let bookId = [];

    for (let req of user.ReturnBooks) {
      bookId.push(mongoose.Types.ObjectId(req.BookId));
    }

    let retunBooks = await Book.find({
      _id: { $in: bookId },
    });

    returnBookData.push({
      Name: user.Name,
      RegNo: user.Regno,
      retunBooks,
    });
  }


	let data = await Book.find({})


  res.status(200).json({ dataTOsendForRequest, admin,data,returnBookData});
}
