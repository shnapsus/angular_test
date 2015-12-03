(function () {
    'use strict';


    var module = angular.module('app.index');

    module.controller('IndexController', ['$scope', 'appConfig', 'RequestExecuter', '$q', function ($scope, appConfig, RequestExecuter, $q) {

        $scope.text = 'text';

        $scope.getInfo = function (flag) {
			console.log($scope.text);
        }
	    $scope.getInfo();



    }]);
}());