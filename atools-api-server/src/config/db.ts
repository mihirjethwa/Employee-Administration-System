import mongoose from "mongoose";

export const connectDB = async () => {
  const connect = await mongoose.connect(`${process.env.MONGO_URI}`, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: true, useUnifiedTopology: true });
  console.log("mongodb connected");
};
