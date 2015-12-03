// providers decorating
angular.module('App')
    .config([
        '$provide', 'appConfig', function ($provide, appConfig) {
        }
    ])
    // configure $http for spinner using
    .config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push('HttpInterceptor');
    }]);
