//express web server
//hope this works

/**/
const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const mongodb = require('./DB/Connection');
//const contactRoutes = require('./routes/index');
const port = process.env.PORT || 3000;
const app = express();

app 
    .use(bodyParser.json())
    .use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', "*");
        next();
    })
    .use('/', require('./routes'));

mongodb.initDb((err, mongodb)=> {
    if (err) {
        console.log(err);
    } else {
        app.listen(port);
        console.log(`Connected to Database and listening on port ${port}`);
    }
});

/*
*Things that I've tried...
const contacts = [
    {id: 1, fistName: "Octavio", lastName:"Carmona"},
    {id: 2, fistName: "Heather", lastName:"Giles"},
    {id: 3, fistName: "Eber", lastName:"Sanchez"}
]

app.get('/api/contacts', (req,res) => {
    res.send([1, 2, 3]);
} );

app.use('/', require('./routes/contacts'));*/

/*--Lesson 1---
const express = require('express');
const connectDB = require('./DB/Connection');
const app = express();

connectDB();
app.use(express.json({extended: false}));
app.use('/api/userModel', require('./Api/User'));
const port = 3000;

app.use('/', require('./routes'));

app.listen(process.env.port || port);
console.log('Web Server is listening at port ' + (process.env.port || port));
*/