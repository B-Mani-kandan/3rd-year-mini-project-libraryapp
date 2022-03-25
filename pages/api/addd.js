// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import dbConnect from "../../db/connectDb";
import Admin from "../../models/Admin";
dbConnect();




export default async function handler( res) {
  // await addUsers()
  // await addUsers()
  // await addBooks()
  // await addAdmin()
    // let data =  await Admin.find({})

    



    res.status(200).json({data})
  
}
