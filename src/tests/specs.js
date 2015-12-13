describe('googleList directive', function(){
    var compile, scope, compiledDirective, serviceLayer, controller;
    beforeEach(function(){
        module('templates', 'DRRrrRrvrr');
        module(function($provide){
            $provide.service('googleApis', function(){
                this.docs = [];
                this.getList = function(){
                    this.docs = [1, 2, 3];
                };
            });
        });

        inject(function($compile, $rootScope, $injector){
            compile = $compile;
            scope = $rootScope.$new();
            serviceLayer = $injector.get('googleApis');
        });

        var element = angular.element('<google-list></google-list>');
        compiledDirective = compile(element)(scope);
        scope.$digest();
        serviceLayer.docs = []; // make sure it initialized as empty
        controller = compiledDirective.controller('googleList');

    });
    describe("directive controller", function(){
        describe("getLista", function(){
            it("should set a document list on the service", function(){
                expect(serviceLayer.docs.length).toBe(0);
                controller.getLista();
                expect(serviceLayer.docs.length).toBe(3);
            });
        });
    });

});
