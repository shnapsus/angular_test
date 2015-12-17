
var App = App || {};
var controllers = (App.Controller = App.Controller || {});

controllers.ListController = function ($routeParams, DataService) {
    var vm = this;

    vm.autocompleteData = [
        { value: 10, text: "Alaska" },
        { value: 11, text: "Canada" },
        { value: 12, text: "NY" },
        { value: 13, text: "Kyiv" },
        { value: 14, text: "Budapest" }
    ];

    vm.selected = function(item) {
        console.log("Got item in controller", item);
    }

    if ($routeParams.name) {
        DataService.letterDetails($routeParams)
            .then(function (response) { vm.letter = response.data; });
    } else {
        DataService.letterList()
            .then(function (response) { vm.items = response.data; });
    }
}

//controllers.DetailsController = function ($scope, DataService) {
//    console.log("inside DetailsController");
//    var request = DataService.letterDetails("C");
//    request.success(function (data) {
//        $scope.items = data;
//    });
//}
