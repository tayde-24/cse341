const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const mongodb = require('./DB/Connection');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');


const port = process.env.PORT || 3000;
const app = express();

app 
    .use(bodyParser.json())
    .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
    .use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', "*");
        next();
    })
    .use(cors())
    .use(express.json())
    .use('/', require('./routes'));

mongodb.initDb((err, mongodb)=> {
    if (err) {
        console.log(err);
    } else {
        app.listen(port);
        console.log(`Connected to Database and listening on port ${port}`);
    }
});