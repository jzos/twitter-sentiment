(function () {
    'use strict';

    angular
        .module('app')
        .controller('PublishController', PublishController);

    PublishController.$inject = ['UserService', '$rootScope','D3Graphs', 'RequestAPI','$scope',"$timeout","Utilities","$http"];
    function PublishController(UserService, $rootScope, D3Graphs, RequestAPI, $scope, $timeout,Utilities,$http) {

        $scope.submitForm = function()
        {

            var formElement = document.querySelector("form");

            $.ajax({
                url: "http://localhost:5006/api/twitter-publish",
                type: "POST",
                data: new FormData(formElement),
                processData: false,  // tell jQuery not to process the data
                //contentType: "application/x-www-form-urlencoded",   // tell jQuery not to set contentType
                contentType: false,   // tell jQuery not to set contentType
                success: function(data){
                    console.log(data);
                },
                error: function(error){
                    console.log(error);
                }
            });

        }








    }

})();