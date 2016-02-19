var Topic = require('../model/topic');

exports.topicSave = function (topic, res) {
    topic.updateDate = new Date();
    if (topic._id) {
        var _id = topic._id; //需要取出主键_id
        delete topic._id;    //再将其删除
        Topic.findByIdAndUpdate(_id, {$set: topic}, function (err, topic) {
            res.json(topic)
        });
    } else {
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
exports.topicList = function (params, res) {
    Topic.find(params, function (err, doc) {
        if (err) {
            res.json(err)
        } else {
            res.json(doc.sort({updateDate: -1}))
        }
    })

};
exports.topicListPageable = function (params, res) {
    Topic.execPageQuery(params.page,params.pageSize,function(err,doc){
        res.json(doc)
    });

};

exports.topicDelete = function (params, res) {
    Topic.remove(params, function (err, doc) {
        if (err) {
            res.json(err)
        } else {
            res.json(doc)
        }
    })

};


