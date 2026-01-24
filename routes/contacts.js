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
// contacts.get('/:id', lesson2Controller.singleContact);

// routes.get('/', lesson2Controller.octavioCarmona);
// routes.get('/', lesson2Controller.heatherGiles);
// routes.get('/', lesson2Controller.eberSanchez);

/*---What I tried---

//All contacts
contacts.get('/', (req, res) => {
     --What I tried---
    res.send(lesson2Controller);   
});

//All contacts
contacts.get('/:_id', (req, res) => {
    const contact = lesson2Controller.find(c => c.lesson2Controller.contactRoute === parseInt(req.params.lesson2Controller.contactRoute));
    if(!contact) res.status(404).send('The contact with the given ID was not found');
    res.send(contact);
});
*/

// module.exports = contacts;