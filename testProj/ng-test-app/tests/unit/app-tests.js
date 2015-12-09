/// <reference path="~/libraries/angular/angular.js"/>
/// <reference path="~/libraries/jasmine/jasmine.js"/>
/// <reference path="~/libraries/jasmine/jasmine-html.js"/>
/// <reference path="~/libraries/jasmine/boot.js"/>
/// <reference path="~/libraries/angular/angular-mocks.js"/>
/// <reference path="~/ng-test-app/app.js"/>

describe("Application", function () {
    'use strict';

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

        it("TestControllers module", function () {
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
        it("should be registered", function () {
            var $filter = angular.injector(["ng", "TestFilters"]).get("$filter");

            var lambda = function() { return $filter('Fucking') };

            expect(lambda).not.toThrow();
            expect(lambda()).toBeDefined();
            expect(typeof lambda()).toEqual('function');
        });

        it("should add Fucking to input string", function () {
            var filter = App.FuckingFilter();
            var result = filter("angular");

            expect(result).toBe("Fucking angular!");
        });
    });
});



describe("Controllers", function () {
    'use strict';

    describe("ListController", function () {
        it("should be registered", function () {
            var dataServiceMock = {
                letterList: function () { return { then: function () { } } }
            };
            var $controller = angular.injector(["ng", "TestControllers"]).get("$controller");

            var ctrlName = "ListController";
            var lambda = function() {
                return $controller(ctrlName, { $scope: {}, $routeParams: {}, DataService: dataServiceMock });
            };
            expect(lambda).not.toThrowError(/Argument '/ + ctrlName + /' is not a function/);
            expect(lambda()).toBeDefined();
            expect(typeof lambda()).toEqual('object');
        });

        
        var _controller, $q, $rootScope;
        beforeAll(function() {
            _controller = App.Controller.ListController;

            var injector = angular.injector(['ng']);
            $q = injector.get("$q");
            $rootScope = injector.get("$rootScope");
        });

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

        it("requests details data when has 'name' in route params", function () {
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
    });
});

