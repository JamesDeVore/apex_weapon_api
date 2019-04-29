const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const mongodb = require('mongodb')
const cors = require('cors')

const app = express()
app.use(express.static(__dirname + "/public"))
app.use(cors());

//body parser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

const db = require('./config/keys').mongoURI

mongoose
  .connect(db, {
    useNewUrlParser: true
  })
  .then(() => console.log("MongodDB connected"))
  .catch(err => console.log(err));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on ${port}!`));

