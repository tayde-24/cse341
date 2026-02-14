const validator = require('../helpers/validate');

const validateMovie = (req, res, next) => {
    const validContactRule = {
        title: "required|string",
        releaseYear : "required|digits:4",
        rating : "required|string",
        length : "required|string",
        originalLanguage : "required|string",
        description : "string",
        usersMovieReview: "string"
    };
    validator(req.body, validContactRule, {}, (err, status) => {
        if(!status) {
            res.status(412).send({
                success: false,
                message: 'Validation failed',
                data: err
            });
        } else {
            next();
        }
    });
};

module.exports = {
    validateMovie
}