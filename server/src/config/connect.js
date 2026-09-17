import mongoose from "mongoose";
import dns from "node:dns";

const connectDB = async () => {
  try {
   
    const dbUrl = process.env.MONGODB_URI;

    if (!dbUrl) {
      throw new Error("No db url found in environment variables");
    }

    dns.setServers(["8.8.8.8"]); //use google dns server to find mongodb atlas server

    const conn = await mongoose.connect(dbUrl);
    console.log(`MongoDB Connected: ${conn.connection.host}`);

  } catch (error) {
    console.error(`Database connection error: ${error.message}`);
    process.exit(1); // Stop the server if the database fails to connect
  }
};  

export default connectDB;