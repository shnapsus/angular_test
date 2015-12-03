﻿// http interceptor to provide spinner shown while loading all http requests is not done

'use strict';

(function () {

    var HttpInterceptor = function($q, $rootScope) {
        var numLoadings = 0;

        return {
            request: function (config) {

                numLoadings++;

                // Show loader
                $rootScope.$broadcast("loader_show");
                return config || $q.when(config)

            },
            response: function (response) {

                if ((--numLoadings) === 0) {
                    // Hide loader
                    $rootScope.$broadcast("loader_hide");
                }

                return response || $q.when(response);

            },
            responseError: function (response) {

                if (!(--numLoadings)) {
                    // Hide loader
                    $rootScope.$broadcast("loader_hide");
                }

                return $q.reject(response);
            }
        };
    };

    HttpInterceptor.$inject = ['$q', '$rootScope'];

    var module = angular.module('app.common');

    module.factory('HttpInterceptor', HttpInterceptor);
}());