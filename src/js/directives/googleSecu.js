/**
 * Directive in charge of checking whether the end User has signed-in previously or not.
 * It has the click event to sign in every time the user gets into the web app the
 * first time.
 * It also checks whether the Google API is already loaded.
 *
 */

app.directive('googleAuto' ,['googleApis'  ,'$window', '$location',function(googleApis,$window,$location){

    this.ctrl = function(){
        var ga = this;

        ga.gAPI = googleApis;
        ga.isReady=false;

        /**
         * Check whether the client is signed-in or not.
         * If not then the application will popup a window asking the user
         * for his/her Google credentials.
         *
         * @param avoidPopup true/false to pop up window to ask for user
         *          credentials.
         */
        ga.getAutorization = function(avoidPopup){

            var autoPromise = googleApis.authorization(avoidPopup);

            if (autoPromise) {
                autoPromise.then(function (aresult) {
                    ga.gAPI.getList();
                    ga.gAPI.isConnected = true;
                    $location.path("/"); // TODO dirty trick, since rendering list did not work.
                    console.log("Success Login!");
                }, function (aresult) {
                    console.log("Something failed when trying to login " + aresult.error());
                    ga.gAPI.isConnected = false;
                });
            }

        };


        /**
         * Flag to check if the client Google API is already loaded
         * @returns {*}
         */
        ga.checkIfInitReady = function(){
            return $window.isInitReady;
        }

        /**
         * Calls the authorization functionality every time the end user click on
         * the UI button
         */
        ga.getPopup = function(){
            ga.getAutorization(false);
        };
    };

    return {
        controller: this.ctrl,
        controllerAs: 'ga',
        templateUrl: 'templates/google-auto.html'
    };
}]);