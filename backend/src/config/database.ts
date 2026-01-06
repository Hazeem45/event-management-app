import mongoose from "mongoose";
import env from "./env";

export const connectDB = async (): Promise<any> => {
  try {
    await mongoose.connect(env.MONGO_URI, {
      dbName: "event_management_db",
    });

    return Promise.resolve("MongoDB connected!");
  } catch (error) {
    return Promise.reject(error);
  }
};
