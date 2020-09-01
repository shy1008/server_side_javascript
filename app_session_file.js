var express = require('express');
var session = require('express-session');
var FileStore = require('session-file-store')(session);

var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({extended:false}))
app.use(session({
    secret: '213u9213jasdjlwqo@#!#',
    resave: false,
    saveUninitialized: true,
    store: new FileStore()
    // cookie: { secure: true }
  }))

app.get('/count',function(req,res){
    if(req.session.count){
        req.session.count++;
    }else{
        req.session.count = 1;
    }
    res.send('count : '+req.session.count);
})
app.get('/welcome',function(req,res){
    if(req.session.displayName){
        res.send(`<h1>hello,${req.session.displayName}</h1>
        <a href="/auth/logout">logout</a>`);
    }else{
        res.send(`<h1>welcome</h1>
        <a href="/auth/logout">logout</a>
        `);
    }
    // res.send(req.session);
})
app.get('/auth/logout',function(req,res){
    delete req.session.displayName;
    res.redirect('/welcome')
})
app.post('/auth/login',function(req,res){
    var user = {
        username:'egoing',
        password:'111',
        displayName:'Egoing'
    };
    var uname = req.body.username;
    var pwd = req.body.password;

    if(uname === user.username && pwd === user.password){
        req.session.displayName = user.displayName;
        res.redirect('/welcome');
    }else{
        res.send('Who are you <a href="/auth/login">login</a>');
    }
})
app.get('/auth/login',function(req,res){
    var output = `
    <h1>Login</h1>
        <form action="/auth/login" method="post">
        <p>
            <input type="text" name="username" placeholder="username">    
        </p>
        <p>
            <input type="password" name="password" placeholder="password">    
        </p>
        <p>
        <input type="submit" >    
    </p>
        </form>
    `;
    
    res.send(output);
})
app.listen(3003, function(){
    console.log('Connected 3003 port!!!');
})