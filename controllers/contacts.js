//Connect to MongoDB
const mongodb = require('../DB/Connection');
const ObjectId = require('mongodb').ObjectId;

//To get all the items
const allContacts = async(req, res, next) => {
    //This gets access to the DB
    const result = await mongodb.getDb().collection('contacts').find();
    //Puts DB info as an array
    result.toArray().then((lists)=> {
        res.setHeader('Content-Type', 'application/json');
        //Converts it to JSON(?)
        res.status(200).json(lists);
    });
};

const singleContact = async(req, res, next) => {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb
    .getDb()
    .collection('contacts')
    .find({_id: userId});
    result.toArray().then((lists) => {
        if (!lists[0]) {
        return res.status(404).json({ error: "Contact not found" });
    }
        res.setHeader('Content-Type', 'application/json');
        //Sends single contact
        res.status(200).json(lists[0]);
    });
};

module.exports = {
    allContacts,
    singleContact
}



/* ---What I tried---
const contactRoute = (req, res) => {
    res.send(`${_id}`, _id)
};

module.exports = {
    contactRoute,
}
*/