const router = require('express').Router();
const validationU = require('../middleware/validateU');

const userController = require('../controllers/users');

//Gets all users database
router.get('/', userController.allUsers);

//Gets one user from database
router.get('/:id', userController.singleUser);

//Creates a new user
router.post('/', validationU.validateUser, userController.createNewUser);

//Updates user
router.put('/:id', validationU.validateUser, userController.updateUser);

//Delete user
router.delete('/:id', userController.deleteUser);


module.exports = router;