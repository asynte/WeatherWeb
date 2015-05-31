var mysql = require('mysql');
var express = require('express');
var app = express();
var http = require('http');
var request = require('request');

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

var cookieParser = require('cookie-parser');
var session = require('express-session');
app.use(cookieParser('secret'));
app.use(session({ secret: 'secret'}));

app.use('/statics', express.static(__dirname + '/statics'));
app.use(express.static(__dirname + '/frontend'));

var client = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password : '',
  socketPath : '/Applications/XAMPP/xamppfiles/var/mysql/mysql.sock',
  port : 3306
});

client.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
console.log('connected as id ' + client.threadId);
});
client.query('USE aprs');

app.get('/', function(req,res){
  console.log(req.url);
  res.sendFile(__dirname+req.url);
});


app.post('/Register',function(req, res){
  console.log(req.url);
  console.log('e-mail= '+req.body.email);
  console.log('password= '+req.body.pw);
  console.log('confirm pw = '+req.body.repw);

  if(req.body.email.length===0) {
    return res.json(
    {
      code: 1,
      message: "Empty e-mail"
    });
  }
  if(req.body.pw.length<6) {
    return res.json({
      code: 2,
      message: "Password too short"
    });
  }
  if(req.body.pw != req.body.repw)
  {
    return res.json({
      code: 3,
      message: "Password confirm error"
    });
  }
  client.query('SELECT * FROM user WHERE email=?',[req.body.email],
               function(err, row, fields){
               if(err) { throw err; }
               if(row[0]) {
                 console.log(row);
                 return res.json({
                   code: 4,
                   message: "Registered e-mail"
                 });
               }
               else {
                 client.query('INSERT INTO user(email, password)'+
                              'VALUES(?,?)',
                              [req.body.email, req.body.pw]);
                 return res.json({
                   code: 0,
                   message: "Register success"
                 });
               }
               });
});

app.post('/Login',function(req, res){
  console.log(req.url);
  console.log('e-mail= '+req.body.email);
  console.log('password= '+req.body.pw);

  if(req.body.email.length===0) {
    return res.json(
    {
      code: 1,
      message: "Empty e-mail"
    });
  }
  client.query('SELECT * FROM user WHERE email=?',[req.body.email],
               function(err, row, fields){
               if(err) { throw err; }
               if(row[0]) {
                 console.log(row);
                 if(row[0].password != req.body.pw)
                 return res.json({
                   code: 5,
                   message: "Wrong password"
                 });
                 else {
                   req.session.email=req.body.email;
                   console.log(req.session.email);
                   return res.json({
                     code: 0,
                     message: "Login success"
                   });
                 }
               }
               else {
                 return res.json({
                   code: 6,
                   message: "Email does not exist"
                 });
               }
               });
});

app.post('/ChangePw',function(req, res){
  console.log(req.url);
  console.log('e-mail= '+req.session.email);
  console.log('old password= '+req.opw);
  console.log('new password= '+req.npw);

  if(req.body.pw.length < 6) {
    return res.json(
    {
      code: 2,
      message: "Password too short"
    });
  }
  client.query('UPDATE user SET password=? WHERE email=?',[req.pw,req.session.email],
               function(err, row, fields){
               if(err) { throw err; }
                 return res.json({
                   code: 0,
                   message: "Change password success"
                 });
               });
});

app.post('/Logout',function(req, res){
  req.session.destroy(function(err) {
    if(!err) {
      return res.json({
        code: 0,
        message: "Log out success"
      });
    }
  });
});

app.get('/GetPos',function(req, res, next){
  if(req.session.email) {
    client.query('SELECT * FROM user WHERE email=?', [req.session.email],
    function(err, row, fields){
    if(err) {
    console.log('err');
    throw err; 
    }
      else if(row[0].mapCenterX.length === 0)
          next()
      else return res.json({
        code: 0,
        message: "Location get success",
        px: row[0].mapCenterX,
        py: row[0].mapCenterY
      });
    });
  }
  else {
	next();
  }
});

app.get('/GetPos', function (req, res) {
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    request('http://getcitydetails.geobytes.com/GetCityDetails?fqcn='+ip,
            function (error, response, body) {
            body = JSON.parse(body);
            return res.json({
                code: 0,
                message: "Location get success",
                px: body['geobyteslatitude'],
                py: body['geobyteslongitude']
            });
            });
});

app.post('/PostPos',function(req, res){
  if(req.session.email){
    console.log(req.body);
    console.log(req.session.email);
    client.query('UPDATE user SET mapCenterX=?, mapCenterY=? WHERE email=?',
      [req.body.px, req.body.py, req.session.email],
      function(err, row, fields){
        if(err) { throw err; }
        else return res.json({
          code: 0,
          message: "Update position success"
        });
      });
  }
  else return res.json({
    code: 8,
    message: "Not logged in"
  });
});

app.get('/SessionVerify', function(req, res){
  if(req.session.email){
    return res.json({
      code: 7,
      message: "Logged in"
    });
  }
  else return res.json({
    code: 8,
    message: "Not logged in"
  });
});

app.get('/',function(req,res) {
  console.log(req.url);
    res.type('text/html');
  res.sendFile(__dirname+'/Login.html');
});

app.listen(8080);

//client.end();
