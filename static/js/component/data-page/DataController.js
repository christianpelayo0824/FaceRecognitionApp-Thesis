mainApp.controller('DataController', function (EmployeeInformationService, $scope, $location, $interval) {

    // Gloabl Variables
    var globalEmployee = $scope.employee;

    $scope.getTempById = function (emp) {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this data!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    // Delete career profile using angular service - EmployeeInformationService
                    EmployeeInformationService.deleteCareerProfileById(emp.id)
                        .then(function (response) {
                            if (response.status == 200) {
                                swal("Poof! Your data has been deleted!", {
                                    icon: "success",
                                });
                                globalEmployee.splice(globalEmployee.indexOf(emp), 1)
                            }
                        })
                }
            });
    }

    $scope.redirectToHome = function () {
        $location.path('/landingPage');
    }

    // Function to display empoyee information in table form
    test = function () {
        console.log('hit');
        EmployeeInformationService.getAllCareerProfile()
            .then(function (response) {
                // console.log(response.data)
                if (response.data.length == 0) {
                    console.log('response')
                    swal({
                        title: "Oopss! Empty",
                        text: "Database is empty",
                        icon: "warning",
                        buttons: "OK",
                    })
                } else {
                    $scope.employee = response.data;
                    globalEmployee = response.data;
                }

            })
    }

    // Initialize function to get data every start load in this controller
    test();
})