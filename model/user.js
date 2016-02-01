var mongoose=require('./db.js');
var Schema=mongoose.Schema;

var userSchema=new Schema({
    name: String,
    password: String,
    imageUrl:String,//头像
    updateDate:Date,//更新时间
    roleId:String,//角色ID
    roleName:String//角色名称


});

module.exports=mongoose.model('User',userSchema);