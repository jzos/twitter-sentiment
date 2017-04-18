(function () {
    'use strict';

    angular
        .module('app')
        .controller('CustomerServiceController', CustomerServiceController);

    CustomerServiceController.$inject = ['UserService', '$rootScope','D3Graphs', 'RequestAPI','$http'];
    function CustomerServiceController(UserService, $rootScope, D3Graphs, RequestAPI, $http) {


        initController();

        function populateComplaintStream(data)
        {
            console.log(data);
        }

        function initController() {
            //loadComplaintStream();
        }

        function test(data)
        {
            console.log(data);
        }

        RequestAPI.loadURL("http://localhost:5005/api/complaint-stream", populateComplaintStream, test);

        /*
        $.ajax({
            url: 'http://localhost:5005/api/complaint-stream',
            data: "",
            dataType: 'jsonp',
            jsonp: 'callback',
            jsonpCallback: 'jsonpCallback',
            success: function(data){
                test(data);
            },
            error: function(error){
                console.log("error: " + error);
            }
        });
        */






    }

})();