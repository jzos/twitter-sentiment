
(function () {
    'use strict';

    angular
        .module('app')
        .controller('BookmarksController', BookmarksController);

    BookmarksController.$inject = ['$rootScope'];
    function BookmarksController($rootScope) {
        var vm = this;

        initController();

        function initController() {

            $("#rightNav-section .leftNavigationPage").height(($( window ).height())-75);

            $( window ).resize(function() {
                $("#rightNav-section .leftNavigationPage").height(($( window ).height())-75);
            });
        }

        function someFunction(id) {
        }
    }


})();
