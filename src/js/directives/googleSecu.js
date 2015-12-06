app.directive('googleAuto' ,['googleApis'  ,'$window', '$location',function(googleApis,$window,$location){

    this.ctrl = function(){
        var ga = this;

        ga.gAPI = googleApis;
        ga.isReady=false;

        ga.getAutorization = function(avoidPopup){

            var autoPromise = googleApis.authorization(avoidPopup);

            if (autoPromise) {
                autoPromise.then(function (aresult) {
                    console.log("Success Login!");
                    ga.gAPI.getList();
                    ga.gAPI.isConnected = true;
                    console.log($location.path());
                    $location.path("/");
                    console.log($location.path());
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