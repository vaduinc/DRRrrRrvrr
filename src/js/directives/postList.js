app.directive('postList', ['googleApis', function(googleApis){
  this.ctrl = function(){
    var dl = this;
    dl.posts = googleApis;

    googleApis.getList();

    dl.display = function(doc){
      googleApis.getDocument(doc.id,googleApis.translate2zombie);
      posts.current = googleApis.currentDoc;
    };
  };

  return {
    controller: this.ctrl,
    controllerAs: 'dl',
    templateUrl: 'templates/post-list.html'
  };
}]);
