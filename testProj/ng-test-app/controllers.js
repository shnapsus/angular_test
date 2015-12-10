
var App = App || {};
var controllers = (App.Controller = App.Controller || {});

controllers.ListController = function ($scope, $routeParams, DataService) {
    $scope.autocompleteData = [
        { value: 10, text: "Alaska" },
        { value: 11, text: "Canada" },
        { value: 12, text: "NY" },
        { value: 13, text: "Kyiv" },
        { value: 14, text: "Budapest" }
    ];

    $scope.selected = function(item) {
        console.log("Got item in controller", item);
    }

    if ($routeParams.name) {
        return DataService.letterDetails($routeParams)
            .then(function (response) { $scope.letter = response.data; });
    } else {
        return DataService.letterList()
            .then(function (response) { $scope.items = response.data; });
    }
}

//controllers.DetailsController = function ($scope, DataService) {
//    console.log("inside DetailsController");
//    var request = DataService.letterDetails("C");
//    request.success(function (data) {
//        $scope.items = data;
//    });
//}
