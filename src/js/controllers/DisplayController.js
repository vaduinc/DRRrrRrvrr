/**
 * Controller to have access to the service layer documents.
 */

app.controller('DisplayController', ['googleApis', function(googleApis){
  var lc = this;
  lc.documentos = googleApis;

}]);
