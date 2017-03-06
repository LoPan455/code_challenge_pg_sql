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

/*** Build out a module to manage our treats requests. ***/

app.get('/treats',function(req,res){
  console.log('app.get to /treats reached');
  res.sendStatus(200);
}) // app.get to /getTreats

app.post('/treats',function(req,res){
  console.log('app.post to /treats reached');
  res.sendStatus(200);
})


// Get static files
app.use(express.static('./server/public'));

// Get index.html
app.get('/', function(req, res) {
  res.sendFile(path.resolve('./server/public/views/index.html'));
});


app.listen(port, function() {
  console.log('Server running on port: ', port);
});
