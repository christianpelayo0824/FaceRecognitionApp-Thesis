mainApp.controller('AddFacesController', function ($scope, $location) {
    $scope.redirectToHome = function () {
        $location.path('/landingPage')
    };

    $scope.test = function () {

        var python = require('python-shell');
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


        // var options = {
        //     mode: 'json',
        //     encoding: 'utf8',
        //     pythonOptions: ['-u'],
        //     scriptPath: './engine/',
        //     args: ['test', 'sample', 'test'],
        //     pathonPath: '/usr/bin/python3.5'
        // };

        // var py = new python.PythonShell('test.py', options)
        // py.on('message', function(message) {
        //     console.log(message)
        // })
    };

    $scope.feed = function () {
        console.log('hit');
        var video = document.getElementById('video'),
            vendorlUrl = window.URL || window.webkitURL;

        navigator.getMedia = navigator.getUserMedia ||
            navigator.webkitGeUserMedia ||
            navigator.mozGetUserMedia ||
            navigator.msGetUserMeida;


        // Capture
        navigator.getMedia({
            video : true,
            audio: false
        }, function(stream) {
            video.src = vendorlUrl.createObjectURL(stream)
            video.play()
        }, function(error){
            console.log(error)
        })
        




    };
});