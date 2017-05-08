(function () {
    'use strict';

    angular
        .module('app', [
            'ngRoute',
            'ngCookies',
            'utils.d3graphs',
            'utils.requestAPI',
            'utils.utilities'
        ])
        .config(config)
        // This gets rid of the #!, hashtag and bang, in the URL and allows pretty print URLs

        .config(['$locationProvider', function($locationProvider) {
            $locationProvider.hashPrefix('');
            //$locationProvider.html5Mode(true);

        }])
        .run(run)
        .controller('MainCtrl', ['$scope','$rootScope', MainCtrl]);


    config.$inject = ['$routeProvider', '$locationProvider'];

    function MainCtrl($scope, $log) {
        $scope.setActivePage = function(name) {
            $scope.activePage = name;
        };
    }

    function config($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                controller: 'CreateDashboardController',
                templateUrl: '/app/create-dashboard/createDashboard.view.html',
                controllerAs: 'vm'
            })

            .when('/login', {
                controller: 'LoginController',
                templateUrl: '/app/login/login.view.html',
                controllerAs: 'vm'
            })

            .when('/register', {
                controller: 'RegisterController',
                templateUrl: '/app/register/register.view.html',
                controllerAs: 'vm'
            })

            .when('/marketing', {
                controller: 'MarketingController',
                templateUrl: '/app/marketing-dashboard/marketing.view.html',
                controllerAs: 'vm'
            })

            .when('/customer-service', {
                controller: 'CustomerServiceController',
                templateUrl: '/app/customer-service/customerService.view.html',
                controllerAs: 'vm'
            })
            .when('/publish', {
                controller: 'PublishController',
                templateUrl: '/app/publish/publish.view.html',
                controllerAs: 'vm'
            })

            .otherwise({ redirectTo: '/login' });


    }

    run.$inject = ['$rootScope', '$location', '$cookieStore', '$http'];




    function run($rootScope, $location, $cookieStore, $http) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        }

        $rootScope.hostname =  window.location.hostname;

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in and trying to access a restricted page
            var restrictedPage = $.inArray($location.path(), ['/login', '/register']) === -1;
            var loggedIn = $rootScope.globals.currentUser;
            if (restrictedPage && !loggedIn) {
                $location.path('/login');
            }
        });
    }





})();