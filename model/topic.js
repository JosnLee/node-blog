var mongoose=require('./db.js');
var Schema=mongoose.Schema;

var topicSchema=new Schema({
    title: String,
    viewCount: Number,
    content:String,
    tagIds:[String],
    creator:String,
    updateDate:Date
});


module.exports=mongoose.model('topic',topicSchema);