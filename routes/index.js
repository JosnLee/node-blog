var express = require('express');
var User = require('../method/user');
var Topic = require('../method/topic');


var router = express.Router();


router.get('/api/list', function (req, res, next) {
  User.find({},res)
});
router.post('/api/reg', function (req, res) {
  User.save({name:req.body.name,password:req.body.password},res)

});
router.post('/api/login', function (req, res) {
  User.login({name:req.body.name,password:req.body.password},res)

});

router.post('/api/topic/create',function(req,res){
  console.log(req,"kckkckkak")
  Topic.topicSave(req.body,res);
})
module.exports = router;
module.exports = router;
