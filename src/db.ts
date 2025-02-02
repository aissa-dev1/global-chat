import mongoose from "mongoose";

export async function dbConnect() {
  await mongoose.connect(process.env.DB_URI!);
  console.log("DB connected");
}
