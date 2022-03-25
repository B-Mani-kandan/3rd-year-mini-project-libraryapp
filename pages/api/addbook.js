import Book from "../../models/Book";
import { verify } from "jsonwebtoken";
import { ownerApi } from "../../functions";

export default async function handler(req, res) {
  try {
    if (req.method === "POST") {
      let ID = ownerApi(req);
      if (!ID) {
        res.status(403).json({ message: "forbidden" });
      }
      let { BookTitle, BookAuthor, BookPublishers } = req.body;
      let bok = new Book({
        Title: BookTitle,
        Authors: BookAuthor,
        Publishers: BookPublishers,
        currentHolder: "libary",
      });
      await bok.save();
      let books = await Book.find({});
      res.status(200).json(books);
    }
  } catch (e) {
    res.status(200).json({ messsage: "something went to wrong" });
  }
}
