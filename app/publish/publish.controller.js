(function () {
    'use strict';

    angular
        .module('app')
        .controller('PublishController', PublishController);

    PublishController.$inject = ['UserService', '$rootScope','D3Graphs', 'RequestAPI','$scope',"$timeout","Utilities","$http","$route"];
    function PublishController(UserService, $rootScope, D3Graphs, RequestAPI, $scope, $timeout,Utilities,$http, $route) {


        $("#success-message").hide();

        function showSuccessMessage()
        {
            $("#success-message").show();
        }

        $scope.submitForm = function()
        {

            var formElement = document.querySelector("form");

            /** TODO : Put this in the requestAPI.js file **/

            $.ajax({
                url: "http://localhost:5006/api/twitter-publish",
                type: "POST",
                data: new FormData(formElement),
                processData: false,  // tell jQuery not to process the data
                //contentType: "application/x-www-form-urlencoded",   // tell jQuery not to set contentType
                contentType: false,   // tell jQuery not to set contentType
                success: function(data){

                    showSuccessMessage();
                },
                error: function(error){
                    console.log(error);
                }
            });

        }




        $scope.clearPage = function()
        {
            $route.reload();
        }








    }

})();