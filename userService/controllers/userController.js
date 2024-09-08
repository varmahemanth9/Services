import express from "express";
import validator from "../validators/userValidator.js";
import * as userService from "../services/userService.js";

const router = express.Router();

router.use(validator);

router.post("/generate-otp", async (req, res) => {
  try {
    const response = await userService.generateUserOtp(req);
    return res.status(200).json(response);
  } catch (error) {
    console.error(`${req.path}-${error.message}`);
    return res.status(500).json({ error: error.message });
  }
});

router.post("/verify-otp", async (req, res) => {
  try {
    const response = await userService.verifyUserOtp(req);
    return res.status(200).json(response);
  } catch (error) {
    console.error(`${req.path}-${error.message}`);
    return res.status(500).json({ error: error.message });
  }
});

export default router;
