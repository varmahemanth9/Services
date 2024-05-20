import mongoose from "mongoose";

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.set("strictQuery", true);

process.on("SIGINT", async () => {
  await mongoose.connection.close();
  console.info("Mongoose disconnected on app termination !");
  process.exit(0);
});
const db = mongoose.connection;
db.on("error", () => console.error("MongoDB Connection Error at Socket Service !"));
db.once("open", () => console.info("Socket Service Database Connected !"));
