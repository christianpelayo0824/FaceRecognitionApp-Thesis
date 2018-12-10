mainApp.controller('AddFacesThreeController', function ($scope, $location, EmployeeInformationService) {

    $scope.datasetProgress = '';
    $scope.progressLabel = '';

    // Getter data receiver
    $scope.emp = {
        employeeid: EmployeeInformationService.getEmployee().employeeid,
        firstname: EmployeeInformationService.getEmployee().firstname,
        lastname: EmployeeInformationService.getEmployee().lastname,
        phone: EmployeeInformationService.getEmployee().phone,
        email: EmployeeInformationService.getEmployee().email,
        department: EmployeeInformationService.getEmployee().department,
        position: EmployeeInformationService.getEmployee().position
    }

    // -  Bind Electron js with python using python-shell js library 
    //  - Call python script
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

                if (ob.imageCounter == 2) {
                    swal({
                        title: 'Success',
                        text: ob.imageCounter + " dataset has been created",
                        icon: 'success',
                        button: 'Done'
                    }).then(function () {
                        // Call createCareerProfile funtion from services
                        EmployeeInformationService.createCareerProfile($scope.emp).
                            then(function (response) {
                                if (response.status == 200) {
                                    var ob = {}
                                    ob = undefined
                                    EmployeeInformationService.setEmployee(ob);
                                    window.location.href = '#!/landingPage';
                                }
                            });
                    })
                }
            }
        });
        $scope.datasetProgress = 'Creating Dataset...'
    };

    // Redirecto to addfacestwo page
    $scope.backButton = function () {
        $location.path('/addfacestwo')
    }

    // Redirecto to landingpage
    $scope.redirectToHome = function () {
        $location.path('/landingPage')
    };

    // Bind python data with progress bar - function
    function progressBarStatus(id, status) {
        var e = document.getElementById(id);
        // status = (status / 20) * 100;
        status = (status / 2) * 100;
        e.style.width = status + '%';
    }
});