(function () {
    'use strict';


    var module = angular.module('app.index');

    module.controller('IndexController', ['$scope', 'appConfig', 'RequestExecuter', '$q', function ($scope, appConfig, RequestExecuter, $q) {

        $scope.comments = [];

        $scope.getInfo = function (flag) {

            $scope.comments[0] = '111';
            $scope.comments[1] = '2';
            $scope.comments[2] = '3111';
            $scope.comments[3] = '4111';
            $scope.comments[4] = '5111';
            $scope.comments[5] = '6111';
            $scope.comments[6] = '7111';
            $scope.comments[7] = '8111';

			console.log($scope.text);
        }
	    $scope.getInfo();



    }]);
}());