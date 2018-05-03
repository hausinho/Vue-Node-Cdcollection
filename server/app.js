const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

app.use(cors());

// app.use(cors({
//   origin: 'http://localhost:3000/',
//   credentials: true
// }));

const albumRoutes = require('./routes/albums');

mongoose.connect('mongodb://st-th:'+ process.env.MONGO_PW +'@motuapi-shard-00-00-raba2.mongodb.net:27017,motuapi-shard-00-01-raba2.mongodb.net:27017,motuapi-shard-00-02-raba2.mongodb.net:27017/test?ssl=true&replicaSet=MotuAPI-shard-0&authSource=admin'
);


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/albums', albumRoutes);



app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
      return res.status(200).json({});
  }
});

app.use((error, req, res, next) => {
  res.status(error.status || 500 );
  res.json({
    error: {
      message: error.message
    }
  });
});

app.use((eq, res, next) => {
  res.status(200).json({
    message: 'It works!'
  });
});

module.exports = app;