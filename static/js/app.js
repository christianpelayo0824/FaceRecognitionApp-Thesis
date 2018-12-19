var mainApp = angular.module('mainApp', ['ngRoute', 'ngAnimate'])

mainApp.config(['$routeProvider', function ($routeProvider) {

    $routeProvider.
        when('/landingPage', {
            templateUrl: '../static/js/component/landing-page/landingpage.html',
            controller: 'LandingPageController'
        }).
        when('/dashboard', {
            templateUrl: '../static/js/component/dashboard/dashboard.html',
            controller: 'DashboardController'
        }).
        when('/service', {
            templateUrl: '../static/js/component/service/service.html',
            controller: 'ServiceController'
        }).
        when('/addfaces', {
            templateUrl: '../static/js/component/add-faces/addfaces.html',
            controller: 'AddFacesController'
        }).
        when('/addfacestwo', {
            templateUrl: '../static/js/component/add-faces-two/addfacestwo.html',
            controller: 'AddFacesTwoController'
        }).
        when('/addfacesthree', {
            templateUrl: '../static/js/component/add-faces-three/addfacesthree.html',
            controller: 'AddFacesThreeController'
        }).
        when('/data', {
            templateUrl: '../static/js/component/data-page/data.html',
            controller: 'DataController'
        }).
        when('/form', {
            templateUrl: '../static/js/component/form/form.html',
            controller: 'FormController'
        }).
        otherwise({
            redirectTo: '/landingPage'
        });
}]);