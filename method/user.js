var User = require('../model/user');
var crypto = require('crypto');

exports.save=function(user,res){
    var md5 = crypto.createHash('md5');
    md5.update(user.password);
    user.password=md5.digest('hex');
    var userModel=new User(user)
    User.find({name:user.name},function(err,doc){
        if(doc.length){
            res.json({code:-1,message:'用户已经存在'})
        }else{
            userModel.save(function(err,doc){
                res.json(doc)
            })
        }
    })


}
exports.find=function(user,res){
    User.find({},function(err,doc){

        res.json(doc);
    })
}
exports.login=function(user,res){
    var md5 = crypto.createHash('md5');
    md5.update(user.password);
    user.password=md5.digest('hex');
    User.find(user,function(err,doc){
        if(doc.length){
            res.json({code:0,message:'登录成功'});
        }else{
            res.json({code:-1,message:'用户名或者密码错误'});

        }
    })
}
