
const user= require('../controller/user');
const router= require('express').Router();
const city= require('../controller/city');
const admin= require('../controller/admin'); 

router.post('/addNewUser', user.addNewUser);

router.post('/addCity/:id', city.addCity);

router.get('/getAllUsers', admin.getAllUsers);

router.delete('/deleteUser/:id', admin.deleteUser);

router.get('/login/:id', user.login);

router.get('/getWeather/:city/:id', user.getWeather);

router.get('/getWeatherById/:id', user.getWeatherById);

router.delete('/deleteWeatherById/:id', user.deleteWeatherById);

router.post('/addAdmin', admin.addAdmin);

module.exports= router;
