const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
// const mongodb = require('./DB/connect');
const mongodb = require('./DB/connect');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const PORT = process.env.PORT || 5000;
const app = express();

app
    .use(bodyParser.json())
    .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
    .use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
    })
    .use(cors())
    .use(cors({
        origin: "https://cse341-movies-project.onrender.com",
        headers: ["Content-Type"],
        credentials: true,
    }))
    .use(express.json())
    .use('/', require('./routes'));

mongodb.initDb ((err, mongodb) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(PORT);
        console.log(`Connected to Database and listening on port ${PORT}`);
    }
});