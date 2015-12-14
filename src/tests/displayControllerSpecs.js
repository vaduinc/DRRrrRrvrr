describe("DisplayController", function(){

    var serviceLayer, dController;

    var itemsMock = [
        { "id": "1", "title": "Close-Juango-bofa"},
        { "id": "2", "title": "Copy of SurNorte Assay Management System"},
        { "id": "3", "title": "A-TODO-LIST"},
        { "id": "4", "title": "Jenkins-Build"},
        { "id": "5", "title": "Jenkins-Deployment"},
        { "id": "5", "title": "Research Paper"}
    ];

    var originalDocMock = "this is the original document to be translated";
    var currentDocMock = "thrrRrs rrRrs thrr rrrRrRRrrRrgrrRrnhral drrrRrcrrrrRrmrrnt trrrRr brr tRRhranslhratrrd";

    beforeEach(function(){
        module('DRRrrRrvrr');

        module(function($provide){
            $provide.service('googleApis', function(){
                this.docs = [];
                this.currentDoc="N/A";
                this.originalDoc="N/A";

                this.getList = function(){
                    this.docs = itemsMock;
                };

                this.getDocument = function(){
                    this.currentDoc  = currentDocMock;
                    this.originalDoc = originalDocMock;
                };
            });
        });

        inject(function($rootScope, $controller, $injector){
            var $scope = $rootScope.$new();
            dController = $controller('DisplayController', {$scope: $scope});
            serviceLayer = $injector.get('googleApis');
        });
    });
    describe("access to the service layer", function(){

        it("should have nothing if service layer has nothing", function(){
            expect(dController.documentos.docs.length).toBe(0);
        });

        it("should have access to the service layer and its collections", function(){
            serviceLayer.getList();
            expect(dController.documentos.docs.length).toBe(6);
        });

        it("should be able to pick up any specific object from the service layer collection", function(){
            serviceLayer.getList();
            expect(dController.documentos.docs[3].title).toBe("Jenkins-Build");
        });

        it("should be able to fetch the service layer document if any", function(){
            serviceLayer.getDocument();
            expect(dController.documentos.originalDoc).toBe(originalDocMock);
        });

    });
});
