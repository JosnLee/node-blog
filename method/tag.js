var Tag = require('../model/tag');


exports.tagSave=function(tag,res){
    tag.updateDate=new Date();
    if(tag._id){
        var _id = tag._id; //需要取出主键_id
        delete tag._id;    //再将其删除
        Tag.findByIdAndUpdate(_id,{$set:tag},function(err,tag){
            res.json(tag)
        });
    }else{
        var tagModel=new Tag(tag)
        Tag.find({title:tag.name},function(err,doc){
            if(doc.length){
                res.json({code:-1,message:'名称已经存在'})
            }else{
                tagModel.save(function(err,doc){
                    res.json(doc)
                })
            }
        })
    }




}
exports.tagList=function(tag,res){
    Tag.find(tag,function(err,doc){
       res.json(doc);
    })


}
exports.tagDelete=function(tag,res){
    Tag.remove(tag,function(err,doc){
        res.json(doc);
    })
}
