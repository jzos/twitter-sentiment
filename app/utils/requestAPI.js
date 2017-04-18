(function() {
    'use strict';

    function RequestAPI() {
        return {

            loadURL: function (sURL, callback, callbackError) {
                $.ajax({
                    type: "GET",
                    url: sURL,
                    data: "",
                    dataType: 'jsonp',
                    jsonp: 'callback',
                    jsonpCallback: 'jsonpCallback',
                    success: function(data){
                        callback(data);
                    },
                    error: function(error){
                        callbackError(error);
                    }
                });
            }



        };
    }

    angular.module('utils.requestAPI', [])
        .factory('RequestAPI', RequestAPI);
})();
