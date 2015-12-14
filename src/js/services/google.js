/**
 * Service layer that interact with the google API and the Zombie API
 */

app.service('googleApis' , ['$q','$http', 'appConfig',function($q,$http,appConfig){
    var gasrv = this;

    gasrv.docs=[];              // collection with the first 10 documents from the Google account.
    gasrv.currentDoc="N/A";     // contains the zombiefied version of the original doc.
    gasrv.originalDoc="N/A";    // contains the original doc fetched from Google
    gasrv.isConnected = false;  // to check if already sign-in

    /**
     * Authorize the end user using the google authorization method call.
     * It uses the CLIENT_ID previously obtained by the user using Google pages.
     *
     * @param popupLogin true/false whether the Google pop up window need to be display to
     *          type user and password (Google's)
     * @returns {exports.defer.promise|*|jQuery.promise|promise.promise|d.promise|promise}
     *          returns a Promise with the authentication results.
     */
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

    /**
     * Fetch the first appConfig.MAX_RESULTS number of documents from the user's Google account.
     *
     * @param mycallback optional callback function to be executed once the documents were
     *          fetched successfully.
     */
    gasrv.getList= function(mycallback){

            var getDocCollection = gapi.client.load('drive', 'v2');

            getDocCollection.then(function(){

                    gapi.client.drive.files.list({
                        'maxResults': appConfig.MAX_RESULTS,
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

    /**
     * Fetch on document from the user's Google account using the input parameter {docId}
     * It sets the currentDoc and originalDoc with the response document.
     * In case the second input parameter {callback} is passed the results for applying
     * that function on top of the response document will be assigned to currentDoc.
     *
     * @param docId document identifier used to fetch document from Google account.
     * @param callback optional callback function to apply a post operation/functionality
     *          to the response document. (In this scenario the "translate2Zombie" is
     *          used.
     */
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

    /**
     * Calls the zombie API passing the input parameter {sourceTxt"} and
     * assigns the response to currentDoc service property.
     *
     * @param sourceTxt text to translate using the zombie API
     */
    gasrv.translate2zombie = function(sourceTxt){

        $http.get(appConfig.ZOMBIE_URL + encodeURIComponent(sourceTxt))
            .then(function(respData){
                gasrv.currentDoc = respData.data.message.replace(/\n/g, "<br>"); // TODO should not replace here
            });

    };

}]);
