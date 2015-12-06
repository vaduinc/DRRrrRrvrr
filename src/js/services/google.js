app.service('googleApis' , ['$q','$http', 'appConfig',function($q,$http,appConfig){
    var gasrv = this;

    gasrv.docs=[];
    gasrv.currentDoc="N/A";
    gasrv.originalDoc="N/A";
    gasrv.isConnected = false;

    gasrv.authorization = function(popupLogin){
        var getAuthResult = $q.defer();

        gapi.auth.authorize(
            {
                'client_id':  appConfig.CLIENT_ID,
                'scope': appConfig.SCOPES.join(' '),
                'immediate': popupLogin
            }, function (authResult) {
                if (authResult && !authResult.error) {
                    getAuthResult.resolve(authResult);
                }else{
                    getAuthResult.reject(authResult);
                }
            });

        return getAuthResult.promise;

    };

    gasrv.getList= function(mycallback){

            var getDocCollection = gapi.client.load('drive', 'v2');

            getDocCollection.then(function(){

                    gapi.client.drive.files.list({
                        'maxResults': 10,
                        'q': "mimeType = 'application/vnd.google-apps.document'"
                    }).then(function(resp) {
                            gasrv.docs =  resp.result.items;
                            if(mycallback) {
                                mycallback(gasrv.docs);
                            }
                        },function(){
                            console.log("Failed getting the list");
                            gasrv.docs = [];
                        }
                    );


                }, function(){
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
                            gasrv.currentDoc = respData.data.replace(/\n/g, "<br>"); // TODO should not replace here;
                        }
                        gasrv.originalDoc = respData.data.replace(/\n/g, "<br>"); // TODO should not replace here;
                    });
            });
        });
    };

    gasrv.translate2zombie = function(sourceTxt){

        $http.get(appConfig.ZOMBIE_URL + encodeURIComponent(sourceTxt))
            .then(function(respData){
                gasrv.currentDoc = respData.data.message.replace(/\n/g, "<br>"); // TODO should not replace here
            });

    };

}]);
