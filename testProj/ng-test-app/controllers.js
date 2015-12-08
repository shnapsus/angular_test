
var App = App || {};
var controllers = (App.Controller = App.Controller || {});

controllers.ListController = function ($scope, $routeParams, DataService) {
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
