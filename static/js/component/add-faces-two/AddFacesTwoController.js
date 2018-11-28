mainApp.controller('AddFacesTwoController', function ($scope, $location) {
    $scope.redirectToHome = function () {
        $location.path('/landingPage')
    };
});