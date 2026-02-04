const router = require('express').Router();

const userController = require('../controllers/users');

//Gets all users database
router.get('/', userController.allUsers);

//Gets one user from database
router.get('/:id', userController.singleUser);

//Creates a new user
router.post('/', userController.createNewUser);

//Updates user
router.put('/:id', userController.updateUser);

//Delete user
router.delete('/:id', userController.deleteUser);


module.exports = router;