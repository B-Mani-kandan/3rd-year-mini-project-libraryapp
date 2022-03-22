// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import dbConnect from "../../db/connectDb"
// import Book from '../../models/Book'
import Admin from '../../models/Admin'
dbConnect()
import { sign } from "jsonwebtoken";
import { serialize } from "cookie";

const secret = 'arunmani';

export default async function handler(req, res) {
  
  const { method } = req
  if(method === "POST"){
    let {ID,PWD} = req.body
    const admin = await Admin.findOne({ ID,PWD})

    if(admin){
      const token = sign(
        {
          exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30, // 30 days
          ID,
          Admin:true
        },
        secret
      );

      
    const serialised = serialize("OursiteJWT", token, {
      secure:false,
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    });
       res.setHeader("Set-Cookie", serialised);
       res.status(200).json({ message: "Success!" });
    }
    if(!admin){
        res.status(200).json({"data":"no user to be found"})
    }
  }
//   let dats = await Book.find({})
	// let dats = await User.find({})
}
