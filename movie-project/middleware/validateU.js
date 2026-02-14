const validator = require('../helpers/validate');

const validateUser = (req, res, next) => {
    const validContactRule = {
        firstName: 'required|string',
        lastName: 'required|string',
        birthday: 'string',
        email: 'required|email',
        password: 'required|string',
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
    validateUser
}