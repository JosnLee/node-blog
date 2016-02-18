angular.module('nodeBlog', ['ui.bootstrap', 'ui.router', 'ui.select', 'ngSanitize']).config(function ($stateProvider, $urlRouterProvider) {
    //
    // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise("/home");
    // Now set up the states
    $stateProvider
        .state('home', {
            url: "/home",
            views: {
                "container": {templateUrl: "/tpls/topiclist.html"}
            }
        }).state('topicDetail', {
            url: "/topic-detail?topicId",
            views: {
                "container": {templateUrl: "/tpls/topicDetail.html"}
            }
        })
        .state('admin', {
            url: "/admin?topicId",
            views: {
                "container": {templateUrl: "/tpls/topicManage.html"}
            }
        }).state('topiclist', {
            url: "/topiclist",
            views: {
                "container": {templateUrl: "/tpls/topicListAdmin.html"}
            }
        }).state('taglist', {
            url: "/taglist",
            views: {
                "container": {templateUrl: "/tpls/tagsList.html"}
            }
        })

}).factory('topicMange', ['$http', '$q', function ($http, $q) {
    var topicMange = {
        /**
         * 获取topic的列表
         * parames {_id:id}
         * @returns {*}
         */
        getTopic: function (params) {
            return $http.post('/api/topic/list', params).then(function (result) {
                return result.data;
            });
        },
        deleteTopic: function (params) {
            return $http.post('/api/topic/delete', params).then(function (result) {
                return result.data;
            });
        },
        createTopic: function (params) {
            return $http.post('/api/topic/create', params).then(function (result) {
                return result.data;
            });
        },
        getTag:function(params){
            return $http.post('/api/tag/list', params).then(function (result) {
                return result.data;
            });
        },
        createTag:function(params){
            return $http.post('/api/tag/create', params).then(function (result) {
                return result.data;
            });
        },
        deleteTag:function(params){
            return $http.post('/api/tag/delete', params).then(function (result) {
                return result.data;
            });
        },
    }


    return topicMange;
}]);
angular.module('nodeBlog').controller('frameCtrl', ['$scope', '$http', function ($scope, $http) {
    $scope.userSubmit = function () {
        $http.post('/reg', {name: $scope.name, password: $scope.password}).then(function (res) {
            console.log(res, "llllllll")
        })
    }
    $scope.myInterval = 5000;
    $scope.noWrapSlides = false;
    var slides = $scope.slides = [];
    var currIndex = 0;

    $scope.addSlide = function () {
        var newWidth = 600 + slides.length + 1;
        slides.push({
            image: '//lorempixel.com/' + newWidth + '/300',
            text: ['Nice image', 'Awesome photograph', 'That is so cool', 'I love that'][slides.length % 4],
            id: currIndex++
        });
    };

    $scope.randomize = function () {
        var indexes = generateIndexesArray();
        assignNewIndexesToSlides(indexes);
    };

    for (var i = 0; i < 4; i++) {
        $scope.addSlide();
    }

    // Randomize logic below

    function assignNewIndexesToSlides(indexes) {
        for (var i = 0, l = slides.length; i < l; i++) {
            slides[i].id = indexes.pop();
        }
    }

    function generateIndexesArray() {
        var indexes = [];
        for (var i = 0; i < currIndex; ++i) {
            indexes[i] = i;
        }
        return shuffle(indexes);
    }

    // http://stackoverflow.com/questions/962802#962890
    function shuffle(array) {
        var tmp, current, top = array.length;

        if (top) {
            while (--top) {
                current = Math.floor(Math.random() * (top + 1));
                tmp = array[current];
                array[current] = array[top];
                array[top] = tmp;
            }
        }

        return array;
    }
}]).controller('adminController', ['$scope', '$sce', '$http', '$state', function ($scope, $sce, $http, $state) {


}]).controller('topicController', ['$scope', '$sce', '$http', 'topicMange', function ($scope, $sce, $http, topicMange) {
    topicMange.getTopic({}).then(function (res) {
        $scope.topics = res;
    })

}]).controller('topicDetailController', ['$scope', '$sce', '$http', '$state', 'topicMange', function ($scope, $sce, $http, $state, topicMange) {
    var topicId = $state.params.topicId;
    var converter = new showdown.Converter();

    $scope.textChange = function () {
        $scope.html = $sce.trustAsHtml(converter.makeHtml($scope.topic.content));

    }
    topicMange.getTopic({_id: topicId}).then(function (res) {
        $scope.topic = res[0];
        $scope.textChange();
    })

}]).controller('topicCreateController', ['$scope', '$sce', '$http', '$state', 'topicMange', function ($scope, $sce, $http, $state, topicMange) {
    $scope.topic = {tagsSelect: []}
    var topicId = $state.params.topicId;
    var converter = new showdown.Converter();
    $scope.textChange = function () {
        $scope.html = $sce.trustAsHtml(converter.makeHtml($scope.topic.content));

    }
    topicMange.getTag({}).then(function(res){
        $scope.tags = res;
    })

    $scope.saveTopic = function () {
        topicMange.createTopic($scope.topic).then(function (res) {
            $state.go('topiclist')
        })

    }

    if (topicId) {
        topicMange.getTopic({_id: topicId}).then(function (res) {
            $scope.topic = res[0];
            $scope.textChange();
        })
    }


}]).controller('topicAdminController', ['$scope', '$sce', 'topicMange','$state', function ($scope, $sce, topicMange,$state) {
    topicMange.getTopic({}).then(function (res) {
        $scope.topics = res;
    })
    $scope.deleteTopic=function(topic){
        topicMange.deleteTopic(topic).then(function(res){
            $state.reload();
        })
    }

}]).controller('tagController', ['$scope', '$sce', '$http', '$state','topicMange', function ($scope, $sce, $http, $state,topicMange) {


    $scope.saveTag = function (tag) {
        delete tag.show
        topicMange.createTag(tag).then(function(res){
            $state.reload();
        })

    }
    topicMange.getTag({}).then(function(res){
        $scope.tags = res;
    })
    $scope.deleteTag = function (tag) {
        topicMange.deleteTag({_id: tag._id}).then(function(res){
            $state.reload();
        })

    }
}])