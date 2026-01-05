import mongoose from "mongoose";

export const connectDB = async (): Promise<any> => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string, {
      dbName: "event_management_db",
    });

    return Promise.resolve("MongoDB connected!");
  } catch (error) {
    return Promise.reject(error);
  }
};
