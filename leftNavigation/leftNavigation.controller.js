
(function () {
    'use strict';

    angular
        .module('app')
        .controller('LeftNavigationController', LeftNavigationController);

    LeftNavigationController.$inject = ['$rootScope'];
    function LeftNavigationController($rootScope) {
        var vm = this;

        //vm.someFunction = someFunction;

        console.log("resize");

        initController();

        function initController() {
            $( window ).resize(function() {
                //$( "#log" ).append( "<div>Handler for .resize() called.</div>" );
                console.log("resize");
            });

            console.log("resize");
        }

        function someFunction(id) {
        }
    }


})();
