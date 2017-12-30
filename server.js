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

  //API routes
  app.get('/api/jerseys/',(req,res)=>{
    var obj=[];
    db.collection('jerseys').find({}, (err, result) => {
      if (err) {
        res.send({ 'error': 'An error has occurred' });
      } else {

        result.each(function(err, docs){
            console.log("item", docs);

            if (docs == null){
                res.send(obj);
            }
            obj.push(docs);

        });

      }
    });
  })
  app.post('/api/check_stock/',(req,res)=>{
    // {
    //   "team": "Cleveland Cavaliers",
    //   "player": "594a3311734d1d4955bd0daf",
    //   "colorway": "Red Away",
    //   "size": "s"
    // }
    var query = req.body
    console.log(req.body);
    var obj=[]

    db.collection('jerseys').find({$and:[{"team": query.team,"player": query.player,"colorway": query.colorway, "size": query.size}]}, (err, result) => {
      if (err) {
        res.send({ 'error': 'An error has occurred' });
      } else {

        result.each(function(err, docs){
            console.log("item", docs);

            if (docs == null){
                res.send(obj);
            }
            obj.push(docs);

        });

      }
    });
  })

  app.post('/api/update_stock',(req,res)=>{
    // {
    //   "team": "Cleveland Cavaliers",
    //   "player": "594a3311734d1d4955bd0daf",
    //   "colorway": "Red Away",
    //   "size": "s",
    //   "quantity": 2
    // }
    var query= req.body

    db.collection('jerseys').update({$and:[{"team": query.team,"player": query.player,"colorway": query.colorway, "size": query.size}]},{$set:{quantity: query.quantity}}, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send(item);

      }
    });
  })



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
//db.jerseys.find({$and:[{team: "Cleveland Cavaliers",player:"LeBron James",colorway: "Red Away"}]})
