/// <reference path="~/libraries/angular/angular.js"/>
/// <reference path="~/libraries/angular/angular-route.js"/>
/// <reference path="~/libraries/jasmine/jasmine.js"/>
/// <reference path="~/libraries/jasmine/jasmine-html.js"/>
/// <reference path="~/libraries/jasmine/boot.js"/>
/// <reference path="~/libraries/angular/angular-mocks.js"/>

/// <reference path="~/ng-test-app/app.js"/>
/// <reference path="~/ng-test-app/controllers.js"/>
/// <reference path="~/ng-test-app/dataService.js"/>
/// <reference path="~/ng-test-app/directives.js"/>
/// <reference path="~/ng-test-app/filters.js"/>
/// <reference path="~/ng-test-app/router.js"/>

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
   
    describe("Fucking filter", function () {
        it("is registered", function () {
            var $filter = angular.injector(["ng", "TestFilters"]).get("$filter");

            var lambda = function() { return $filter('Fucking') };

            expect(lambda).not.toThrow();
            expect(lambda()).toBeDefined();
            expect(lambda()).not.toBeNull();
            expect(typeof lambda()).toEqual('function');
        });

        it("adds Fucking to input string", function () {
            var filter = App.FuckingFilter();
            var result = filter("angular");

            expect(result).toEqual("Fucking angular!");
        });
    });
});



describe("Controllers", function () {
    'use strict';

    describe("ListController", function () {
        it("is registered", function () {
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
            expect(lambda()).not.toBeNull();
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



describe("Directives", function() {
    'use strict';

    describe("AutoComplete", function() {
        var _directive;

        beforeEach(function() {
            _directive = App.Directive.AutoComplete;
        });

        //it("is registered", function() {
        //    var $directive = angular.injector(["ng", "TestDirectives"]).get("$directive");

        //    var lambda = function () { return $directive('AutoComplete') };

        //    expect(lambda).not.toThrow();
        //    expect(lambda()).toBeDefined();
        //    expect(lambda()).not.toBeNull();
        //    expect(typeof lambda()).toEqual('function');
        //});

        it("is an element directive", function () {
            var result = _directive();
            expect(result.restrict).toEqual("E");
        });

        it("replaces the element", function () {
            var result = _directive();
            expect(result.replace).toBeTruthy();
        });

        it("gets array from 'data' attribute", function () {
            var result = _directive();
            expect(result.scope.items).toEqual("=data");
        });
        
        it("gets 'text' field name from attribute", function () {
            var result = _directive();
            expect(result.scope.textField).toEqual("@");
        });

        it("gets 'value' field name from attribute", function () {
            var result = _directive();
            expect(result.scope.valueField).toEqual("@");
        });

        it("gets 'onSelect' callback", function () {
            var result = _directive();
            expect(result.scope.callback).toEqual("&onSelect");
        });

        describe("behaviors:", function() {
            var $compile, $rootScope, $document;

            beforeEach(function () {
                Application.start("A");
                module('TestDirectives');
            });

            beforeEach(inject([
                '$compile', '$rootScope', '$document', function($c, $r, $d) {
                    $compile = $c;
                    $rootScope = $r;
                    $document = $d;
                }]
            ));

            it("scope gets data from html", function () {
                var scope = $rootScope.$new();
                var testData = [{ name: "A", id: 1 }, { name: "B", id: 2 }];
                scope.autocompleteData = testData;

                var html = '<auto-complete data="autocompleteData" text-field="name" value-field="id" on-select="selected(item)"></auto-complete>';
                var element = $compile(html)(scope);

                //scope.$digest();
                var isolateScope = element.isolateScope();

                expect(isolateScope).not.toBeNull();
                expect(isolateScope).not.toBeUndefined();
                expect(isolateScope.items).toEqual(testData);
                expect(isolateScope.valueField).toEqual("id");
                expect(isolateScope.textField).toEqual("name");
                expect(typeof isolateScope.callback).toEqual("function");
            });


            function getCompiledElement(scope) {
                var html = '<auto-complete data="autocompleteData" text-field="text" value-field="value" on-select="selected(item)"></auto-complete>';
                var element = $compile(html)(scope);
                scope.$digest();
                return element;
            }
            
            it("renders elements count same as data passed", function () {
                //module("TestDirectives");

                //var $compile = angular.injector(["ng"]).get("$compile");
                //var $rootScope = angular.injector(["ng"]).get("$rootScope");

                var scope = $rootScope.$new();
                scope.autocompleteData = [{ text: "A", value: 1 }, { text: "B", value: 2 }];
                var element = getCompiledElement(scope);

                expect(element.find('li').length).toEqual(2);
            });

            it("dropdown list is hidden by default", function () {
                var scope = $rootScope.$new();
                scope.autocompleteData = [{ text: "A", value: 1 }, { text: "B", value: 2 }];

                var element = getCompiledElement(scope);

                expect(element.find('ul').hasClass("ng-hide")).toBeTruthy();
            });

            it("dropdown list shows on click on input", function () {
                var scope = $rootScope.$new();
                scope.autocompleteData = [{ text: "A", value: 1 }, { text: "B", value: 2 }];

                var element = getCompiledElement(scope);

                element.find("input").triggerHandler("click");
                expect(element.find('ul').hasClass("ng-hide")).toBeFalsy();
            });

            it("dropdown list shows when start typing", function () {
                var scope = $rootScope.$new();
                scope.autocompleteData = [{ text: "A", value: 1 }, { text: "B", value: 2 }];

                var element = getCompiledElement(scope);

                element.find("input").triggerHandler("keyup");
                expect(element.find('ul').hasClass("ng-hide")).toBeFalsy();
            });

            it("dropdown list hides on select", function () {
                var scope = $rootScope.$new();
                scope.autocompleteData = [{ text: "A", value: 1 }, { text: "B", value: 2 }];

                var element = getCompiledElement(scope);

                element.find("input").triggerHandler("click");
                angular.element(element.find("li")[0]).triggerHandler("click");
                
                expect(element.find('ul').hasClass("ng-hide")).toBeTruthy();
            });

            it("dropdown list hides when click outside", function () {
                var scope = $rootScope.$new();
                scope.autocompleteData = [{ text: "A", value: 1 }, { text: "B", value: 2 }];

                var element = getCompiledElement(scope);

                element.find("input").triggerHandler("click");
                $document.triggerHandler("click");
                
                expect(element.find('ul').hasClass("ng-hide")).toBeTruthy();
            });
            
            it("data filtered according to input", function () {
                var scope = $rootScope.$new();
                scope.autocompleteData = [{ text: "Alabama", value: 1 }, { text: "Canada", value: 2 }];
                
                var element = getCompiledElement(scope);
                
                element.isolateScope().userInput = "nada";
                scope.$apply();
                
                expect(element.find("li").length).toEqual(1);
                expect(element.find("li").html()).toEqual("Canada");
            });

            it("shows No results when no matches", function () {
                var scope = $rootScope.$new();
                scope.autocompleteData = [{ text: "Alabama", value: 1 }, { text: "Canada", value: 2 }];

                var element = getCompiledElement(scope);

                element.isolateScope().userInput = "xxx";
                scope.$apply();
                element.find("input").triggerHandler("click");

                var el = angular.element(element.find("ul")[1]);

                expect(el.hasClass("no-results")).toBeTruthy();
                expect(el.find("li").html()).toEqual("No results found");
            });
        });


    });
});