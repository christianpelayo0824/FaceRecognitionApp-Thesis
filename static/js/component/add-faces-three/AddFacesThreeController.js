mainApp.controller('AddFacesThreeController', function ($scope, $location, EmployeeInformationService) {

    $scope.datasetProgress = '';
    $scope.progressLabel = '';

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
                swal({
                    title: 'Ooopss!',
                    text: ob.message,
                    icon: 'warning',
                    button: 'OK'
                });
            } else {
                progressBarStatus('progress-bar-status', ob.imageCounter);
                // if (ob.imageCounter == 5) {
                if (ob.imageCounter == 25) {
                    swal({
                        title: 'Success',
                        text: ob.imageCounter + " dataset has been created",
                        icon: 'success',
                        button: 'Done'
                    }).then(function () {
                        console.log('Hit');
                        window.location.href = '#!/landingPage';
                        $scope.emp = null;
                    })
                }
            }
        });
        $scope.datasetProgress = 'Creating Dataset...'
    };

    $scope.backButton = function () {
        $location.path('/addfacestwo')
    }

    $scope.redirectToHome = function () {
        $location.path('/landingPage')
    };

    function progressBarStatus(id, status) {
        var e = document.getElementById(id);
        // status = (status / 5) * 100;
        status = (status / 25) * 100;
        e.style.width = status + '%';
    }
});