// utilty factory: wrapper for angular $http service

'use strict';

(function () {
    var RequestExecuter = function ($q, $http, $log, appConfig) {
        var service = {};

        var getFunc = function (url, params, transformRequestFn, transformResponseFn, postData, method) {
            var defered = $q.defer();

            var httpParams = {};
            httpParams.cache = true;

            if ($.type(method) !== "string" || $.inArray(method.toLowerCase(), ['get', 'post']) === -1)
                method = 'get';
            httpParams.method = method;
            if ($.type(params) !== "null" && $.type(params) !== "undefined") {
                httpParams.params = params;
            }
            if ($.type(postData) !== "null" && $.type(postData) !== "undefined")
                httpParams.data = postData;
            if ($.type(transformRequestFn) !== "null" && $.type(transformRequestFn) !== "undefined")
                httpParams.transformRequest = transformRequestFn;
            if ($.type(transformResponseFn) !== "null" && $.type(transformResponseFn) !== "undefined")
                httpParams.transformResponse = transformResponseFn;

            httpParams.url = url;

            $http(httpParams)
                .success(function (result) {
                    defered.resolve(result);
                })
                .error(function (error, status) {
                    defered.reject({ message: error, status: status });
                });
            return defered.promise;
        };

        service.getWithParams = function (url, params) {
            return getFunc(url, params, null, null);
        };
        service.get = function (url) {
            return getFunc(url, null, null, null);
        };
        service.getWithTransformResponse = function (url, params, transformResponseFn) {
            return getFunc(url, params, null, transformResponseFn);
        };
        service.post = function (url, data) {
            return getFunc(url, null, null, null, data, 'post');
        };

        return service;
    };

    RequestExecuter.$inject = ['$q', '$http', '$log', 'appConfig'];

    var module = angular.module('app.common');

    module.factory('RequestExecuter', RequestExecuter);
}());