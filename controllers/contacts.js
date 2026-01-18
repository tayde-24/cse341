//Connect to MongoDB
const mongodb = require('../DB/Connection');
const ObjectId = require('mongodb').ObjectId;

//To get all the items
const allContacts = async(req, res, next) => {
    //This gets access to the DB
    const showResults = await mongodb.getDb().db().collection('contacts').find();
    //Puts DB info as an array
    showResults.toArray().then((lists)=> {
        res.setHeader('Content-Type', 'application/json');
        //Converts it to JSON(?)
        res.status(200).json(lists);
    });
};

const singleContact = async(req, res, next) => {
    const userID = new ObjectId(req.param.id);
    const showResult = await mongodb.getDb().db().collection('contacts').find({_id: userID});
    showResult.toArray().then((lists) => {
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