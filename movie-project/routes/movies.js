const router = require('express').Router();

const movieController = require('../controllers/movies');

//Gets all movies database
router.get('/', movieController.allMovies);

//Gets one movie from database
router.get('/:id', movieController.singleMovie);

//Creates a new movie
router.post('/', movieController.createNewMovie);

//Updates movie
router.put('/:id', movieController.updateMovie);

//Delete user
router.delete('/:id', movieController.deleteMovie);


module.exports = router;