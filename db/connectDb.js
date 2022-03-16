import mongoose from 'mongoose'

async function dbConnect() {
  try {
    await mongoose.connect('mongodb+srv://arunmani:9787480892@cluster0.o9yhm.mongodb.net/libaryappnew?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    // await mongoose.connect('mongodb://localhost:27017/libaryappnew', { useNewUrlParser: true,useUnifiedTopology: true, });
    console.log("Mongodb connected");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

export default dbConnect