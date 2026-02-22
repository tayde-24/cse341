const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const path = require('path');
const passport = require('passport');

const mongodb = require('./DB/connect');
//importing errors
const createError = require('http-errors');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const exphbs = require('express-handlebars');
const session = require('express-session');

require('./DB/passport')(passport);

const PORT = process.env.PORT || 5000;
const app = express();

app.engine('.hbs', exphbs.engine({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', '.hbs');

//Session Middleware
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
}));

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());


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
    .use('/', require('./routes'))
    .use('/auth', require('./routes/auth'));

app.use(express.static(path.join(__dirname, 'public')))

app.use((req, res, next) => {
    next(createError(404, 'Not Found'))
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        error: {
            status: err.status || 500,
            message: err.message
        }
    });
});

process.on('uncaughtException', (err, origin) => {
    console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
})

mongodb.initDb ((err, mongodb) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(PORT);
        console.log(`Connected to Database and listening on port ${PORT}`);
    }
});