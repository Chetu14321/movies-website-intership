const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "UserModel", required: true },
  movie: { type: mongoose.Schema.Types.ObjectId, ref: "Movie", required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  text: { type: String, trim: true, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.models.Review || mongoose.model("Review", reviewSchema);
