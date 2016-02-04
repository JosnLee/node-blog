angular.module('nodeBlog', ['ui.bootstrap', 'ui.router']).config(function ($stateProvider, $urlRouterProvider) {
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

});
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


}]).controller('topicController', ['$scope', '$sce', '$http', '$state', function ($scope, $sce, $http, $state) {

    $scope.getTopic = function () {
        $http.post('api/topic/list', {}).then(function (res) {
            $scope.topics = res.data;
        })
    }
    $scope.getTopic();

}]).controller('topicDetailController', ['$scope', '$sce', '$http', '$state', function ($scope, $sce, $http, $state) {
    var topicId = $state.params.topicId;
    var converter = new showdown.Converter();

    $scope.textChange = function () {
        $scope.html = $sce.trustAsHtml(converter.makeHtml($scope.topic.content));

    }
    $scope.getTopic = function () {
        $http.post('api/topic/list', {_id: topicId}).then(function (res) {
            $scope.topic = res.data[0];
            $scope.textChange();
        })
    }
    $scope.getTopic();

}]).controller('topicCreateController', ['$scope', '$sce', '$http', '$state', function ($scope, $sce, $http, $state) {
    var topicId = $state.params.topicId;
    var converter = new showdown.Converter();
    $scope.textChange = function () {
        $scope.html = $sce.trustAsHtml(converter.makeHtml($scope.topic.content));

    }

    $scope.saveTopic = function () {
        console.log($scope.topic)
        $http.post('api/topic/create', $scope.topic).then(function (res) {
            console.log(res);
        })
    }
    $scope.getTopic = function (id) {
        if (id)
            $http.post('api/topic/list', {_id: id}).then(function (res) {
                $scope.topic = res.data[0];
                $scope.textChange();
            })
    }
    if (topicId) {
        $scope.getTopic(topicId);

    }


}]).controller('topicAdminController', ['$scope', '$sce', '$http', function ($scope, $sce, $http) {

    $scope.getTopic = function () {
        $http.post('api/topic/list', {}).then(function (res) {
            $scope.topics = res.data;
        })
    }
    $scope.getTopic();

}]).controller('tagController', ['$scope', '$sce', '$http','$state',function ($scope, $sce, $http,$state) {


    $scope.saveTag = function (tag) {
        delete tag.show
        $http.post('api/tag/create',tag).then(function (res) {
            $state.reload();
        })
    }
    $scope.getTag = function () {
        $http.post('api/tag/list', $scope.tag).then(function (res) {
          $scope.tags=res.data;
        })
    }
    $scope.deleteTag=function(tag){
        $http.post('api/tag/delete',{_id:tag._id}).then(function(res){
            console.log(res);
        })
    }
    $scope.getTag();
}])