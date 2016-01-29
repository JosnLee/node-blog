var User = require('../model/user');

exports.save=function(user,callBack){
    var userModel=new User(user)
    return userModel.save(callBack)
}
exports.find=function(a,callback){
    User.find({},callback)
}
