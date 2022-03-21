import mongoose from 'mongoose'

async function dbConnect() {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    // await mongoose.connect('mongodb://localhost:27017/libaryappnew', { useNewUrlParser: true,useUnifiedTopology: true, });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

export default dbConnect