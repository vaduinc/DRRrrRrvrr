app.directive('postList', ['googleApis','$rootScope', function(googleApis,$rootScope){
  this.ctrl = function(){
    var dl = this;

    dl.documentos = googleApis;

    googleApis.getList();

    dl.getLista = function(){
        googleApis.getList();
    }

    dl.display = function(doc){
      googleApis.getDocument(doc.id,googleApis.translate2zombie);
      //posts.current = googleApis.currentDoc;
    };
  };

  return {
    controller: this.ctrl,
    controllerAs: 'dl',
    templateUrl: 'templates/post-list.html'
  };
}]);
