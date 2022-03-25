import dbConnect from "../../db/connectDb"
import Admin from '../../models/Admin'
dbConnect()
import { sign } from "jsonwebtoken";

const secret = 'arunmani';

export default async function handler(req, res) {
  
  const { method } = req
  if(method === "POST"){
    try{
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

       res.status(200).json({token});
    }
    if(!admin){
        res.status(200).json({"data":"no user to be found"})
    }
  }catch(e){
    res.status(403).json({message:"server error"})
  }
  }
}
