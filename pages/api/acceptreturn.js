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

        const { Regno, BookId } = req.body

        await User.findOneAndUpdate(
            { Regno },
            { $pull: { ReturnBooks: { BookId } } },
            {new:true}
          );
        await Book.findOneAndUpdate({ _id: BookId }, { currentHolder: "libary" },{new:true});
        
        let returnBookUsers = await User.find({"ReturnBooks.0":{$exists: true }})

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
        
         res.status(200).json({ returnBookData,data});
        
      }
    }
    catch(e){

    }
}