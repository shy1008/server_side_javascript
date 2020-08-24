var express = require('express');
var bodyParser = require('body-parser');
var app = express(); //express는 함수라서 application을 리턴해준다.
app.use(express.static('public'));// 정적인 파일이 위치할 디렉토리를 지정 하는 기능
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(bodyParser.urlencoded({ extended: false }))


app.get('/form',function(req,res){
    res.render('form');
});
app.get('/form_receiver',function(req,res){
    var title = req.query.title;
    var description = req.query.description;
    res.send(title + ',' + description);
})

app.post('/form_receiver',function(req,res){
    var title = req.body.title;
    var description = req.body.description;
    res.send(title+','+description);
})

app.get('/topic/:id',function(req,res){
    var topics=[
        'java',
        'node',
        'express'
    ];
    var output =`
        <a href="/topic?id=0">java</a><br>
        <a href="/topic?id=1">node</a><br>
        <a href="/topic?id=2">express</a><br>
        ${topics[req.params.id]}
    `
    res.send(output);
});
app.get('/topic/:id/:mode',function(req,res){
    res.send(req.params.id+","+req.params.mode);
});

app.get('/temp', function (req, res) {
    res.render('view');
});
app.get('/', function (req, res) {
    res.send('Hello home page');
});
app.get('/login', function (req, res) {
    res.send('<h1>login please</h1>');
});
app.get('/dynamic', function (req, res) {
    var lis = '';
    for (var i = 0; i < 5; i++) {
        lis = lis + '<li>coding</li>';
    }
    var time = Date();
    var ouput = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        Hello, Dynamic!
        ${lis}
        ${time}
    </body>
    </html>`

    res.send(ouput);
});
app.get('/route', function (req, res) {
    res.send('router,<img src="/a.jpg">');
});
app.listen(3000, function () {
    console.log('Conneted 3000 port!');
});