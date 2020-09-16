var express = require('express');
var session = require('express-session');
var FileStore = require('session-file-store')(session);
var bodyParser = require('body-parser');
var bkfd2Password = require("pbkdf2-password");
const { has } = require('underscore');
var hasher = bkfd2Password();
// var sha256 = require('sha256'); 
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var app = express();
app.use(bodyParser.urlencoded({extended:false}))
app.use(session({
    secret: '213u9213jasdjlwqo@#!#',
    resave: false,
    saveUninitialized: true,
    store: new FileStore()
    // cookie: { secure: true }
  }))
app.use(passport.initialize());
app.use(passport.session());

app.get('/count',function(req,res){
    if(req.session.count){
        req.session.count++;
    }else{
        req.session.count = 1;
    }
    res.send('count : '+req.session.count);
})
var salt = '!@#$!@#asdqwe';
var users = [
    {
        username:'egoing',
        password:'5815a287aadebb57f72ccf298ce7569fcbaa33e7bc06f4361bb11abc6aa8bf9d',
        displayName:'Egoing'     
    }
];
app.post('/auth/register',function(req,res){
    hasher({password:req.body.password},function(err,pass,salt,hash){
        var user = {
            username: req.body.username,
            password: hash,
            salt:salt,
            displayName: req.body.displayName
        }
    
        users.push(user);
        req.session.displayName = req.body.displayName;
        req.session.save(function(){
            res.redirect('/welcome');
        })
    });
    
})
app.get ('/auth/register',function(req,res){
    var output = `
    <h1>Register</h1>
        <form action="/auth/register" method="post">
        <p>
            <input type="text" name="username" placeholder="username">    
        </p>
        <p>
            <input type="password" name="password" placeholder="password">    
        </p>
        <p>
        <input type="text" name="displayName" placeholder="displayName">    
    </p>
        <p>
        <input type="submit" >    
    </p>
        </form>
    `;
    res.send(output);
})
app.get('/welcome',function(req,res){
    if(req.session.displayName){
        res.send(`<h1>hello,${req.session.displayName}</h1>
        <a href="/auth/logout">logout</a>`);
    }else{
        res.send(`<h1>welcome</h1>
        <ul>
            <li><a href="/auth/logout">logout</a></li>
            <li><a href="/auth/register">Register</a></li>
        </ul>
        `);
    }
    // res.send(req.session);
})
app.get('/auth/logout',function(req,res){
    delete req.session.displayName;
    res.redirect('/welcome')
})
app.post('/auth/login',function(req,res){
   
    var uname = req.body.username;
    var pwd = req.body.password;

    for(var i = 0; i<users.length; i++){
        var user = users[i];
        if(uname === user.username){
             return hasher({password:pwd, salt:salt}, function(err, pass, salt, hash){
                if(hash === user.password){
                    req.session.displayName = user.displayName;
                    req.session.save(function(){
                        res.redirect('/welcome');
                    })
                }else{
                    res.send('Who are you <a href="/auth/login">login</a>');
                }
            })
        }


        // if(uname === user.username && sha256(pwd+salt) === user.password){
        //     req.session.displayName = user.displayName;
        //     return req.session.save(function(){
        //         return res.redirect('/welcome');
        //     })
        // }
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