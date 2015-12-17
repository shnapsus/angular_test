
var App = App || {};
var plugins = (App.Directive = App.Directive || {});

plugins.AutoComplete = function ($document) {
    return {
        restrict: "E",
        replace: true,
        scope: {
            items: "=data",
            textField: "@",
            valueField: "@",
            callback: "&onSelect"
        },
        controllerAs: "vm",
        controller: function ($scope, $element) {
            //console.log("scope", $scope);
            var vm = this;
            vm.shouldShow = false;
            vm.selectedValue = "";
            vm.selectedText = "";

            vm.open = function($event) {
                //console.log("click", vm.shouldShow);
                $event.stopPropagation();
                vm.shouldShow = true;
            }
            vm.typing = function () {
                //console.log("typing");
                vm.shouldShow = true;
            }

            vm.selectItem = function (item) {
                //console.log("clicked", item, $scope.textField, $scope.valueField);
                vm.text = item[$scope.textField];
                vm.selectedValue = item[$scope.valueField];
                vm.shouldShow = false;

                $scope.callback({ item: item });
            }

            $scope.$watch(function() {
                return vm.shouldShow;
            }, function (newValue, oldValue) {
                //console.log("vm.shouldShow watcher");
                newValue ? $document.on("click", documentClick) : $document.off("click", documentClick);
            });
            
            //$document.on("click", documentClick);
            $scope.$on('$destroy', function () { $document.off("click", documentClick) });

            var documentClick = function (event) {
                //console.log("document click", vm.shouldShow);
                if (vm.shouldShow) {
                    var target = event.target;//angular.element(event.target);
                    if (!$element[0].contains(target)) { // || element[0] == target[0])) {
                        //console.log("closing");
                        $scope.$apply(function () { vm.shouldShow = false; });
                    }
                }
            };
        },
        templateUrl: "/ng-test-app/templates/autocomplete.html"
        //template1:
        //    "<div>" +
        //        "<input class='autocompleteinput' type='text' ng-model='userInput' ng-keyup='typing()' ng-click='typing()' ng-value='selectedText' data-id='{{ selectedValue }}' />" +
        //        "<ul ng-show='shouldShow'>" +
        //            "<li ng-click='selectItem(item)' ng-repeat='item in items | filter:userInput as results' data-id='{{ item[valueField] }}'>{{ item[textField] }}</li>" +
        //        "</ul>" +
        //        "<ul class='no-results' ng-if='results.length === 0 && shouldShow'>" +
        //            "<li data-id=''>No results found</li>" +
        //        "</ul>" +
        //    "</div>"
    }
}

plugins.Breadcrumbs = function () {
    return {
        restrict: "E",
        templateUrl: "breadcrumb-template.html"
    }
}
