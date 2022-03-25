import { verify } from "jsonwebtoken";
import User from "../../models/User";
import Book from "../../models/Book";
import mongoose from 'mongoose'
import { ownerApi } from "../../functions";


export default async function handler (req, res) {
  try {
    let ID = ownerApi(req)
    if(!ID){
    res.status(403).json({ message: "forbidden" });
    }
    if (req.method === "POST") {
    
      const { Regno, BookId } = req.body;

      let currentUser =  await User.findOneAndUpdate(
        { Regno },
        { $pull: { RequestedBooks: { BookId } } },
        {new:true}
      );

      let currentBook =  await Book.findOneAndUpdate({ _id: BookId }, { currentHolder: Regno },{new:true});


      if(currentBook){
          currentUser.Books.push(currentBook)

          await currentUser.save()
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
     
	    let allBooksData = await Book.find({})
      
      res.status(200).json({dataTOsendForRequest,allBooksData});
    }
  } catch (e) {
    console.log(e)
    res.status(200).json({ message: "not valid" });
  }
}
