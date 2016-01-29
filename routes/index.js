var express = require('express');
var User = require('../method/user');

var router = express.Router();


router.get('/list', function (req, res, next) {
  User.find({},res)
});
router.post('/reg', function (req, res) {
  User.save({name:req.body.name,password:req.body.password},res)

});
router.post('/login', function (req, res) {
  User.login({name:req.body.name,password:req.body.password},res)

});

module.exports = router;
