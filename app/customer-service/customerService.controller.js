(function () {
    'use strict';

    angular
        .module('app')
        .controller('CustomerServiceController', CustomerServiceController);

    CustomerServiceController.$inject = ['UserService', '$rootScope','D3Graphs'];
    function CustomerServiceController(UserService, $rootScope, D3Graphs) {


        initController();

        D3Graphs.piechart("#piechart");
        D3Graphs.barchart("#barchart");
        D3Graphs.linegraph("#linechart");


        /* Global Function
        $rootScope.checkUsers = function() {
            console.log("vm.allUsers");
        };
        */

        function initController() {
            loadComplaintStream();
        }

        function loadComplaintStream()
        {

        }



    }

})();