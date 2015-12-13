app.directive('googleList', ['googleApis', function(googleApis){
  this.ctrl = function(){
    var dl = this;

    dl.documentos = googleApis;

    googleApis.getList();

    dl.getLista = function(){
        googleApis.getList();
    };

    dl.display = function(doc){
        dump("display function called");
      //googleApis.getDocument(doc.id,googleApis.translate2zombie);
    };
  };

  return {
    controller: this.ctrl,
    controllerAs: 'dl',
    templateUrl: 'templates/google-list.html'
  };
}]);
