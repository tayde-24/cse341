const express = require('express');
const router = express.Router();
const {ensureAuth, ensureGuest} = require('../middleware/auth')

router.use('/', require('./swagger'));
router.use('/users', require('./users'));
router.use('/movies', require('./movies'));

//@desc Login/Landing page
//@route GET /

router.get('/', (req, res) => {
    res.render('login', {
        layout: 'login',
    });
})

//@desc Dashboard
//@route GET /dashboard
router.get('/dashboard', (req, res) => {
    res.render('dashboard');
})
// router.get('/dashboard', ensureAuth, (req, res) => {
    // console.log(req.user)
//     res.render('dashboard');
// })

router.get('/', ensureGuest, (req, res) => {
    res.render('login', {
        layout: 'login',
    })
})

module.exports = router;