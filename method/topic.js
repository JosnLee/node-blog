var Topic = require('../model/topic');

exports.topicSave=function(topic,res){
    topic.updateDate=new Date();
    var topicModel=new Topic(topic)
    topicModel.save(function(err,doc){
        console.log(doc,"csaca")
        console.log(err,"errr")
        res.json(doc)
    })


}

