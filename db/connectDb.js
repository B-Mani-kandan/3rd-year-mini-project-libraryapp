import mongoose from 'mongoose'

let DB_URL="mongodb+srv://arunmani:9787480892@cluster0.o9yhm.mongodb.net/libaryappnew?retryWrites=true&w=majority"

async function dbConnect() {
  try {
    await mongoose.connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    // await mongoose.connect('mongodb://localhost:27017/libaryappnew', { useNewUrlParser: true,useUnifiedTopology: true, });
  } catch (error) {
    console.log(error);
  }
}

export default dbConnect