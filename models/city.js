

const mongoose= require('mongoose');
const User= require('../models/user');

const citySchema= mongoose.Schema({

    userId:{
        type: String
        
    },
    temp:{
        type:Number
    },
    temp_min:{
        type:Number
    },
    temp_max:{
        type:Number
    },
    pressure:{
        type:Number
    },
    humidity:{
        type:Number
    },
    wind:{
        speed:{
            type:Number
        },
        deg:{
            type:Number
        },
    }
})

citySchema.post('save', (req, res, next) => {

     const currentUser = User.findOneAndUpdate({ _id: req.params.id },
        { $push: { 'citys': this._id } })
        .then(user => {
            console.log('weather-request added to user-document')
            next()
        })
        .catch(err => {
            console.log('failed to add weather-request to user-document')
        })
})


    // push weather-request to user's document
   


module.exports= mongoose.model('City', citySchema);
