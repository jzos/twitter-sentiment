(function () {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['UserService', '$rootScope','D3Graphs'];
    function HomeController(UserService, $rootScope, D3Graphs) {
        var vm = this;

        vm.user = null;
        vm.allUsers = [];
        vm.deleteUser = deleteUser;

        initController();

        D3Graphs.piechart("#piechart");
        D3Graphs.barchart("#piechart2");
        D3Graphs.linegraph("#linechart");


        /* Global Function
        $rootScope.checkUsers = function() {
            console.log("vm.allUsers");
        };
        */

        function initController() {
            loadCurrentUser();
            loadAllUsers();
        }

        function loadCurrentUser() {
            UserService.GetByUsername($rootScope.globals.currentUser.username)
                .then(function (user) {
                    vm.user = user;
                });
        }

        function loadAllUsers() {
            UserService.GetAll()
                .then(function (users) {
                    vm.allUsers = users;
                });
        }

        function deleteUser(id) {
            UserService.Delete(id)
                .then(function () {
                    loadAllUsers();
                });
        }


    }

})();