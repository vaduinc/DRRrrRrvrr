var isInitReady = false;

var app = angular.module('routastic', ['ngRoute']);

//app.controller('TabController', ['$location', function($location){
//  //var tc = this;
//  //tc.active = function(path){
//  //  return !!$location.path().match(path);
//  //};
//}]);


app.service('googleApis' , ['$q','$http',function($q,$http){
    var gasrv = this;

    gasrv.docs=[];
    gasrv.currentDoc="N/A";
    gasrv.autoChecking=false;
    activado = false;


    gasrv.setActivado = function(newValue) {
        activado = newValue;
    };

    gasrv.getActivado = function() {
        return activado;
    };

    gasrv.authorization = function(popupLogin){
        var getAuthResult = $q.defer();

        if (!gasrv.autoChecking) {
            gasrv.autoChecking=true;
            gapi.auth.authorize(
                {
                    'client_id': CLIENT_ID,
                    'scope': SCOPES.join(' '),
                    'immediate': popupLogin
                }, function (authResult) {
                    if (authResult && !authResult.error) {
                        getAuthResult.resolve(authResult);
                    }else{
                        getAuthResult.reject(authResult);
                    }
                });

            return getAuthResult.authorization;
        }
    };

    gasrv.getList= function(mycallback){

        //var getDocCollection = $q.defer();
        //
        //gapi.client.load('drive', 'v2', function(){
        //    getDocCollection.resolve();
        //});

        var getDocCollection = gapi.client.load('drive', 'v2');

        getDocCollection.then(function(){

                console.log("TRYING TO LOAD LIST!!!");

                gapi.client.drive.files.list({
                    'maxResults': 10,
                    'q': "mimeType = 'application/vnd.google-apps.document'"
                }).then(function(resp) {
                        console.log("RETRIEVE successfully the list!!! ");
                        //console.log(resp.result.items);
                        gasrv.docs =  resp.result.items;
                        mycallback(gasrv.docs);
                    },function(){
                        console.log("Failed getting the list");
                        //gasrv.activado = false;
                        gasrv.docs = [];
                    }
                );

                //request.execute(function(resp) {
                //    gasrv.docs =  resp.items;
                //});

            }, function(){
                //gasrv.activado = false;
                console.log("COULDN'T LOAD CLIENT INTERFACE");
            }
        );

    };

    gasrv.getDocument = function(docId,callback){

        var getDocPromise = $q.defer();

        gapi.client.load('drive', 'v2',
            function(){
                getDocPromise.resolve({"docid":docId,"callfunction":callback});
            });

        getDocPromise.promise.then(function(params){
            fileId = params.docid;
            callback = params.callfunction;
            var request = gapi.client.drive.files.get({fileId: fileId});

            request.execute(function(resp) {

                var accessToken = gapi.auth.getToken().access_token;
                var config = {headers:{'Authorization': "Bearer "+accessToken}};

                $http.get(resp.exportLinks["text/plain"], config)
                    .then(function(respData){
                        if (callback){
                            callback(respData.data);
                        }else{
                            gasrv.currentDoc = respData.data;
                        }

                    });
            });
        });
    };

    gasrv.translate2zombie = function(sourceTxt){

        $http.get("http://ancient-anchorage-9224.herokuapp.com/zombify?q=" + encodeURIComponent(sourceTxt))
            .then(function(respData){
                gasrv.currentDoc = respData.data.message;
            });

    };


    gasrv.isThereAToken = function(){
        return gapi.auth.getToken();
    };

}]);

app.directive('googleList' ,['googleApis' , '$window', function(googleApis,$window){

    this.ctrl = function(){
        var gl = this;

        gl.docCollection = [];

        gl.getList = function(){

            //console.log("googleApis.docs " + googleApis.docs);
            if (!googleApis.docs || googleApis.docs.length<=0) {
                googleApis.getList(function(mycole){
                    //console.log(mycole);
                    gl.docCollection = mycole;
                });
            }

            return googleApis.docs;
        };


        gl.fetchDocument  = function(id){
            googleApis.getDocument(id,googleApis.translate2zombie);

            return googleApis.currentDoc;
        };


        gl.checkIfInitReady = function(){
            return $window.isInitReady;
        }

    };

    return {
        controller: this.ctrl,
        controllerAs: 'gl',
        templateUrl: 'templates/google-list.html'
    };
}]);

app.directive('googleDoc' ,['googleApis' ,  function(googleApis){

    this.ctrl = function(){
        var gd = this;

        gd.displayDoc  = function(idSelector){
            //console.log("gd.displayDoc ");

            var elem = angular.element( document.querySelector( idSelector ) );
            elem.html(googleApis.currentDoc.replace(/\n/g, "<br>"));
        };


        /**
         * Select tab by Name
         *
         * @param elem query the DOM using angular.element
         * @param action "show"
         */
        gd.switchTab = function(elem,action){
            angular.element(elem).tab(action); // Select tab by name
        };

    };

    return {
        controller: this.ctrl,
        controllerAs: 'gd',
        templateUrl: 'templates/google-doc.html'
    };
}]);


app.directive('googleAuto' ,['googleApis' , '$rootScope' ,'ISActivo', '$window', function(googleApis,$rootScope,ISActivo,$window){

    this.ctrl = function(){
        var ga = this;

        ga.isReady=false;

        ga.getAutorization = function(avoidPopup){

            console.log("here is the value of isReady " +  ISActivo);//  googleApis.getActivado());

            //if (!googleApis.getActivado()){
            if (!ga.isReady){

                //ga.isReady =  googleApis.activado;

                var autoPromise = googleApis.authorization(avoidPopup)

                if (autoPromise) {
                    autoPromise.then(function (aresult) {
                        console.log("Success Login!");
                        ISActivo = true;
                        googleApis.setActivado(true);
                        ga.isReady = true;
                        googleApis.autoChecking = false;
                        //$rootScope.$apply();
                    }, function (aresult) {
                        console.log("Something failed when trying to login " + aresult.error());
                        googleApis.setActivado(false);
                        ISActivo = false;
                        ga.isReady = false;
                        googleApis.autoChecking = false;
                    });
                }
                else{
                    //console.log("DID NOT WANT TO LOG IN???");
                    //googleApis.activado = false;
                    //ga.isReady = false;
                    googleApis.autoChecking = false;
                }

               //$rootScope.$apply();
            }
        };


        ga.checkIfInitReady = function(){
            return $window.isInitReady;
        }

        ga.isAutoReady = function(){
            console.log("checkiando ... " + ga.isReady);

            //return googleApis.getActivado();
            //return ISActivo;

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


app.value('ISActivo',false);


app.config(['$routeProvider', function($routeProvider){
  $routeProvider
    .when('/list', {
      templateUrl: 'templates/list.html'
    })
    .when('/docviewer', {
      templateUrl: 'templates/docviewer.html'
    })
    .otherwise({
      redirectTo: '/list'
    });
}]);
