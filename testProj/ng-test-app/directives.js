
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
        link: function (scope, element, attrs) {
            console.log("scope", scope);
            scope.shouldShow = false;
            scope.selectedValue = "";
            scope.selectedText = "";

            scope.typing = function () {
                console.log("click", scope.shouldShow);
                scope.shouldShow = true;
            }
            scope.blur = function () {
                //scope.shouldShow = false;
            }
            scope.selectItem = function (item) {
                //console.log("clicked", item);
                console.log("scope", scope);

                scope.selectedText = item[scope.textField];
                scope.selectedValue = item[scope.valueField];
                
                scope.callback({ item: item });
                scope.shouldShow = false;
            }

            var documentClick = function (event) {
                console.log("docclick", scope.shouldShow);
                if (scope.shouldShow) {
                    var target = event.target;//angular.element(event.target);
                    if (!element[0].contains(target)) { // || element[0] == target[0])) {
                        console.log("closing");
                        scope.$apply(function() { scope.shouldShow = false; });
                    }
                }
            };
            $document.on("click", documentClick);
            scope.$on('$destroy', function () { $document.off("click", documentClick) });
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
