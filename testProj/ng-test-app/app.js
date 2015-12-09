
var App = App || {};

App.Router = function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "list-template.html",
            controller: "ListController"
        })
        .when("/:name", {
            templateUrl: "item-template.html",
            controller: "ListController"
        })
        .otherwise({
            template: "<h1>Not Found</h1>"
        });
}

App.DataService = function ($http) {
    // TODO: how to get URLs?
    // TODO: how urls are built?
    return {
        letterList: function () {
            // could use angular-resource
            return $http.get(CONFIG.url.letter.get);
        },
        letterDetails: function (data) {
            return $http.get(CONFIG.url.letter.getDetails + "/" + data.name);
        }
    }
}



var Application = (function () {
    function init(appName) {
        // init the app
        return app(appName);

        //start angular
        //angular.bootstrap(document, [appName]);
    }

    function app(appName) {
        angular.module('TestDirectives', [])
            .directive("autoComplete", App.Directive.AutoComplete)
            .directive("breadcrumbs", App.Directive.Breadcrumbs);

        angular.module('TestFilters', [])
            .filter("Fucking", App.FuckingFilter);

        angular.module('TestControllers', [])
            .controller('ListController', ['$scope', '$routeParams', 'DataService', App.Controller.ListController]);

        var appModule = angular.module(appName, ['ngRoute', 'TestDirectives', 'TestControllers', 'TestFilters']);

        appModule.factory("DataService", ['$http', App.DataService]);
        appModule.config(["$routeProvider", App.Router]);

        return appModule;
    }

    return {
        start: init
    }
})();