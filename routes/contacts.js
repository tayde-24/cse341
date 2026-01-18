const contacts = require('express').Router();
const lesson2Controller = require('../controllers/contacts');

//To get all contacts
contacts.get('/', lesson2Controller.allContacts);

//To get single contact
contacts.get('/:id', lesson2Controller.singleContact);

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
module.exports = contacts;