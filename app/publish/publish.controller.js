(function () {
    'use strict';

    angular
        .module('app')
        .controller('PublishController', PublishController);

    PublishController.$inject = ['UserService', '$rootScope','D3Graphs', 'RequestAPI','$scope',"$timeout","Utilities"];
    function PublishController(UserService, $rootScope, D3Graphs, RequestAPI, $scope, $timeout,Utilities) {

        var vm = this;

        vm.login = login;



        function login() {
            console.log("jaime");
        };












    }

})();