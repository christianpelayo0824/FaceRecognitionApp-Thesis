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
            args: null,
            pathonPath: '/usr/bin/python3.5'
        };
        var py = new python.PythonShell('face_recognition.py', options);

        py.on('message', function (message) {
            var data = JSON.stringify(message)
            var ob = JSON.parse(data)
            console.log(ob)
        });
    };

    $scope.backButton = function() {
        $location.path('/addfacesthree')
    }

    $scope.redirectToHome = function () {
        $location.path('/landingPage')
    };
});