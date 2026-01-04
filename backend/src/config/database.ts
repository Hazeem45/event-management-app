import mongoose from "mongoose";

export const connectDB = async (): Promise<any> => {
  try {
    const result = await mongoose.connect(process.env.MONGO_URI as string, {
      dbName: "event-management-db",
    });

    return Promise.resolve("MongoDB connected!");
  } catch (error) {
    return Promise.reject(error);
  }
};
