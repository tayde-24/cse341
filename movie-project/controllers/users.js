//Connect to MongoDB
const { default: mongoose } = require('mongoose');
const mongodb = require('../DB/connect');
const ObjectId = require('mongodb').ObjectId;

//To get all the items
const allUsers = async(req, res, next) => {
    //This gets access to the DB
    const result = await mongodb.getDb().collection('users').find();
    //Puts DB info as an array
    result.toArray().then((lists)=> {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    });
};

const singleUser = async(req, res, next) => {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb
    .getDb()
    .collection('users')
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

const createNewUser = async(req, res, next) => {
    const newPostUser = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        birthday: req.body.birthday,
        email: req.body.email,
        password: req.body.password
    };

    const result = await mongodb.getDb().collection('users').insertOne(newPostUser);
    if (result.acknowledged) {
        res.status(201).json(result);
        console.log('It worked!!!!');
    } else {
        res.status(500).json(result.err || 'Some error occured while making the contact');
    }
};

const updateUser = async(req, res, next) => {
    const userId = new ObjectId(req.params.id);
    const updateUser = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        birthday: req.body.birthday,
        email: req.body.email,
        password: req.body.password
    };
    const result = await mongodb.getDb().collection('users').replaceOne({_id: userId}, updateUser);
    console.log(result);
    if (result.modifiedCount > 0) {
        res.status(204).send(); 
    } else {
        res.status(500).json(result.error || 'Some error occurred while updating the contact');
    }
};

const deleteUser = async(req, res, next) => {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().collection('users').deleteOne({_id: userId});  
        // if(err) throw err
    console.log(result);
        if (result.deletedCount > 0) {
            res.status(200).send();
        } else {
            res.status(500).json(result.error || 'Some error occured while deleting the contact.');
        }
};





module.exports = {
    allUsers,
    singleUser, 
    createNewUser,
    updateUser,
    deleteUser
}
