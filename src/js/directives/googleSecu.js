app.directive('googleAuto' ,['googleApis'  ,'$window', '$location',function(googleApis,$window,$location){

    this.ctrl = function(){
        var ga = this;

        ga.gAPI = googleApis;
        ga.isReady=false;

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


        ga.checkIfInitReady = function(){
            return $window.isInitReady;
        }

        ga.getPopup = function(){
            ga.getAutorization(false);
        };
    };

    return {
        controller: this.ctrl,
        controllerAs: 'ga',
        templateUrl: '../../templates/google-auto.html'
    };
}]);