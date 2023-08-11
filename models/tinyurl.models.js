const mongoose = require("mongoose"), Schema = mongoose.Schema;

const TinyUrlSchema = new Schema({
  shortKey: {
    type: String,
    index: true,
    required: true,
  },
  longUrl: {
    type: String,
    required: true,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
  created: {
    type: Date,
    default: new Date,
  },
  lastUpdated: {
    type: Date,
    default: new Date,
  },
});
mongoose.model('Tinyurl', TinyUrlSchema);