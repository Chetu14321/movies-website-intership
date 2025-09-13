const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    genre: { type: String, required: true },
    releaseYear: { type: Number },             // New field: release year
    director: { type: String },                // New field: director
    cast: [{ type: String }],                  // New field: cast as array of strings
    synopsis: { type: String },                // New field: synopsis
    posterUrl: { type: String },               // New field: poster image URL
    videoUrl: { type: String, required: true },// S3 or video URL
    thumbnailUrl: { type: String },            // Thumbnail URL
    duration: { type: Number },                // Duration in minutes
    averageRating: { type: Number, default: 0 } // Average rating
  },
  { timestamps: true }
);

module.exports = mongoose.model('Movie', movieSchema);
