const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const { addReviewController, getMovieReviewsController } = require("../controllers/reviewController");

// Add review for a movie (auth required)
router.post("/movie/:movieId", protect, addReviewController);

// Get reviews for a movie
router.get("/movie/:movieId", getMovieReviewsController);

module.exports = router;
