angular.module('App')
    .config(['$routeProvider', '$locationProvider', 'appConfig', function ($routeProvider, $locationProvider, appConfig) {

        $routeProvider
            .when(appConfig.states.index.url, {
                templateUrl: appConfig.templates.index,
                controller: 'IndexController'
            })
            .otherwise({
                templateUrl: appConfig.templates.index,
                controller: 'IndexController'
            });

        if (window.history && window.history.pushState) {
            $locationProvider.html5Mode(true);
        }
    }
    ]);