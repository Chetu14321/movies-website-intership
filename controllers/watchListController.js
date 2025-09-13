const Watchlist = require("../models/Watchlist");

// Get user's watchlist
exports.getWatchlistController = async (req, res) => {
  try {
    const userId = req.userId;
    const items = await Watchlist.find({ user: userId }).populate("movie");
    res.status(200).json({ watchlist: items });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add movie to watchlist
exports.addToWatchlistController = async (req, res) => {
  try {
    const userId = req.userId;
    const { movieId } = req.body;
    if (!movieId) return res.status(400).json({ msg: "movieId is required" });

    const exists = await Watchlist.findOne({ user: userId, movie: movieId });
    if (exists) return res.status(400).json({ msg: "Already in watchlist" });

    const item = await Watchlist.create({ user: userId, movie: movieId });
    res.status(201).json({ msg: "Movie added to watchlist", watchlistItem: item });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Remove movie from watchlist
exports.removeFromWatchlistController = async (req, res) => {
  try {
    const userId = req.userId;
    const { movieId } = req.params;
    if (!movieId) return res.status(400).json({ msg: "movieId is required" });

    const deleted = await Watchlist.findOneAndDelete({ user: userId, movie: movieId });
    if (!deleted) return res.status(404).json({ msg: "Movie not found in watchlist" });

    res.json({ msg: "Movie removed from watchlist" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
