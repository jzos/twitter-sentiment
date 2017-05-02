(function () {
    'use strict';

    angular
        .module('app')
        .controller('PublishController', PublishController);

    PublishController.$inject = ['UserService', '$rootScope','D3Graphs', 'RequestAPI','$scope',"$timeout","Utilities","$http"];
    function PublishController(UserService, $rootScope, D3Graphs, RequestAPI, $scope, $timeout,Utilities,$http) {

        $scope.user = {};


        //alert($("#create-dashboard-section").html());


        /*$scope.submitForm = function() {
            // Posting data to php file
            $http({
                method  : 'POST',
                url     : 'localhost:5005/api/twitter-publish',
                data    : $scope.user, //forms user object
                headers : {'Content-Type': 'application/x-www-form-urlencoded'}
            }).success(function(data) {
                    if (data.errors) {
                        // Showing errors.
                        $scope.errorName = data.errors.name;
                        $scope.errorUserName = data.errors.username;
                        $scope.errorEmail = data.errors.email;
                    } else {
                        $scope.message = data.message;
                    }
                });
        };*/


        //$scope.submitForm = function(){

           /* var formData = $scope.user.form;
            $.post("localhost:5005/api/twitter-publish", formData).done(function(data){
                alert(data);
            });*/
/*

            var formElement = document.querySelector("form");

            $http({
                method: 'POST',
                url: 'http://localhost:5005/api/twitter-publish',
                headers: {'Content-Type': undefined},
                data: serializeData(new FormData(formElement))
            })
                .success(function (data) {

                })
                .error(function (data, status) {

                });
*/






        //}




/*


        $scope.submitForm = function(){

            $http({
                method: 'POST',
                url: 'http://localhost:5005/api/twitter-publish',
                data: $scope.user,
                headers: {'Content-Type': false},
                transformRequest: function(obj) {
                    var formData = new FormData();
                    angular.forEach(obj, function (value, key) {
                        formData.append(key, value);
                    });
                    return formData;
                }
            })

        }
*/


        $scope.getFileDetails = function (e) {

            $scope.files = [];
            $scope.$apply(function () {

                // STORE THE FILE OBJECT IN AN ARRAY.
                for (var i = 0; i < e.files.length; i++) {
                    $scope.files.push(e.files[i])
                }

            });
        };



        $scope.submitForm = function()
        {


            //FILL FormData WITH FILE DETAILS.
            /*var data = new FormData();

            for (var i in $scope.files) {
                data.append("uploadedFile", $scope.files[i]);
            }

            data.append("title", $scope.user.title);
            data.append("content", $scope.user.content);*/


            /*var formElement = document.querySelector("form");


            // ADD LISTENERS.
            var objXhr = new XMLHttpRequest();
            objXhr.addEventListener("progress", updateProgress, false);
            objXhr.addEventListener("load", transferComplete, false);


            // SEND FILE DETAILS TO THE API.
            objXhr.open("POST", "http://localhost:5005/api/twitter-publish");
            objXhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

            //objXhr.setRequestHeader("Content-type", "multipart/form-data");
            objXhr.send(new FormData(formElement));
            //objXhr.send(data);



            // UPDATE PROGRESS BAR.
            function updateProgress(e) {
                if (e.lengthComputable) {
                    document.getElementById('pro').setAttribute('value', e.loaded);
                    document.getElementById('pro').setAttribute('max', e.total);
                }
            }

            // CONFIRMATION.
            function transferComplete(e) {
                console.log("Files uploaded successfully.");
            }*/


            //// THE LATEST //////

            var formElement = document.querySelector("form");

            $.ajax({
                url: "http://localhost:5005/api/twitter-publish",
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