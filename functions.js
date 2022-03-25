import { verify } from "jsonwebtoken";
const secret = "arunmani";


export const chechAuth = (req) =>{
    const jwt = req.headers.authorization;
    let dataFromToken = verify(jwt, secret);
    if (!dataFromToken) {
       return false
    }else{
        return dataFromToken.Regno;
    }
}



export const ownerApi = (req) =>{
  let jwt = req.headers.authorization;
  let dataFromToken = verify(jwt, secret);
  if(!jwt || !dataFromToken){
    return false
  }
  let { ID } = dataFromToken;
  return ID
}