var express = require('express');
var User = require('../model/user');

var router = express.Router();


router.get('/list', function (req, res, next) {


   User.find({},function(err,doc){
        res.json(doc )
    }) ;
});
router.post('/reg', function (req, res) {
    var user = new User({name:req.body.name,password:req.body.password});
    user.save(function(err,doc){
        if(err){
            res.send({err:10001,mes:'出错了'})
        }else{
            res.json(doc) ;

        }
    })
});

module.exports = router;
