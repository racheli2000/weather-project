
const User= require('../models/user');
const City= require('../models/city');
const Admin= require('../models/admin');


const addAdmin = async (req, res) => {
    const newAdmin= new Admin(req.body);
    try{
         const admin= await newAdmin.save();
         res.json({admin: admin});
    }
    catch(err){
        console.log(err);
    }
}

const getAllUsers = (req, res) => {

    // const users= User.findById(req.params.id)
    User.find()
    .then(user => {
        res.status(200).json({users: user});
    }).catch(err => {
        console.log(err);
    })
}

const deleteUserWeather = async (id) => {

    try{
        await City.findByIdAndDelete(id);
        res.send("successed");
    }
    catch(err){
        console.log(err);
    }
}

const deleteUser = async (req, res) => {

    try{
        await User.findByIdAndUpdate(req.params.id, {$pull: {citys: req.params.id}});
        await User.findByIdAndDelete(req.params.id);
        res.send("successed");
    }
    catch(err){
        console.log("can not delete");
    }

    // deleteUserWeather(req.params.id);
} 



module.exports= {getAllUsers, deleteUser, addAdmin}