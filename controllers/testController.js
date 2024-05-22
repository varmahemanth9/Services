import express from "express";
// import validator from "../validators/testValidator.js";
// import * as intrinioService from "../services/intrinioService.js";
import * as client from "../commonFunctions/redis.js";

const router = express.Router();

// router.use(validator);

router.get("/", async (req, res) => {
  try {
    const key = "counter";
    const cache = await client.increamentKey(key);
    return res.status(200).json({ message: "OK", cache });
  } catch (error) {
    throw error;
  }
});

export default router;
