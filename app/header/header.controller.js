
(function () {
    'use strict';

    angular
        .module('app')
        .controller('HeaderController', HeaderController);

    HeaderController.$inject = ['$rootScope'];
    function HeaderController($rootScope) {
        var vm = this;

        initController();

        function initController() {

        }

        function someFunction(id) {
        }
    }


})();
