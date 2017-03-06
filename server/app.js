var express = require('express');
var app = express();
var path = require('path');
var port = process.env.PORT || 3000;
var pg = require('pg');
var config = {
  database: 'phi', // the name of the database
  host: 'localhost', // where is your database
  port: 5432, // the port number for your database
  max: 10, // how many connections at one time
  idleTimeoutMillis: 30000 // 30 seconds to try to connect
};
var pool = new pg.Pool(config);
var bodyParser = require ('body-parser');

// use body-parser
app.use(bodyParser.urlencoded({extended: true}));


/*** Build out a module to manage our treats requests. ***/

app.get('/treats',function(req,res){
  console.log('app.get to /treats reached');
  pool.connect(function(errorConnectingToDatabase, client, done){
    if(errorConnectingToDatabase) {
      console.log('Error connecting to database: ', errorConnectingToDatabase);
      res.sendStatus(500);
    } else {
      client.query('SELECT * FROM treats;', function(errorMakingQuery, result){
        done();
        if(errorMakingQuery) {
          console.log('Error making the database query: ', errorMakingQuery);
          res.sendStatus(500);
        } else {
          res.send(result.rows);
        }
      });
    }
  });
});
// end app.get to /getTreats

app.post('/treats',function(req,res){
  console.log('app.post to /treats reached');
  var newTreat = req.body;
  console.log('newTreat is: ',newTreat);

  pool.connect(function(errorConnectingToDatabase, client, done){
    if(errorConnectingToDatabase) {
      // There was an error connecting to the database
      console.log('Error connecting to database: ', errorConnectingToDatabase);
      res.sendStatus(500);
    } else {
      // We connected to the database!!!
      // Now, we're gonna' git stuff!!!!!
      client.query('INSERT INTO treats (name,description,pic) VALUES ($1,$2,$3);',
      [newTreat.name,newTreat.description,newTreat.url],
      function(errorMakingQuery, result){
        done();
        if(errorMakingQuery) {
          console.log('Error making the database query: ', errorMakingQuery);
          res.sendStatus(500);
        } else {
          res.send(result.rows);
        }
      });
    }
  });

});

// Get static files
app.use(express.static('./server/public'));

// Get index.html
app.get('/', function(req, res) {
  res.sendFile(path.resolve('./server/public/views/index.html'));
});


app.listen(port, function() {
  console.log('Server running on port: ', port);
});
