#Project Submission: Movies Website Internship

Live Demo URL: https://movies-website-intership.onrender.com/

GitHub Repository: https://github.com/Chetu14321/movies-website-intership

README Structure (Comprehensive)
1. Project Overview

A full-stack movies website where users can browse movies, add to their watchlist, view movie details, and submit reviews.
Built with Node.js, Express, MongoDB, React, and Material-UI.

2. Features

User authentication (signup/login)

Browse all movies

View movie details

Add/remove movies from watchlist

Submit and view reviews

Admin dashboard for adding/deleting movies and viewing stats

3. Setup & Installation

Clone the repository:

git clone https://github.com/Chetu14321/movies-website-intership.git
cd movies-website-intership


Install dependencies for backend and frontend:

# Backend
cd backend
npm install

# Frontend
cd frontend
npm install


Run locally:

# Backend
cd backend
npm run dev

# Frontend
cd frontend
npm start


The frontend will run on http://localhost:3000 and backend on http://localhost:5400.

4. Database Setup

Database: MongoDB Atlas

Create a database and collections:

users

movies

watchlists

reviews

Example environment variable for MongoDB:

MONGO_URI=<Your MongoDB connection string>

5. Environment Variables

MONGO_URI – MongoDB connection string

JWT_SECRET – Secret key for JWT authentication

PORT – Backend server port (default 5400)

Ensure .env file exists in backend root.

6. API Documentation

Users

POST /api/auth/signup – Signup

POST /api/auth/login – Login

GET /api/auth/verify – Verify logged-in user

GET /api/auth/getall – Get all users (admin)

GET /api/auth/count – Get total users count

Movies

POST /api/movies/add – Add a movie (admin)

GET /api/movies/getall – Get all movies

GET /api/movies/:movieId – Get movie details

DELETE /api/movies/:movieId – Delete a movie (admin)

GET /api/movies/count/total – Total movies count

Watchlist

POST /api/watchlist/add – Add movie to watchlist

GET /api/watchlist – Get user watchlist

DELETE /api/watchlist/remove/:movieId – Remove movie from watchlist

Reviews

POST /api/reviews/movie/:movieId – Submit review

GET /api/reviews/movie/:movieId – Get all reviews for a movie

GET /api/review/user/:userId – Get user reviews

7. Additional Notes / Design Decisions

Frontend built with React + Material-UI

Backend built with Node.js, Express, and MongoDB

Authentication using JWT

Video files hosted on S3

Responsive design for mobile and desktop

Admin dashboard for managing movies and users

8. Deployment

Hosted on Render.com

Live site: https://movies-website-intership.onrender.com

9.admin access
 email: chetuchethan87@gmail.com
 pass:111
 can handle crud operations

