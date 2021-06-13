
const mongoose= require('mongoose');

const userSchema= mongoose.Schema({

    adminId:{
        type:String
    },
    name:{
        type:String,
        require: true
    },
    password:{
        type:String,
        minlength:6
    },
    mail:{
        type:String
    },

    citys:[{
        type: mongoose.Types.ObjectId, ref: 'City'
    }]

})

module.exports= mongoose.model('User', userSchema);