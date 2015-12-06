app.service('googleApis' , ['$q','$http','$rootScope', function($q,$http,$rootScope){
    var gasrv = this;

    gasrv.docs=[];
    gasrv.currentDoc="N/A";
    gasrv.autoChecking=false;

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

        //var getDocCollection;
        //
        //if (gapi.client){
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
                            if(mycallback) {
                                mycallback(gasrv.docs);
                            }
                            $rootScope.$apply;
                        },function(){
                            console.log("Failed getting the list");
                            //gasrv.activado = false;
                            gasrv.docs = [];
                        }
                    );


                }, function(){
                    //gasrv.activado = false;
                    console.log("COULDN'T LOAD CLIENT INTERFACE");
                }
            );
        //}

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
                gasrv.currentDoc = respData.data.message.replace(/\n/g, "<br>"); // TODO should not replace here
                //gasrv.currentDoc = respData.data.message;
            });

    };


    gasrv.isThereAToken = function(){
        return gapi.auth.getToken();
    };

}]);
