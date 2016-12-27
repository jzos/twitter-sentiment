
(function () {
    'use strict';

    angular
        .module('app')
        .controller('LeftNavigationController', LeftNavigationController);

    LeftNavigationController.$inject = ['$rootScope'];
    function LeftNavigationController($rootScope) {
        var vm = this;

        initController();

        function initController() {

            $("#leftNav-section .leftNavigationPage").height(($( window ).height())-75);

            $( window ).resize(function() {
                $("#leftNav-section .leftNavigationPage").height(($( window ).height())-75);
            });
        }

        function someFunction(id) {
        }
    }


})();
