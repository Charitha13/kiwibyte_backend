require('dotenv').config();
const express = require('express');
const http = require('http');
const fs = require('fs');
//initializing express
const app = express();

const mongoose = require('mongoose');
const cors = require('cors');



//middleware

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended :true}));
app.use(express.static("images"));
app.use(express.static('public'));

// PORT
const port = process.env.PORT || 5000;

app.get('/index',function(req,res) {
    res.sendFile(__dirname + '/public/index.html');
  });
//DB connection
mongoose.connect(process.env.DB, {
    useNewUrlParser:true,
    useUnifiedTopology: true,
    UseFindAndModify: true,
    useCreateIndex: true
}).then(() => {
    console.log("DB CONNECTED")
}).catch(() => console.log("DB NOT CONNECTED!"));

app.use('/api/topic', require("./routes/routes"));

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(__dirname+ '/dist/'));
    app.get('*', (req,res) =>{
        res.sendFile(__dirname +"/dist/index.html");
    });
}


app.listen(port, () => {console.log(`app is running at ${port}`)}
);
