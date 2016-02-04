var Topic = require('../model/topic');

exports.topicSave = function (topic, res) {
    topic.updateDate = new Date();
    if(topic._id){
        var _id = topic._id; //需要取出主键_id
        delete topic._id;    //再将其删除
        Topic.findByIdAndUpdate(_id,{$set:topic},function(err,topic){
            res.json(topic)
        });
    }else{
        var topicModel = new Topic(topic)
        topicModel.save(function (err, doc) {
            if (err) {
                res.json(err)
            } else {
                res.json(doc)
            }
        })
    }

};
/***
 * 获取文章列表
 * @param params
 * @param res
 */
exports.topicList=function(params,res){
    Topic.find(params,function(err,doc){
      if(err){
          res.json(err)
      }else{
          res.json(doc)
      }
    })

};


