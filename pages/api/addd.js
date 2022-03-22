// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import dbConnect from "../../db/connectDb";
import Admin from "../../models/Admin";
dbConnect();
import { sign } from "jsonwebtoken";




export default async function handler(req, res) {
  // await addUsers()
  // await addUsers()
  // await addBooks()
  // await addAdmin()
    let data =  await Admin.find({})

    const token = sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30, // 30 days
        ID:231,
        Admin:true
      },
      'asada'
    );


    res.status(200).json({token})
  
}
