// src/pages/MovieCard.jsx
import React from 'react';
import { Card, CardMedia, CardContent, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  return (
    <Link to={`/movies/${movie._id}`} style={{ textDecoration: 'none' }}>
      <Card sx={{ backgroundColor: '#1c1c1c', color: '#fc1717ff', borderRadius: 2 }}>
        <CardMedia
          component="img"
          height="200"
          image={movie.thumbnailUrl || '/fallback.jpg'}
          alt={movie.title}
        />
        <CardContent>
          <Typography variant="h6">{movie.title}</Typography>
          <Typography variant="body2" color="gray">
            {movie.genre}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
};

export default MovieCard;
