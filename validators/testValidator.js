import mongoose from "mongoose";

const routeModels = {
  "/test-api": new mongoose.model(
    "test-api-validator",
    new mongoose.Schema(
      {

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
