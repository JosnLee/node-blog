var Topic = require('../model/topic');

exports.topicSave = function (topic, res) {
    topic.updateDate = new Date();
    var topicModel = new Topic(topic)
    topicModel.save(function (err, doc) {
        if (err) {
            res.json(err)
        } else {
            res.json(doc)
        }
    })
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


