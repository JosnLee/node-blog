var express = require('express');
var Topic = require('../method/topic');

var router = express.Router();

router.post('api/topic/create',function(req,res){
    console.log(req)
    Topic.topicSave(req.body,res);
})
module.exports = router;
