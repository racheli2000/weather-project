
const User= require('../models/user');
const nodemailer = require('nodemailer');
const jwt= require('jsonwebtoken');
const request = require('request');
const City= require('../models/city');

function sendmail(email, name) {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'veaarevnaproject@gmail.com',
            pass: 'veaarevna211651880'
        }
    });

    var mailOptions = {
        from: 'veaarevnaproject@gmail.com',
        to: email,
        subject: 'wellcom',
        text: `hello ${name}`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

const addNewUser = async (req, res) => {
    const newUser= new User(req.body);
    try{
         const user= await newUser.save();
         sendmail(req.body.mail, req.body.name);
         res.json({user: user});
    }
    catch(err){
        console.log(err);
    }
}

const login = async(req, res) => {

    const user= await User.findById(req.params.id);
    const token= jwt.sign({name: user.name, password: user.password}, process.env.SECRET);
    // res.send(user);
    res.send(token);
}

const requestApi = (city) => {
    return new Promise((resolve, reject) => {
        let options = {
            method: "GET",
            url: 'http://api.openweathermap.org/data/2.5/weather?q='+city+'&appid=7cf0dbb341d959c36eb9ffab36a5ad85'
        }
        request(options, function(err, res, body) {
            if(err)
              reject(err);
            else
             resolve(body);
        })
    })

}


const getWeather = (req, res) => {
    requestApi(req.params.city).then(data => {
            const currentWeather = new City({
                "userId": req.params.userId,
                "temp": JSON.parse(data).main.temp,
                "temp_min": JSON.parse(data).main.temp_min,
                "temp_max": JSON.parse(data).main.temp_max,
                "pressure": JSON.parse(data).main.pressure,
                "humidity": JSON.parse(data).main.humidity,
                "wind": JSON.parse(data).wind
                
            })
    res.send(data); 
            currentWeather.save()
                .then(weather => {
                    // push weather-request to user's document
                    const currentUser = User.findOneAndUpdate({ _id: req.params.id },
                        { $push: { 'citys': weather._id } })
                        .then(user => {
                            console.log('weather-request added to user-document')
                        })
                        .catch(err => {
                            console.log('failed to add weather-request to user-document')
                        })
                    console.log('weather saved');
                })
                .catch(err => {
                    console.log('weather failed to save');
                    // res.status(500).json({ weather: currentWeather })
                })
            })
        .catch(err => {
            res.status(500).json({ err: err })
        })
}

const getWeatherById = (req, res) => {

    console.log(req.params.id);
    City.findById(req.params.id)
    .then(weather => {
        res.json({weather: weather});
    }).catch(err => {
        console.log(err);
    })
}

const deleteWeatherById = async (req, res) => {

    try{
        City.findByIdAndDelete(req.params.id);
        res.send("weather was deleted");
    }
    catch(err){
        console.log(err);
    }
    

}

module.exports= {addNewUser, login, getWeather, getWeatherById, deleteWeatherById}
