const Movie = require('../models/Movie');

// Add a new movie (videoUrl is direct S3 link)
const addMovie = async (req, res) => {
  const {
    title,
    description,
    genre,
    releaseYear,
    director,
    cast,
    synopsis,
    posterUrl,
    videoUrl,
    thumbnailUrl,
    duration,
    averageRating
  } = req.body;

  if (!videoUrl) {
    return res.status(400).json({ error: 'Video URL is required' });
  }

  try {
    const newMovie = new Movie({
      title,
      genre,
      releaseYear,
      director,
      cast,
      synopsis,
      posterUrl,
      videoUrl,      // direct S3 video URL
      thumbnailUrl,
      duration,
      averageRating: averageRating || 0
    });

    await newMovie.save();
    res.status(201).json(newMovie);
  } catch (err) {
    console.error('Error adding movie:', err);
    res.status(500).json({ error: 'Something went wrong while adding the movie.' });
  }
};

// Get all movies
const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).json(movies);
  } catch (err) {
    console.error('Error fetching movies:', err);
    res.status(500).json({ error: 'Something went wrong while fetching movies.' });
  }
};

// Get movie by ID
const getMovieById = async (req, res) => {
  const { movieId } = req.params;

  try {
    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }
    res.status(200).json(movie);
  } catch (err) {
    console.error('Error fetching movie:', err);
    res.status(500).json({ error: 'Something went wrong while fetching the movie.' });
  }
};

// Delete movie by ID
// Delete movie by ID
const deleteMovie = async (req, res) => {
  const { movieId } = req.params;

  try {
    // Use findByIdAndDelete instead of movie.remove()
    const movie = await Movie.findByIdAndDelete(movieId);

    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }

    res.status(200).json({ message: 'Movie deleted successfully' });
  } catch (err) {
    console.error('Error deleting movie:', err);
    res.status(500).json({ error: 'Something went wrong while deleting the movie.' });
  }
};


// Get total number of movies
const getMovieCount = async (req, res) => {
  try {
    const count = await Movie.countDocuments();
    res.status(200).json({ totalMovies: count });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  addMovie,
  getAllMovies,
  getMovieById,
  deleteMovie,
  getMovieCount,
};
