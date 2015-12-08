
var App = App || {};
var plugins = (App.Directive = App.Directive || {});

plugins.AutoComplete = function () {
    return {
        restrict: "A",

    }
}
plugins.Breadcrumbs = function () {
    return {
        restrict: "E",
        templateUrl: "breadcrumb-template.html"
    }
}
