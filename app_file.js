var express = require('express');
var fs = require('fs');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer({ dest: 'uploads/' })
app.use(bodyParser.urlencoded({ extended: false }));
app.set('views','./views_file');
app.set('view engine','ejs');


app.get('/upload',function(req,res){
    res.render('upload');
})
app.post('/upload',upload.single('userfile'),function(req,res){
    console.log(req.file);
    res.send('Uploaded'+req.file);
})


app.get('/topic/new',function(req,res){
    res.render('new');
})

app.get(['/topic','/topic/:id'],function(req,res){
    fs.readdir('data',function(err,files){
        if(err){
            res.status(500).send('<h1>Internal Server Error</h1>');
        }
        res.render('view', {topics:files});
    })
})

app.get('/topic/:id',function(req,res){
    var id = req.params.id;
    fs.readdir('data',function(err,files){
        if(err){
            res.status(500).send('<h1>Internal Server Error</h1>');
        }
        fs.readFile('data/'+id,'utf8',function(err,data){
            if(err){
                res.status(500).send('<h1>Internal Server Error</h1>');
            }
        res.render('viewCopy',{topics:files,title:id, description:data});
        })
    })
})



app.post('/topic',function(req,res){
    var title = req.body.title;
    var description = req.body.description;

    // res.send(title+","+description);
    fs.writeFile('data/'+title, description, function(err){
        if(err){
            res.status(500).send('<h1>Internal Server Error</h1>');
        }
        res.send('Success!');
    });
})



app.listen(3000, function(){
    console.log('connected');
})