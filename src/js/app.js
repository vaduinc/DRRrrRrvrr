var app = angular.module('routastic', ['ngRoute']);

//app.controller('TabController', ['$location', function($location){
//  //var tc = this;
//  //tc.active = function(path){
//  //  return !!$location.path().match(path);
//  //};
//}]);


app.service('googleApis' , ['$q','$http',function($q,$http){
    var gasrv = this;

    gasrv.activated = false;
    gasrv.docs=[];
    gasrv.currentDoc="N/A";

    gasrv.authorization = function(){
        console.log('Entre service');

        var getAuthResult = $q.defer();

        gapi.auth.authorize(
            {
                'client_id': CLIENT_ID,
                'scope': SCOPES.join(' '),
                'immediate': false
            }, function(authResult){
                getAuthResult.resolve(authResult);
            });

        return getAuthResult.promise;

        console.log('sali service');
    };

    gasrv.getList= function(){

        var getDocCollection = $q.defer();

        gapi.client.load('drive', 'v2', function(){
            getDocCollection.resolve();
        });

        getDocCollection.promise.then(function(){

            var request = gapi.client.drive.files.list({
                'maxResults': 10,
                'q': "mimeType = 'application/vnd.google-apps.document'"
            });

            request.execute(function(resp) {
                console.log("CAllback with list response");
                gasrv.docs =  resp.items;
            });

        });


        console.log("ya me devolvi !!!");
       // return gasrv.docs;
    };

    gasrv.getDocument = function(docId){

        var getDocPromise = $q.defer();

        gapi.client.load('drive', 'v2', function(){
            getDocPromise.resolve(docId);
        });

        getDocPromise.promise.then(function(docId){
            fileId = docId;
            var request = gapi.client.drive.files.get({fileId: fileId});
           // console.log ("IDSSSS  " + fileId);

            request.execute(function(resp) {
                var accessToken = gapi.auth.getToken().access_token;
                var config = {headers:{'Authorization': "Bearer "+accessToken}};

                console.log ("accessToken  " + accessToken);

                $http.get(resp.exportLinks["text/plain"], config)
                    .then(function(respData){
                        console.log ("respData  " + respData.data);
                        //gasrv.currentDoc = respData.data.replace(/\n/g, "<br>");
                        gasrv.currentDoc = respData.data;
                    });
            });
        });
    };

}]);

app.directive('googleList' ,['googleApis' ,  function(googleApis){

    this.ctrl = function(){
        var gl = this;

        gl.getList = function(){
            console.log(' directive List ' + googleApis.docs);

            if (googleApis.docs.length<=0) {
                googleApis.getList();
            }

            return googleApis.docs;
        };


        gl.fetchDocument  = function(id){
            console.log("ID googleList googleList googleList googleList=> " + id);
            googleApis.getDocument(id);

           // var elem2 = angular.element( document.querySelector( 'a[href="#list"]' ) );
            //angular.element('a[href="#docviewer"]').tab('show'); // Select tab by name
            //angular.element('a[href="#list"]').tab('hide'); // Select tab by name
            //console.log("elem2  "  + elem2);
           // elem2.tab('hide');


            return googleApis.currentDoc;
        };
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
            console.log("gd.displayDoc ");

            //var elem2 = angular.element( document.querySelector( 'a[href="#docviewer"]' ) );
            //angular.element('a[href="#docviewer"]').tab('show'); // Select tab by name
            //console.log("elem2  "  + elem2);
            //elem2.tab('show');

            var elem = angular.element( document.querySelector( idSelector ) );
            elem.html(googleApis.currentDoc.replace(/\n/g, "<br>"));

            //gd.switchTab('a[href=#docviewer]','show')
            //googleApis.currentDoc.replace(/\n/g, "<br>");
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

app.directive('googleAuto' ,['googleApis' ,  function(googleApis){

    this.ctrl = function(){
        var ga = this;

        ga.getAutorization = function(){
            console.log(' directive Entre');

            if (googleApis.activated){
                return googleApis.activated;
            }else {
               googleApis.authorization().then(function (aresult) {
                    console.log('directive sali');
                    if (aresult && !aresult.error) {
                        googleApis.activated = true;
                    } else {
                        googleApis.activated = false;
                    }
                });
            }
        };

    };

    return {
        controller: this.ctrl,
        controllerAs: 'ga',
        templateUrl: 'templates/google-auto.html'
    };
}]);


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
