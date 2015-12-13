app.directive('googleDoc', function(){
  return {
    scope: {
      documento: '=',
      body: '='
    },
    templateUrl: 'templates/google-doc.html'
  };
});
