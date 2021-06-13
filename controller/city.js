
const City= require('../models/city');
const User= require('../models/user');

const addCity = async(req, res) => {

    const newCity= new City(req.body);

        const city= await newCity.save()
        .then(city => {
            User.findOneAndUpdate({id: userId},
            {$push: {'citys': city._id}})
            .then(user => {
                console.log(user);
            }).catch(err => {
                console.log(err);
            })
        }).catch(err => {
            console.log(err);
        })
}


module.exports= {addCity}