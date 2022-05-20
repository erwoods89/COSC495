const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const authJwt = require('./helpers/jwt');
const errorHandler = require('./helpers/error-handler');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,POST,DELETE,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(cors());
app.options('*', cors());


require('dotenv/config');
const api = process.env.API_URL;

// Middleware
app.use(express.json());
app.use(morgan('tiny'));
app.use(authJwt());
app.use(errorHandler);

// Routes
const messagesRouters = require('./routes/messages');
const userRoutes = require('./routes/users');


app.use(`${api}/messages`, messagesRouters);
app.use(`${api}/users`, userRoutes);


mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'mindjournal'
})
.then(() => {
    console.log('Connected to database');
})
.catch((err) => {
    console.log(err);
})

app.listen(3000, () => {
    console.log('Server is running http://localhost:3000');
})

