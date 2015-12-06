app.directive('googleDoc', function(){
  return {
    scope: {
      post: '=',
      body: '='
    },
    templateUrl: '../../templates/google-doc.html'
  };
});
