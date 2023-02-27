//Connection file to mongo db

import mongoose from "mongoose";

const connectDB = async () => {

  const CONNECTION_URL = 'mongodb+srv://elton:123@postconnect.vapzsrt.mongodb.net/?retryWrites=true&w=majority';
  
  try {
    const conn = await mongoose.connect(CONNECTION_URL, {
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