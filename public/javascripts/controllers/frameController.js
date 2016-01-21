var nodeBlog = angular.module('nodeBlog', []);
nodeBlog.controller('frameCtrl', ['$scope','$http', function ($scope,$http) {
    $scope.userSubmit = function () {
        $http.post('/reg',{name:$scope.name,password:$scope.password}).then(function(res){
            console.log(res,"llllllll")
        })
    }
}]);
