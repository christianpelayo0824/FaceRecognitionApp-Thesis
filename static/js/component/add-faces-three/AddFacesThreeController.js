mainApp.controller('AddFacesThreeController', function ($scope, $location) {
    $scope.redirectToHome = function () {
        $location.path('/landingPage')
    };
});