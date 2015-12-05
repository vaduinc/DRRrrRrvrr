app.directive('googleAuto' ,['googleApis' , '$rootScope' ,'$window', function(googleApis,$rootScope,$window){

    this.ctrl = function(){
        var ga = this;

        ga.isReady=false;

        ga.getAutorization = function(avoidPopup){

            if (!ga.isReady){

                var autoPromise = googleApis.authorization(avoidPopup)

                if (autoPromise) {
                    autoPromise.then(function (aresult) {
                        console.log("Success Login!");
                        ga.isReady = true;
                        googleApis.autoChecking = false;
                        $rootScope.$apply();
                    }, function (aresult) {
                        console.log("Something failed when trying to login " + aresult.error());
                        ga.isReady = false;
                        googleApis.autoChecking = false;
                    });
                }
                else{
                    googleApis.autoChecking = false;
                }
            }
        };


        ga.checkIfInitReady = function(){
            return $window.isInitReady;
        }

        ga.isAutoReady = function(){
            if (ga.checkIfInitReady() && googleApis.isThereAToken()){
                ga.isReady = true;
            }

            return ga.isReady;
        }

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