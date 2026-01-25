//Connect to MongoDB
const { default: mongoose } = require('mongoose');
const mongodb = require('../DB/Connection');
const ObjectId = require('mongodb').ObjectId;

// const postContact = mongoose.Schema({
//         firstName: {
//             type: String,
//             required: true
//         },
// 		lastName: {
//             type: String,
//             required: true
//         },
// 		email: {
//             type: String,
//             required: true
//         },
// 		favoriteColor: {
//             type: String,
//             required: true
//         },
// 		birthday: {
//             type: String,
//             required: true
//         }
// });

//To get all the items
const allContacts = async(req, res, next) => {
    //This gets access to the DB
    const result = await mongodb.getDb().collection('contacts').find();
    //Puts DB info as an array
    result.toArray().then((lists)=> {
        res.setHeader('Content-Type', 'application/json');
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

const createNewContact = async(req, res, next) => {
    const newPostContact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };

    const result = await mongodb.getDb().collection('contacts').insertOne(newPostContact);
    if (result.acknowledged) {
        res.status(201).json(result);
        console.log('It worked!!!!');
    } else {
        res.status(500).json(result.err || 'Some error occured while making the contact');
    }
    // const {firstName, lastName, email, favoriteColor, birthday} = req.body;
    // let newPostContact = {}; 
    // newPostContact.firstName = firstName;
    // newPostContact.lastName = lastName;
    // newPostContact.email = email;
    // newPostContact.favoriteColor = favoriteColor;
    // newPostContact.birthday = birthday;

    // newPostContact.save(postContact)
    // .then(data => {
    //     res.json(data);
    // })
    // .catch(err => {
    //     res.json({message: err});
    // })
};

const updateContact = async(req, res, next) => {
    const userId = new ObjectId(req.params.id);
    const updateContact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    const result = await mongodb.getDb().collection('contacts').replaceOne({_id: userId}, updateContact);
    console.log(result);
    if (result.modifiedCount > 0) {
        res.status(204).send(); 
    } else {
        res.status(500).json(result.error || 'Some error occurred while updating the contact');
    }
};

const deleteContact = async(req, res, next) => {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().collection('contacts').deleteOne({_id: userId});  
        // if(err) throw err
    console.log(result);
        if (result.deletedCount > 0) {
            res.status(200).send();
        } else {
            res.status(500).json(result.error || 'Some error occured while deleting the contact.');
        }
    // const result = await mongodb.getDb().collection('contacts').find({_id: '697570d410b772f04cbefb22'});
    
    // if(!result) {
    //     return res.status(404).json({
    //         status: "fail",
    //         message: "No movie object with id is found"
    //     });
    // }
    // const index = result.indexOf(result);
    
    // result.splice(index, 1);

        // if(err) throw err
    // console.log(result);
    //     if (result.deletedCount > 0) {
    //         res.status(204).send();
    //     } else {
    //         res.status(500).json(result.error || 'Some error occured while deleting the contact.');
    //     }
        // response.send("contact has been deleted");
    // const userId = new ObjectId(req.params.id);
    // const result = await mongodb
    // .getDb()
    // .collection('contacts')
    // .find({_id: userId});
    // result.toArray().then((lists) => {
    //     if (!lists[0]) {
    //     return res.status(404).json({ error: "Contact not found" });
    // }
    //     res.setHeader('Content-Type', 'application/json');
    //     //Sends single contact
    //     res.status(200).json(lists[0]);
    // });
    // user = user.filter(i => {
    //     if (i.userId !== userId) {
    //         return true;
    //     }
    //     return false;
    // });
};





module.exports = {
    allContacts,
    singleContact, 
    createNewContact,
    updateContact,
    deleteContact
}



/* ---What I tried---
const contactRoute = (req, res) => {
    res.send(`${_id}`, _id)
};

module.exports = {
    contactRoute,
}
*/