var express = require('express');
var fs = require('fs');
var mysql = require('mysql');
var conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '111111',
    database: 'o2'
});
conn.connect();
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer({ dest: 'uploads/' })
app.use(bodyParser.urlencoded({ extended: false }));
app.set('views','./views_mysql');
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
    var sql = 'SELECT id,title FROM topic';
    conn.query(sql,function(err,topics,fields){
        var id = req.params.id;
        if(id){ 
            var sql = 'SELECT * FROM topic WHERE id=?';
            conn.query(sql,[id],function(err,topic,fields){
                if(err){
                    console.log(err);
                }else{
                    res.render('view',{topics:topics, topic:topic[0]});
                }
            });
        }else{
            res.render('view',{topics:topics});
        }
    })
    // fs.readdir('data',function(err,files){
    //     if(err){
    //         res.status(500).send('<h1>Internal Server Error</h1>');
    //     }
    //     res.render('view', {topics:files});
    // })
})

// app.get('/topic/:id',function(req,res){
//     var id = req.params.id;
//     fs.readdir('data',function(err,files){
//         if(err){
//             res.status(500).send('<h1>Internal Server Error</h1>');
//         }
//         fs.readFile('data/'+id,'utf8',function(err,data){
//             if(err){
//                 res.status(500).send('<h1>Internal Server Error</h1>');
//             }
//         res.render('viewCopy',{topics:files,title:id, description:data});
//         })
//     })
// })



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