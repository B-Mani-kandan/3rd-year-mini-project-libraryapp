import mongoose from 'mongoose'

async function dbConnect() {
  try {
    // await mongoose.connect(process.env.MONGO_URI, {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    //   useCreateIndex: true,
    //   useFindAndModify: false
    // });
    await mongoose.connect('mongodb://localhost:27017/libaryapp', { useNewUrlParser: true,useUnifiedTopology: true, });
    console.log("Mongodb connected");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

export default dbConnect