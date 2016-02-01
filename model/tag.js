var mongoose=require('./db.js');
var Schema=mongoose.Schema;

var tagSchema=new Schema({
    title: String,
    tagId:String,
    updateDate:Date
});

module.exports=mongoose.model('tag',tagSchema);