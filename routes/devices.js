const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Get environment variables
require('dotenv').config();

const URI = 'mongodb://' + process.env.MONGO_USERNAME + ':' + process.env.MONGO_PASSWORD + '@ds133991.mlab.com:33991/wattnow';

mongoose.connect(URI, function(err){
  if (err){
    console.log('No connection');
  } else {
    console.log('You\'re connected');
  }
});

const userDevices = mongoose.Schema({
  device: Array,
  key: Array,
});

const post = mongoose.model('Device', userDevices);

router.post('/', function (req, res) {
  console.log(req.body);
  const newDevice = new post(req.body);
  newDevice.save(function(err){
    if (err) throw err;
  });
  res.render('devices', { title: 'Watt-Now | Devices' });
});

/* GET devices page. */
router.get('/', function(req, res, next) {
  res.render('devices', { title: 'Watt-Now | Devices' });
});

module.exports = router;
