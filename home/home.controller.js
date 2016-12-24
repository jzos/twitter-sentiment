function () {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController);

    LoginController.$inject = ['$location', 'AuthenticationService', 'FlashService'];
    function LeftNavigationController($location, AuthenticationService, FlashService) {
        var vm = this;

        (function initController() {


        })();

        function home() {

        };
    }

})();