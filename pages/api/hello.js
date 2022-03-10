// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import dbConnect from "../../db/connectDb"
// import { addBooks } from "../../db/function"
import mongoose from 'mongoose'
let Book = mongoose.model('Book')


export default async function handler(req, res) {
  dbConnect()
	let dats = await Book.find({})
  res.status(200).json(dats)
}
