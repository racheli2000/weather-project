
const express= require('express');
const app= express();
const env= require('dotenv');
const mongoose= require('mongoose');
const router = require('./route/api');
const bodyParser= require('body-parser');
const jwt= require('jsonwebtoken');
env.config();

app.use(bodyParser.json());

const connectionParams = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}

mongoose.connect(process.env.DB_CONNECT, connectionParams)
.then(() => {
    console.log("connect!!!");
}).catch((err) => {
    console.log(`error connection ${err}`);
}) 

app.use('/',router);

// app.use('/', function(req, res, next) {

//     try{
//         jwt.verify(req.headers['authorization'], process.env.SECRET);
//         next();
//     }
//     catch(err){
//         console.log(err);
//         res.send("please try again!")
//     }

// })

app.listen(3001, () => {console.log("listen port 3001")});