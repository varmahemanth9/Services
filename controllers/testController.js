import express from "express";
import validator from "../validators/intrinioValidator.js";
import * as intrinioService from "../services/intrinioService.js";

const router = express.Router();

router.use(validator);

router.post("/test-api", async (req, res) => {
  try {
    return res.status(200).json({ message: " Successful" });
  } catch (error) {
    throw error;
  }
});

export default router;
