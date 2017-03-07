var express = require('express');
var app = express();
var fs = require("fs");
var bodyParser = require('body-parser');
app.use(bodyParser.json());         
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req,res)=>{
  if (req.url === '/favicon.ico')
    return res.end()
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    req.next();
  });
  


app.get('/api/books/entries', function (req, res) {
   fs.readFile( __dirname + "/" + "books.json", 'utf8', function (err, data) {
       console.log( data );
       res.end( data );
   });
})

app.get('/api/transactions/entries', function (req, res) {
   fs.readFile( __dirname + "/" + "transactions.json", 'utf8', function (err, data) {
       console.log( data );
       res.end( data );
   });
})

app.post('/api/books/entries', function (req, res) {
   // First read existing books.
   //fs.readFile( __dirname + "/" + "books.json", 'utf8', function (err, data) {
       //data = JSON.parse( data );       
       //data.push(req.body);
       //console.log(req.body);
       //console.log( data );  
       var data2 = JSON.stringify(req.body);
       fs.writeFile( __dirname +"/" +"books.json", data2, 'utf8', function(err){
     if (err) return console.log(err);
     console.log('Write success');
   });
       res.end( JSON.stringify(data2));
   //});
   
})

app.post('/api/transactions/entries', function (req, res) {
   // First read existing transactions.
   //fs.readFile( __dirname + "/" + "transactions.json", 'utf8', function (err, data) {
       //data = JSON.parse( data );
       //data.push(req.body);
       //console.log(req);
       //console.log( data );
       //var data2 = JSON.stringify(data);
       data = JSON.stringify(req.body);
       console.log(data);
       fs.writeFile( __dirname +"/" +"transactions.json", data, 'utf8', function(err){
    if (err) return console.log(err);
     console.log('Write success');
   
       });
       res.end( JSON.stringify(data));
   //});
})

app.get('/api/books/entries/:id', function (req, res) {
   // First read existing books.
   fs.readFile( __dirname + "/" + "books.json", 'utf8', function (err, data) {
       books = JSON.parse( data );
       var book = books[req.params.id] 
       console.log( book );
       res.end( JSON.stringify(book));
   });
})

app.get('/api/transactions/entries/:id', function (req, res) {
   // First read existing transactions.
   fs.readFile( __dirname + "/" + "transactions.json", 'utf8', function (err, data) {
       books = JSON.parse( data );
       var book = books[req.params.id] 
       console.log( book );
       res.end( JSON.stringify(book));
   });
})

app.delete('/api/books/entries/:id', function (req, res) {

   // First read existing books.
   fs.readFile( __dirname + "/" + "books.json", 'utf8', function (err, data) {
       data = JSON.parse( data );
       delete data[bookId];
       
       console.log( data );
       res.end( JSON.stringify(data));
   });
})

app.delete('/api/transactions/entries/:id', function (req, res) {

   // First read existing books.
   fs.readFile( __dirname + "/" + "transactions.json", 'utf8', function (err, data) {
       data = JSON.parse( data );
       delete data[bookId];
       
       console.log( data );
       res.end( JSON.stringify(data));
   });
})


var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("App listening at http://%s:%s", host, port)

})
