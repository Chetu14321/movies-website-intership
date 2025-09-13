const Review = require("../models/Review");
const { StatusCodes } = require("http-status-codes");

// Add review for a movie
exports.addReviewController = async (req, res) => {
  try {
    const { text, rating } = req.body;
    const movieId = req.params.movieId;

    if (!text || !rating)
      return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Text and rating are required" });

    const review = await Review.create({
      user: req.userId,
      movie: movieId,
      text,
      rating,
    });

    // Populate user name for frontend
    const populatedReview = await Review.findById(review._id).populate("user", "name");

    res.status(StatusCodes.CREATED).json({ msg: "Review added", review: populatedReview });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
  }
};

// Get all reviews for a movie
exports.getMovieReviewsController = async (req, res) => {
  try {
    const { movieId } = req.params;
    const reviews = await Review.find({ movie: movieId }).populate("user", "name");

    res.json(reviews);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
  }
};
