//Connect to MongoDB
const { default: mongoose } = require('mongoose');
const mongodb = require('../DB/connect');
const ObjectId = require('mongodb').ObjectId;

//To get all the items
const allMovies = async(req, res, next) => {
    //This gets access to the DB
    const result = await mongodb.getDb().collection('movies').find();
    //Puts DB info as an array
    result.toArray((err, lists) => {
        if (err) {
            res.status(400).json({message:err});
        }
    })
    .then((lists)=> {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    });
};

const singleMovie = async(req, res, next) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json({error: "Must be a valid movie id to find a movie."});
    }
    const movieId = new ObjectId(req.params.id);
    try {
        const result = await mongodb
            .getDb()
            .collection('movies')
            .find({_id: movieId});
        result.toArray((err, lists) => {
            if (err) {
                res.status(400).json({message:err});
            }
        })
        .then((lists) => {
            if (!lists[0]) {
            return res.status(404).json({ error: "Movie not found" });
        }
            res.setHeader('Content-Type', 'application/json');
            //Sends single contact
            res.status(200).json(lists[0]);
        });
    } catch (error) {
        console.log(error.message);
        next(error);
    }
};

const createNewMovie = async(req, res, next) => {
    const newPostMovie = {
        title: req.body.title,
        releaseYear : req.body.releaseYear,
        rating : req.body.rating,
        length : req.body.length,
        originalLanguage : req.body.originalLanguage,
        description : req.body.description,
        usersMovieReview: req.body.usersMovieReview
    };

    const result = await mongodb.getDb().collection('movies').insertOne(newPostMovie);
    if (result.acknowledged) {
        res.status(201).json(result);
        console.log('It worked!!!!');
    } else {
        res.status(500).json(result.err || 'Some error occured while making the movie');
    }
};

const updateMovie = async(req, res, next) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json({error: "Must be a valid movie id to find a movie."})
    }

    const movieId = new ObjectId(req.params.id);
    const updateMovie = {
        title: req.body.title,
        releaseYear : req.body.releaseYear,
        rating : req.body.rating,
        length : req.body.length,
        originalLanguage : req.body.originalLanguage,
        description : req.body.description,
        usersMovieReview: req.body.usersMovieReview
    };
    const result = await mongodb.getDb().collection('movies').replaceOne({_id: movieId}, updateMovie);
    console.log(result);
    if (result.modifiedCount > 0) {
        res.status(204).send(); 
    } else {
        res.status(500).json(result.error || 'Some error occurred while updating the movie');
    }
};

const deleteMovie = async(req, res, next) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json({error: "Must be a valid movie id to find a movie."})
    }

    const movieId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().collection('movies').deleteOne({_id: movieId});  
        // if(err) throw err
    console.log(result);
        if (result.deletedCount > 0) {
            res.status(200).send();
        } else {
            res.status(500).json(result.error || 'Some error occured while deleting the movie.');
        }
};

module.exports = {
    allMovies,
    singleMovie,
    createNewMovie,
    updateMovie,
    deleteMovie
}