mainApp.controller('RecognizeController', function ($scope, $location) {
    $scope.redirectToHome = function () {
        $location.path('/landingPage');
        console.log('Hit')
    }

});