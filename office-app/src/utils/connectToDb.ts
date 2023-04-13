import mongoose from "mongoose";
import { config } from "../config/config";

async function connectToDb() {
  const dbUri = config.mongo.url;
  try {
    await mongoose.connect(dbUri);
    console.log("Connected to DB");
  } catch (e) {
    process.exit(1);
  }
}

export default connectToDb;