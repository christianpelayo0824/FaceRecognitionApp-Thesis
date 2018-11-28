mainApp.controller('DeepLearningController', function ($scope, $location) {
    $scope.redirectToHome = function () {
        $location.path('/landingPage');
    }
});