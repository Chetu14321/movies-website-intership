import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Box,
  Typography,
  CircularProgress,
  Button,
  Grid,
  TextField,
  Rating,
  Stack,
  Divider,
} from "@mui/material";
import VideoPlayer from "./videoPlayes";
import axios from "axios";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  // Watchlist state
  const [inWatchlist, setInWatchlist] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchMovie = async () => {
      try {
        const res = await axios.get(`/api/movies/${id}`);
        setMovie(res.data);

        const reviewRes = await axios.get(`/api/reviews/movie/${id}`);
        setReviews(Array.isArray(reviewRes.data) ? reviewRes.data : []);

        // Check if movie is already in watchlist
        const watchlistRes = await axios.get("/api/watchlist", { withCredentials: true });
        const exists = watchlistRes.data.watchlist.some(item => item.movie._id === id);
        setInWatchlist(exists);
      } catch (err) {
        console.error("Failed to fetch movie or reviews:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  const handleSubmitReview = async () => {
    if (!reviewText || !reviewRating) return;

    setSubmitting(true);
    try {
      const res = await axios.post(
        `/api/reviews/movie/${id}`,
        { text: reviewText, rating: reviewRating },
        { withCredentials: true }
      );

      setReviews((prev) => [...prev, res.data.review]);
      setReviewText("");
      setReviewRating(0);
    } catch (err) {
      console.error("Failed to submit review:", err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleAddToWatchlist = async () => {
    try {
      await axios.post(
        "/api/watchlist/add",
        { movieId: movie._id },
        { withCredentials: true }
      );
      setInWatchlist(true);
    } catch (err) {
      console.error("Failed to add to watchlist:", err);
    }
  };

  // Calculate average rating
  const avgRating =
    reviews.length > 0
      ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
      : 0;

  if (loading)
    return (
      <Box sx={{ textAlign: "center", mt: 10 }}>
        <CircularProgress color="secondary" />
      </Box>
    );

  if (!movie) return <Typography>Movie not found.</Typography>;

  return (
    <Box sx={{ backgroundColor: "#111", color: "#fff", minHeight: "100vh", p: 4, mt: 7 }}>
      <Link to="/">
        <Button variant="outlined" sx={{ mb: 3, color: "#fff", borderColor: "#fff" }}>
          ← Back
        </Button>
      </Link>

      <Grid container spacing={4}>
        {/* Movie Info */}
        <Grid item xs={12} md={6}>
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            {movie.title}
          </Typography>

          <img
            src={movie.thumbnailUrl}
            alt={movie.title}
            style={{ width: "100%", maxWidth: "400px", borderRadius: "12px", marginBottom: "1rem" }}
          />

          <Typography variant="h6" gutterBottom>
            Genre: {movie.genre}
          </Typography>
          <Typography variant="body1" mt={2} sx={{ color: "#ccc" }}>
            {movie.description}
          </Typography>

          {movie.videoUrl ? (
            <Box sx={{ mt: 3 }}>
              <VideoPlayer src={movie.videoUrl} />
            </Box>
          ) : (
            <Typography sx={{ mt: 2 }}>No video available.</Typography>
          )}

          <Button
            variant="contained"
            color="secondary"
            onClick={handleAddToWatchlist}
            disabled={inWatchlist}
            sx={{ mt: 3 }}
          >
            {inWatchlist ? "Added to Watchlist" : "Add to Watchlist"}
          </Button>
        </Grid>

        {/* Reviews Section */}
        <Grid item xs={12} md={6}>
          <Typography variant="h5" gutterBottom>
            Reviews ({reviews.length}) - Average: {avgRating} ⭐
          </Typography>

          {/* Add Review Form */}
          <Box sx={{ mb: 4, p: 3, backgroundColor: "#1e1e1e", borderRadius: 3 }}>
            <Typography variant="subtitle1" gutterBottom sx={{ color: "#ffd700" }}>
              Add a Review
            </Typography>
            <Rating
              name="rating"
              value={reviewRating}
              onChange={(e, newValue) => setReviewRating(newValue)}
              sx={{ color: "#ffd700" }}
            />
            <TextField
              fullWidth
              multiline
              minRows={3}
              placeholder="Write your review..."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              sx={{
                mt: 2,
                backgroundColor: "#111",
                borderRadius: 1,
                input: { color: "#fff" },
              }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmitReview}
              disabled={submitting || !reviewText || !reviewRating}
              sx={{ mt: 2, backgroundColor: "#ff6b6b", "&:hover": { backgroundColor: "#ff4c4c" } }}
            >
              {submitting ? "Submitting..." : "Submit Review"}
            </Button>
          </Box>

          {/* Existing Reviews */}
          <Stack spacing={2}>
            {reviews.length > 0 ? (
              reviews.map((r) => (
                <Box
                  key={r._id}
                  sx={{
                    p: 2,
                    backgroundColor: "#222",
                    borderRadius: 3,
                    borderLeft: "4px solid #ffd700",
                  }}
                >
                  <Typography variant="subtitle2" sx={{ color: "#ffd700", fontWeight: "bold" }}>
                    {r.user?.name || "Anonymous"} - {r.rating} ⭐
                  </Typography>
                  <Divider sx={{ borderColor: "#444", my: 1 }} />
                  <Typography sx={{ color: "#ccc" }}>{r.text}</Typography>
                </Box>
              ))
            ) : (
              <Typography sx={{ color: "#ccc" }}>No reviews yet.</Typography>
            )}
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MovieDetails;
