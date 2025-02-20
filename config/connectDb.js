import mongoose from "mongoose";
import { DB_NAME } from "../constants";

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
  // check if db is already connected
  if (cached.conn) {
    console.log("Already connected to DB");
    return cached.conn;
  }
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = await mongoose
      .connect(`${process.env.MONGODB_URI}/${DB_NAME}`, opts)
      .then((mongoose) => {
        return mongoose;
      });
  }
  // create a connection object
  cached.conn = await cached.promise;

  // log the connection success
  console.log(`DB Connected Successfuly. At DB Host: ${cached.conn.host}`);

  return cached.conn;
};

export default connectDB;
