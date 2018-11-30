mainApp.controller('AddFacesTwoController', function ($scope, $location, EmployeeInformationService) {


    $scope.emp = {
        department: EmployeeInformationService.getEmployee().department,
        position: EmployeeInformationService.getEmployee().position
    }

    $scope.backButton = function (data) {
        employeeObj = {
            employeeid: EmployeeInformationService.getEmployee().employeeid,
            firstname: EmployeeInformationService.getEmployee().firstname,
            lastname: EmployeeInformationService.getEmployee().lastname,
            phone: EmployeeInformationService.getEmployee().phone,
            email: EmployeeInformationService.getEmployee().email,
            department: data.department,
            position: data.position
        }
        EmployeeInformationService.setEmployee(employeeObj);
        $location.path('/addfaces');
    }

    $scope.nextButton = function (data) {
        employeeObj = {
            employeeid: EmployeeInformationService.getEmployee().employeeid,
            firstname: EmployeeInformationService.getEmployee().firstname,
            lastname: EmployeeInformationService.getEmployee().lastname,
            phone: EmployeeInformationService.getEmployee().phone,
            email: EmployeeInformationService.getEmployee().email,
            department: data.department,
            position: data.position
        }
        EmployeeInformationService.setEmployee(employeeObj);
        $location.path('/addfacesthree');
    }

    $scope.redirectToHome = function () {
        $location.path('/landingPage')
    };
});