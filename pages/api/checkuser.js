import {verify } from "jsonwebtoken";

const secret = 'arunmani';

export default async function handler(req, res) {
try{
  const { method } = req
  if(method === "POST"){
        let jwt = req.headers.authorization;
        let dataFromToken = verify(jwt, secret);
        console.log(dataFromToken)
        if(!jwt || !dataFromToken){
            res.json({message:'token required'})
        }
        let  ID  = dataFromToken?.ID;
        if(ID){
            res.json({user:'admin'})
        }
        let Regno = dataFromToken?.Regno
        if(Regno){
            res.json({user:'user'})
        }
    }
}catch(e){
    res.json({message:'token required'})
}
}
