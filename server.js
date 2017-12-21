// server.js
const express = require('express');
const path = require('path');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
const ObjectID = require('mongodb').ObjectID;
const dburl             = "mongodb://shaun:shaun1234@ds119436.mlab.com:19436/buckets"
var cors = require('cors')


MongoClient.connect(dburl, (err, db) => {
  var app = express();
  app.use(bodyParser.json());
  app.use(cors())
  app.use('/',express.static(path.resolve(__dirname, 'build')));

  // Always return the main index.html, so react-router render the route in the client
  app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
  });
  const PORT = process.env.PORT || 9000;

  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
  });

})
