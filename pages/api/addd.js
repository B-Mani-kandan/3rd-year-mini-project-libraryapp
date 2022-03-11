// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import dbConnect from "../../db/connectDb";
import Book from "../../models/Book";
import User from "../../models/User";
import { verify } from "jsonwebtoken";
import mongoose from "mongoose";
import { addUsers ,addBooks,addAdmin} from "../../db/function";
dbConnect();



export default async function handler(req, res) {
  // await addUsers()
//   await addUsers()
//   await addBooks()
//   await addAdmin()
    res.status(200).json({"OK":"ok"});
  
}
