const router = require('express').Router();
const validationM = require('../middleware/validateM');

const movieController = require('../controllers/movies');

//Gets all movies database
router.get('/', movieController.allMovies);

//Gets one movie from database
router.get('/:id', movieController.singleMovie);

//Creates a new movie
router.post('/', validationM.validateMovie, movieController.createNewMovie);

//Updates movie
router.put('/:id', validationM.validateMovie, movieController.updateMovie);

//Delete user
router.delete('/:id', movieController.deleteMovie);


module.exports = router;