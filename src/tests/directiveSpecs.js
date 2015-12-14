describe('googleList directive', function(){
    var compile, scope, compiledDirectiveGL,compiledDirectiveGD , serviceLayer, controller;
    var itemsMock = [
        { "id": "1", "title": "Close-Juango-bofa"},
        { "id": "2", "title": "Copy of SurNorte Assay Management System"},
        { "id": "3", "title": "A-TODO-LIST"},
        { "id": "4", "title": "Jenkins-Build"},
        { "id": "5", "title": "Jenkins-Deployment"},
        { "id": "6", "title": "Research Paper"}
    ];

    var originalDocMock = "this is the original document to be translated";
    var currentDocMock = "thrrRrs rrRrs thrr rrrRrRRrrRrgrrRrnhral drrrRrcrrrrRrmrrnt trrrRr brr tRRhranslhratrrd";

    beforeEach(function(){
        module('templates', 'DRRrrRrvrr');
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

        inject(function($compile, $rootScope, $injector){
            compile = $compile;
            scope = $rootScope.$new();
            serviceLayer = $injector.get('googleApis');
        });

        scope.documento = {
            title: "some title"
        };

        var elementGL = angular.element('<google-list></google-list>');
        var elementGD = angular.element('<google-doc documento="documento" ></google-doc>');

        compiledDirectiveGL = compile(elementGL)(scope);
        compiledDirectiveGD = compile(elementGD)(scope);

        scope.$digest();

        serviceLayer.docs = []; // make sure it initialized as empty
        controller = compiledDirectiveGL.controller('googleList');

    });

    describe("directive googleList controller", function(){
        describe("getLista", function(){

            it("should be empty the docs collection", function(){
                expect(serviceLayer.docs.length).toBe(0);
            });

            it("should set a document list on the service layer", function(){
                controller.getLista();
                expect(serviceLayer.docs.length).toBe(6);
            });

            it("should be able to pick up any specific object from the service layer collection", function(){
                controller.getLista();
                expect(serviceLayer.docs[5].title).toBe("Research Paper");
            });

        });

        describe("display", function(){
            it("should be N/A for both currentDoc and originalDoc", function(){
                expect(serviceLayer.currentDoc).toBe("N/A");
                expect(serviceLayer.originalDoc).toBe("N/A");
            });

            it("should set a document list on the service", function(){
                controller.display(itemsMock[0]);
                expect(serviceLayer.currentDoc).toBe(currentDocMock);
                expect(serviceLayer.originalDoc).toBe(originalDocMock);
            });
        });


    });

    describe("directive googleDoc ", function(){
        it("should have put the title in bold", function(){
            var strong = compiledDirectiveGD.find('strong');
            expect(strong.text()).toBe(scope.documento.title);
        });
    });
});
