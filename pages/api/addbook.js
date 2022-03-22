import Book from "../../models/Book";
import { verify } from "jsonwebtoken";

export default async function handler(req, res) {
  try {
    if (req.method === "POST") {
      let { BookTitle, BookAuthor, BookPublishers } = req.body;
     let bok =   new Book({
        Title:BookTitle,
        Authors: BookAuthor,
        Publishers:BookPublishers,
        currentHolder:"libary"
      });
      await bok.save()
      let books =await  Book.find({})
      res.status(200).json(books) 
    }
  } catch (e) {
    res.status(200).json({"messsage":"something went to wrong"}) 

  }
}
