var express = require('express');
var User = require('../method/user');

var router = express.Router();


router.get('/list', function (req, res, next) {
  User.find({},function(err,doc){
        res.json(doc )
    }) ;
});
router.post('/reg', function (req, res) {
  User.save({name:req.body.name,password:req.body.password},function(err,doc){
       res.json(doc)
   });

});

module.exports = router;
