const express = require('express');
// const passport = require('../DB/passport');
const passport = require('passport');
const router = express.Router();

router.use('/', require('./swagger'));
router.use('/users', require('./users'));
router.use('/movies', require('./movies'));

//@desc Auth with Google
//@route GET /auth/google

router.get('/google', passport.authenticate('google', {scope: ['profile']}))

//@desc Google auth callback
//@route GET /auth/google/callback
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/'}), 
(req, res) => {
    res.redirect('/dashboard')
}
)

module.exports = router;