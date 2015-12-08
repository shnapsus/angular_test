
var App = App || {};

App.FuckingFilter = function () {
    return function (input) {
        return "Fucking " + input + "!";
    }
}