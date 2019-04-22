const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  custId: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true
  },
  bookId: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true
  },
  sum: {
    type: Number,
    required: true
  },
  initDate: {
    type: Date,
    default: Date.now(),
    required: true
  }
});

module.exports = mongoose.model("Order", orderSchema);
