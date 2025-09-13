const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const {getWatchlistController,addToWatchlistController,removeFromWatchlistController} = require("../controllers/watchListController");

// all routes require auth
router.get("/", protect, getWatchlistController);
router.post("/add", protect, addToWatchlistController);
router.delete("/remove/:movieId", protect, removeFromWatchlistController);

module.exports = router;
