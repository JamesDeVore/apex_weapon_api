const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const mongodb = require('mongodb')
const cors = require('cors')
const gunRoutes = ('./gunRouter')
const http = require('http')
require("dotenv").config();

const app = express()
app.use(express.static(__dirname + "/public"))
app.use(cors());

//body parser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

const versionMiddleware= (req,res,next) => {
  let responseObj = {
    version:"1.0.0",
    data:null
  }
  res.response = responseObj
  next()
}
app.use("*",versionMiddleware)
const db = process.env.MONGODB_URI

//initial router
app.use('/v1/guns', require('./gunRouter'));


mongoose
  .connect(db, {
    useNewUrlParser: true
  })
  .then(() => console.log("MongodDB connected"))
  .catch(err => console.log(err));

const port = process.env.PORT || 5000;
const server = http.createServer(app);

server.listen(port, () => console.log(`Server running on ${port}!`));

