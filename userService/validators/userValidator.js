import mongoose from "mongoose";
import { phoneNumberRegex } from "../constants/constants.js";

const routeModels = {
  "/generate-otp": new mongoose.model(
    "generate-otp-validation",
    new mongoose.Schema(
      {
        phoneNumber: {
          type: String,
          validate: {
            validator: function(v) {
              return phoneNumberRegex.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
          },
          required: true,
          unique: true,
        }
      },
      { autoCreate: false }
    )
  ),
  "/verify-otp": new mongoose.model(
    "verify-otp-validation",
    new mongoose.Schema(
      {
        otp: {
          required: true,
          type: String,
          validate: {
            validator: function(v) {
              return v.length===4;
            },
            message: props => `${props.value} is not a valid OTP!`
          },
        },
        userId: { 
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true,
        }
      },
      { autoCreate: false }
    )
  ),
};

const validator = (req, res, next) => {
  if (!routeModels[req.path]) {
    return res.status(500).json({ message: "No validator found for this API" });
  }
  let doc = new routeModels[req.path]({
    ...req.query,
    ...req.body,
  });

  const error = doc.validateSync();
  if (error) return res.status(500).json({ message: error.message });

  doc = doc.toObject();
  delete doc._id;

  const queryMethods = ["GET"];
  const bodyMethods = ["POST", "PUT"];
  if (queryMethods.includes(req.method)) req.query = doc;
  if (bodyMethods.includes(req.method)) req.body = doc;

  return next();
};

export default validator;
