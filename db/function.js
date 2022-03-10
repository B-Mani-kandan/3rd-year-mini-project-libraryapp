import data from "../data/data.json";
import mongoose from 'mongoose'
let Book = mongoose.model('Book')


export const addBooks = async () => {
  for (let d of data) {
    let bk = new Book({
        Title: d["Title of the book"],
      Authors: d.Authors,
      Publishers:`${d.Publishers ? d.Publishers : 'none' }`,
      currentHolder:"libary"
    });
    await bk.save()
  }
};
