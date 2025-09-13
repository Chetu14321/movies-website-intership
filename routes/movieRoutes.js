const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');

router.post('/add', movieController.addMovie);
router.get('/getall', movieController.getAllMovies);
router.get('/count/total', movieController.getMovieCount);
router.get('/:movieId', movieController.getMovieById);
router.delete('/delete/:movieId', movieController.deleteMovie);


module.exports = router;
