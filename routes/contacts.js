const express = require('express');
const router = express.Router();
// const contacts = require('express').Router();
const lesson2Controller = require('../controllers/contacts.js');

//To get all contacts
router.get('/', lesson2Controller.allContacts);
// contacts.get('/', lesson2Controller.allContacts);

//To get single contact
router.get('/:id', lesson2Controller.singleContact);
module.exports = router; 

/*------Week 3-----*/
router.post('/', lesson2Controller.createNewContact);

router.put('/:id', lesson2Controller.updateContact);

router.delete('/:id', lesson2Controller.deleteContact);