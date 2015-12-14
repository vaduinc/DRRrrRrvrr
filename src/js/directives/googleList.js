/**
 * Uses the googleApi service layer to fetch the document list
 * and to get and translate a specific document using the docId.
 */

app.directive('googleList', ['googleApis', function(googleApis){
  this.ctrl = function(){
    var dl = this;

    dl.documentos = googleApis;

    googleApis.getList();

      /**
       * Get a list of documents from Google user account.
       */
    dl.getLista = function(){
        googleApis.getList();
    };

      /**
       * Gets document from Google using the docIds.
       * Also passes the translate2Zombie function to apply the
       * zombiefied translation to the response document.
       * All done through the googleApi service layer.
       *
        * @param doc document to be fetched.
       */
    dl.display = function(doc){
        googleApis.getDocument(doc.id,googleApis.translate2zombie);
    };
  };

  return {
    controller: this.ctrl,
    controllerAs: 'dl',
    templateUrl: 'templates/google-list.html'
  };
}]);
