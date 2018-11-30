mainApp.controller('AddFacesThreeController', function ($scope, $location, EmployeeInformationService) {


    $scope.emp = {
        employeeid: EmployeeInformationService.getEmployee().employeeid,
        firstname: EmployeeInformationService.getEmployee().firstname,
        lastname: EmployeeInformationService.getEmployee().lastname,
        phone: EmployeeInformationService.getEmployee().phone,
        email: EmployeeInformationService.getEmployee().email,
        department: EmployeeInformationService.getEmployee().department,
        position: EmployeeInformationService.getEmployee().position
    }

    $scope.test = function () {

        var python = require('python-shell');
        console.log(python);
        var options = {
            mode: 'json',
            encoding: 'utf8',
            pythonOptions: ['-u'],
            scriptPath: './engine/',
            args: [EmployeeInformationService.getEmployee().firstname],
            pathonPath: '/usr/bin/python3.5'
        };

        var py = new python.PythonShell('dataset_creator.py', options);

        py.on('message', function (message) {
            var data = JSON.stringify(message)
            var ob = JSON.parse(data)
            console.log(ob)
            if (ob.message) {
                swal("Warning!", ob.message , "warning");
            }
        });
    };

    $scope.backButton = function () {
        console.log($scope.emp);
        $location.path('/addfacestwo')
    }

    $scope.redirectToHome = function () {
        $location.path('/landingPage')
    };
});