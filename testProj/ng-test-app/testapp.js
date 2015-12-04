
var App = App || {};

App.TestController = function ($scope) {
	$scope.items = [{name: "a"}, {name: "b"}];
}




angular.module('TestApp', []).controller('TestController', [ '$scope', App.TestController ]);

// OR
//App.TestController.$inject = ['$scope'];
//angular.module('app', []).controller('ContactController', App.TestController);