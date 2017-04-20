/**
 * Created by jaimemac on 4/19/17.
 */
(function() {
    'use strict';

    function Utilities() {
        return {

            watchBinding: function (sFunc, funcName, delay, scope, timeout) {

                var timeoutPromise;
                var delayInMs = delay;
                scope.$watch(sFunc, function(funcName) {
                    timeout.cancel(timeoutPromise);  //does nothing, if timeout alrdy done
                    timeoutPromise = timeout(function(){   //Set timeout
                        scope.loading = true;
                    },delayInMs);
                });
            }



        };
    }

    angular.module('utils.utilities', [])
        .factory('Utilities', Utilities);
})();
