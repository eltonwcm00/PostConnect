//Connection file to mongo db
import dotenv from 'dotenv';
import mongoose from "mongoose";
dotenv.config();

const connectDB = async () => {

const connectionURL = process.env.MONGO_URI;
  
  try {
    mongoose.set('strictQuery', true);
    const conn = await mongoose.connect(connectionURL, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit();
  }
};

export default connectDB;