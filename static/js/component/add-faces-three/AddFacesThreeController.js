mainApp.controller('AddFacesThreeController', function ($scope, $location, EmployeeInformationService) {

    $scope.datasetProgress = ''

    $scope.emp = {
        employeeid: EmployeeInformationService.getEmployee().employeeid,
        firstname: EmployeeInformationService.getEmployee().firstname,
        lastname: EmployeeInformationService.getEmployee().lastname,
        phone: EmployeeInformationService.getEmployee().phone,
        email: EmployeeInformationService.getEmployee().email,
        department: EmployeeInformationService.getEmployee().department,
        position: EmployeeInformationService.getEmployee().position
    }

    $scope.createDataset = function () {


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

        var imageCounter = '';
        py.on('message', function (message) {
            var data = JSON.stringify(message)
            var ob = JSON.parse(data)
            console.log(ob)
            if (ob.message) {
                swal({
                    title: 'Ooopss!',
                    text: ob.message,
                    icon: 'warning',
                    button: true
                })
            } else {
                imageCounter = ob.imageCounter;
                progressBarStatus('progress-bar-status', imageCounter)
                if (ob.imageCounter == 20) {
                    swal({
                        title: 'Success',
                        text: ob.imageCounter + " dataset has been created",
                        icon: 'success',
                        button: 'Done'
                    })
                }
            }
        });
        $scope.datasetProgress = 'Creating Dataset...'

    };

    $scope.backButton = function () {
        console.log($scope.emp);
        $location.path('/addfacestwo')
    }

    $scope.redirectToHome = function () {
        $location.path('/landingPage')
    };

    function progressBarStatus(id, status) {
        var e = document.getElementById(id);
        status = (status / 20) * 100;
        console.log(status);
        e.style.width = status + '%';
    }

});