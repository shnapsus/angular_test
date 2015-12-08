﻿/// <reference path="~/libraries/angular/angular.js"/>
/// <reference path="~/libraries/jasmine/jasmine.js"/>
/// <reference path="~/libraries/jasmine/jasmine-html.js"/>
/// <reference path="~/libraries/jasmine/boot.js"/>
/// <reference path="~/libraries/angular/angular-mocks.js"/>
/// <reference path="~/ng-test-app/app.js"/>

describe("Application", function() {
    it("start returns app module", function() {
        var appModule = Application.start("TestAppName");
        
        expect(appModule).not.toBeNull();
    });

    describe("has dependency:", function() {
        var dependencies;
        beforeAll(function() {
            var appModule = Application.start("TestName");
            dependencies = appModule.value("appName").requires;
        });

        it("TestControllers module", function() {
            expect(dependencies).toContain("TestControllers");
        });

        it("TestFilters module", function () {
            expect(dependencies).toContain("TestFilters");
        });

        it("TestDirectives module", function () {
            expect(dependencies).toContain("TestDirectives");
        });
    });
});

//describe("TestApp module", function () {
//    var testModule;
//    beforeEach(function () {
//        testModule = angular.module("TestApp");
//    });

//    var deps;
//    beforeEach(function () {
//        deps = testModule.value('appName').requires;
//    });
//    var hasModule = function (m) {
//        return deps.indexOf(m) >= 0;
//    };

//    it("should be registered", function () {
//        expect(testModule).not.toBeNull();
//    });

//    //you can also test the module's dependencies
//    it("should have TestControllers as a dependency", function () {
//        expect(hasModule('TestControllers')).toBeTruthy();
//    });

//    it("should have TestFilters as a dependency", function () {
//        expect(hasModule('TestFilters')).toBeTruthy();
//    });

//    //it("should have App.Filters as a dependency", function () {
//    //    expect(hasModule('App.Filters')).toBeTruthy();
//    //});

//    //it("should have App.Routes as a dependency", function () {
//    //    expect(hasModule('App.Routes')).toBeTruthy();
//    //});

//    //it("should have App.Services as a dependency", function () {
//    //    expect(hasModule('App.Services')).toBeTruthy();
//    //});
    
//});


describe("Filters", function () {
    'use strict';

    //describe("filters registration", function () {
    //    //beforeEach(module("TestFilters"));

    //    //var $filter;
    //    //beforeEach(inject(function (_$filter_) {
    //    //    $filter = _$filter_;
    //    //}));

    //    it("Filters module exists", function() {
    //        expect(angular.module("TestFilters")).not.toThrow();
    //    });

    //    it("FuckingFilter is registered", function () {
    //        expect(angular.module("FuckingFilter1")).not.toThrow();
            
    //        //expect(FuckingFilter).not.toThrow();
    //        //expect(FuckingFilter).not.toBeUndefined();
    //        //expect($filter("FuckingFilter")).not.toThrow();
    //        //expect($filter("FuckingFilter")).not.toBeUndefined();
    //    });
    //});

    //beforeEach(function () {
    //    angular.module("TestApp");
    //});

    describe("Fucking filter", function () {
        //it("should be registered", function () {
        //    module("TestApp");
        //    var $filter;
        //    inject(function (_$filter_) { $filter = _$filter_; });

        //    expect($filter('Fucking')).not.toBeNull();
        //});

        it("should add Fucking to input string", function () {
            var filter = App.FuckingFilter();
            var result = filter("angular");

            expect(result).toBe("Fucking angular!");
        });

        //it("should not break on null", function () {
        //    var filter = App.FuckingFilter();
        //    var result = filter();
        //    expect(result).toBe("Fucking !");
        //});
    });
});



describe("Controllers", function () {
    'use strict';

    beforeEach(module("TestControllers"));

    //"ListsController"

    describe("ListController", function () {
        // FUUUUUUUUUUUUUUUUUUUUCK!!!!!!!!

        //it("should be registered", function () {
        //    module("TestControllers");
        //    var $controller;
        //    inject(function (_$controller_) { $controller = _$controller_; });
        //    console.log($controller);
        //    expect($controller('ListsController', { $scope: {}, DataService: {lettersList: function (){}} })).not.toBeNull();
        //});
        var _controller, $q, $rootScope;
        beforeEach(function() {
            _controller = App.Controller.ListController;

            var injector = angular.injector(['ng']);
            $q = injector.get("$q");
            $rootScope = injector.get("$rootScope");

            //$q = getQ();
            //$rootScope = getRootScope();
        });

        function getQ() {
            return angular.injector(['ng']).get('$q');
        }
        function getRootScope() {
            return angular.injector(['ng']).get('$rootScope');
        }

        it("requests list data when no route params", function () {
            var scope = {},
                routeParams = {},
                dataService = { letterList: function() {} };
            
            var deferred = $q.defer();
            spyOn(dataService, "letterList").and.callFake(function () {
                return deferred.promise;
            });

            var data = [{ name: "A", other: "111" }, { name: "B", other: "222" }];
            deferred.resolve({ data: data });
            
            _controller(scope, routeParams, dataService);
            $rootScope.$apply();

            expect(dataService.letterList).toHaveBeenCalledWith();
            expect(scope.items).toEqual(data);
            expect(scope.letter).toBeUndefined();
        });

        it("requests list data when have 'name' in route params", function () {
            var scope = {},
                routeParams = {name:"A"},
                dataService = { letterDetails: function () { } };

            var deferred = $q.defer();
            spyOn(dataService, "letterDetails").and.callFake(function () {
                return deferred.promise;
            });

            var data = { name: "A", other: "111" };
            deferred.resolve({ data: data });

            _controller(scope, routeParams, dataService);
            $rootScope.$apply();

            expect(dataService.letterDetails).toHaveBeenCalledWith(routeParams);
            expect(scope.letter).toEqual(data);
            expect(scope.items).toBeUndefined();
        });
        //it("should add Fucking to input string", function () {
        //    var filter = App.FuckingFilter();
        //    var result = filter("angular");

        //    expect(result).toBe("Fucking angular!");
        //});

        //it("should not break on null", function () {
        //    var filter = App.FuckingFilter();
        //    var result = filter();
        //    expect(result).toBe("Fucking !");
        //});
    });
});