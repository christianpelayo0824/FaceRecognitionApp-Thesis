mainApp.controller('AddFacesController', function ($scope, $location, EmployeeInformationService) {

    if (EmployeeInformationService.getEmployee() != undefined) {
        $scope.emp = {
            employeeid: EmployeeInformationService.getEmployee().employeeid,
            firstname: EmployeeInformationService.getEmployee().firstname,
            lastname: EmployeeInformationService.getEmployee().lastname,
            phone: EmployeeInformationService.getEmployee().phone,
            email: EmployeeInformationService.getEmployee().email,
            department: EmployeeInformationService.getEmployee().department,
            position: EmployeeInformationService.getEmployee().position
        }
    }

    $scope.nextButton = function (data) {
        if (data.employeeid != undefined &&
            data.firstname != undefined &&
            data.lastname != undefined &&
            data.phone != undefined &&
            data.email != undefined && 
            data.employeeid != "" &&
            data.firstname != "" &&
            data.lastname != "" &&
            data.phone != "" &&
            data.email != "") {
            EmployeeInformationService.setEmployee(data);
            $location.path('/addfacestwo')
        } else {
            console.log('Error')
        }
    };

    $scope.redirectToHome = function () {
        $location.path('/landingPage')
    };

});