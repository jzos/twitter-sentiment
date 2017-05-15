
(function () {
    'use strict';

    angular
        .module('app')
        .controller('FiltersController', FiltersController);

    FiltersController.$inject = ['$rootScope'];
    function FiltersController($rootScope) {
        var vm = this;

        initController();

        function initController() {

            $("#rightNav-section .filtersNav").height(($( document ).height())-75);

            $( window ).resize(function() {
                $("#rightNav-section .filtersNav").height(($( document ).height())-75);
            });
        }

        function someFunction(id) {
        }
    }


})();
