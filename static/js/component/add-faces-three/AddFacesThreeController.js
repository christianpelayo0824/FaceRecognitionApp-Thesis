mainApp.controller('AddFacesThreeController', function ($scope, $location) {
    $scope.redirectToHome = function () {
        $location.path('/landingPage')
    };


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
});