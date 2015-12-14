/**
 * Directive to render/display one specific document.
 * It is used to show the original Google document and
 * it zombiefied version.
 */

app.directive('googleDoc', function(){
  return {
    scope: {
      documento: '=',
      body: '='
    },
    templateUrl: 'templates/google-doc.html'
  };
});
