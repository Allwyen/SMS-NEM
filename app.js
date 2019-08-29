const Express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const Mongoose = require('mongoose');

var app = new Express();

app.set('view engine','ejs'); 

app.use(Express.static(__dirname+"/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200' );

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

//Mongoose.connect("mongodb+srv://mongodb:mongodb@mycluster-ucvz5.mongodb.net/SMS?retryWrites=true&w=majority");

Mongoose.connect("mongodb://localhost:27017/SMS");

const StudModel = Mongoose.model("studentdata",{
    sadmno:String,
    srollno:String,
    sname:String,
    scollege:String,
    sbranch:String,
    sdob:String,
    semail:String
});

app.post('/insertstud',(req,res)=>{
    console.log(req.body);
    var stud = new StudModel(req.body);
    var result = stud.save((error,data)=>{
        if(error)
        {
            throw error;
            res.send(error);
        }
        else
        {
            res.send("Inserted!!");
        }
    });

});

app.get('/viewstud',(req,res)=>{
    var result = StudModel.find((error,data)=>{
        if(error)
        {
            throw error;
            res.send(error);
        }
        else
        {
            res.send(data);
        }
    });
});

app.post('/searchstud',(req,res)=>{
    const item = req.body.srollno;
    var result = StudModel.find({srollno:item},(error,data)=>{
        if(error)
        {
            throw error;
            res.send(error);
        }
        else
        {
            res.send(data);
        }
    });
});

app.post('/deletestud',(req,res)=>{
    const item = req.body._id;
    var result = StudModel.deleteOne({_id:item},(error,data)=>{
        if(error)
        {
            throw error;
            res.send(error);
        }
        else
        {
            res.send(data);
        }
    });
});

app.post('/updatestud',(req,res)=>{
    const item = req.body._id;
    const admno = req.body.sadmno;
    const rollno = req.body.srollno;
    const name = req.body.sname;
    const college = req.body.scollege;
    const branch = req.body.sbranch;
    const dob = req.body.sdob;
    const email = req.body.semail;

    var result = StudModel.update({_id:item},{$set:{sadmno:admno,srollno:rollno,sname:name,scollege:college,sbranch:branch,sdob:dob,semail:email}},(error,data)=>{
        if(error)
        {
            throw error;
            res.send(error);
        }
        else
        {
            res.send(data);
        }
    });
});

app.listen(process.env.PORT || 4579,()=>{
    console.log("Server running on port::4579...");
});