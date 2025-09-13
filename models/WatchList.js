const mongoose = require("mongoose");

const watchlistSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "UserModel", required: true },
  movie: { type: mongoose.Schema.Types.ObjectId, ref: "Movie", required: true },
  addedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.models.Watchlist || mongoose.model("Watchlist", watchlistSchema);
