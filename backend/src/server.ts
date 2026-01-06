import app from "./index";
import { connectDB } from "./config/database";
import env from "./config/env";

const PORT = env.PORT;

const startServer = async () => {
  try {
    const result = await connectDB();
    console.log(`database status: ${result}`);

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
};

startServer();
