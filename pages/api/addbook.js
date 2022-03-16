import Book from "../../models/Book";
import { verify } from "jsonwebtoken";

export default async function handler(req, res) {
  try {
    const jwt = req.cookies.OursiteJWT;
    const secret = "arunmani";
    verify(jwt, secret);
    if (req.method === "POST") {
      let { BookTitle, BookAuthor, BookPublishers } = req.body;
     let bok =   new Book({
        Title:BookTitle,
        Authors: BookAuthor,
        Publishers:BookPublishers,
        currentHolder:"libary"
      });
      console.log(bok)
      await bok.save()
      let books =await  Book.find({})
      res.status(200).json(books) 
    }
  } catch (e) {
    res.status(200).json({"messsage":"something went to wrong"}) 

  }
}
