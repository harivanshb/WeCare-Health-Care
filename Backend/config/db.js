//Connection file to mongo db
import colors from "colors";
import mongoose from "mongoose";

const uri = "mongodb+srv://csci5408:Mtvroadies%4028@cluster1.uotao.mongodb.net/WeCare"
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(uri, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });
    console.log(`MongoDB database Connected: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.error(`Error: ${error.message}`.red.bold);
    process.exit();
  }
};

export default connectDB;