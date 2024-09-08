import mongoose from "mongoose";

const connectWithRetry = () => {
  console.log('Attempting to connect to MongoDB...');
  return mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.info("Authenticate Service Database Connected !");
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB, retrying in 5 seconds...', err);
    setTimeout(connectWithRetry, 5000);
  });
};

connectWithRetry();