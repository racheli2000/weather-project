

const mongoose= require('mongoose');

const adminSchema= mongoose.Schema({

    name:{
        type:String,
        require: true
    },
    password:{
        type:String,
        minlength:6
    },

})

module.exports= mongoose.model('Admin', adminSchema);