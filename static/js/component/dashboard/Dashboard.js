mainApp.controller('DashboardController', function ($scope, EmployeeInformationService) {

    test = function () {
        console.log('hit');
        EmployeeInformationService.getAllCareerProfile()
            .then(function (response) {
                var dataObject = JSON.stringify(response.data);
                $scope.employee = [];
                $scope.employee = response.data;
            })
    }

    test();
});