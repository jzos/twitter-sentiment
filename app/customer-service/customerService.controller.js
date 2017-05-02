(function () {
    'use strict';

    angular
        .module('app')
        .controller('CustomerServiceController', CustomerServiceController);

    CustomerServiceController.$inject = ['UserService', '$rootScope','D3Graphs', 'RequestAPI','$scope',"$timeout","Utilities"];
    function CustomerServiceController(UserService, $rootScope, D3Graphs, RequestAPI, $scope, $timeout,Utilities) {

        initController();

        function initController()
        {
            loadComplaintStream();
        }

        function loadComplaintStream()
        {
            RequestAPI.loadURL("http://localhost:5005/api/complaint-stream", populateComplaintStream, failureCallback);
            Utilities.watchBinding("populateComplaintStream", populateComplaintStream, 3000, $scope, $timeout);
        }

        function populateComplaintStream(data)
        {
            console.log(data);
            $scope.items = data;
        }

        function failureCallback(data)
        {
            console.log("Error: " + data);
        }











    }

})();