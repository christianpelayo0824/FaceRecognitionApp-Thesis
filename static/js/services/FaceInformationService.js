mainApp.service('EmployeeInformationService', function () {

    this.setEmployee = function (data) {
        this.employee = {
            employeeid: data.employeeid,
            firstname: data.firstname,
            lastname: data.lastname,
            phone: data.phone,
            email: data.email,
            department: data.department,
            position: data.position
        }
    }

    this.getEmployee = function () {
        return this.employee;
    }
});