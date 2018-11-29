mainApp.controller('AddFacesController', function ($scope, $location, EmployeeInformationService) {
    $scope.redirectToHome = function () {
        $location.path('/landingPage')
    };

    $scope.test1 = function(data) {
        console.log('Hit');
        EmployeeInformationService.setEmployee(data)
        console.log(EmployeeInformationService.getEmployee())
    };
});