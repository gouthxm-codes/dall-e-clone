import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import postRoutes from "./routes/postRoutes.js";
import dalleRoutes from "./routes/dalleRoutes.js";
import connectDB from "./mongodb/connect.js";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use("/api/v1/post", postRoutes);
app.use("/api/v1/dalle", dalleRoutes);
app.get("/", async (req, res) => {
  res.send("Hellow");
});
const startServer = async () => {
  try {
    connectDB(process.env.MONGO_URL);
    app.listen(8080, () => console.log("server has started"));
  } catch (error) {
    console.log(error.message);
  }
};

startServer();
