import dbConnect from "../../db/connectDb"
import User from '../../models/User'
import { sign } from "jsonwebtoken";
dbConnect()
const secret = 'arunmani';

export default async function handler(req, res) {
  const { method } = req
  if(method === "POST"){
    try{
    let {Regno,DOB} = req.body
    const user = await User.findOne({ Regno,DOB})
    if(user){
      const token = sign(
        {
          exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
          Regno,
        },
        secret
      );
       res.status(200).json({token});
    }
    if(!user){
        res.status(200).json({data:"no user to be found"})
    }
  }catch(e){
    res.status(401).json({message:"no user to be found"})
  }
  }
}
