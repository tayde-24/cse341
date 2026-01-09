const routes = require('express').Router();
const lesson1Controller = require('../controllers/lesson1');

routes.get('/', lesson1Controller.andresRoute);
routes.get('/andy', lesson1Controller.andyRoute);
routes.get('/amicia', lesson1Controller.amiciaRoute);

module.exports = routes;