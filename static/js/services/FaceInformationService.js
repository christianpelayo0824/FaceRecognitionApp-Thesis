mainApp.service('EmployeeInformationService', function () {

    // var employee = {
    //     content: ''
    // };



    this.setEmployee = function(emp) {
        this.employee = {
            employeeid: emp.employeeid,
            firstname: emp.firstname
        }
    }

    this.getEmployee = function() {
        return this.employee;
    }
});