describe('postList directive', function(){

    var compile, scope, compiledDirective, googleApis, controller;

    var itemsMock = [{
            "id": "1",
            "title": "Close-Juango-bofa"
        },
        {
            "id": "2",
            "title": "Copy of SurNorte Assay Management System"
        },
        {
            "id": "3",
            "title": "A-TODO-LIST"
        },
        {
            "id": "4",
            "title": "Jenkins-Build"
        },
        {
            "id": "5",
            "title": "Jenkins-Deployment"
        },
        {
            "id": "5",
            "title": "Research Paper"
        }
    ];

    beforeEach(function(){
        module('templates', 'DRRrrRrvrr');
        module(function($provide){
          $provide.service('googleApis', function(){
            this.docs = [];
            this.getList = function(){
              this.docs = itemsMock;
            };
          });
        });

        inject(function($compile, $rootScope, $injector){
            dump("PASO  1");
            compile = $compile;
            scope = $rootScope.$new();
            googleApis = $injector.get('googleApis');
            dump("PASO  2");
        });

        var element = angular.element("<google-list></google-list>");
        compiledDirective = compile(element)(scope);
        scope.$digest();
        controller = compiledDirective.controller('googleList');

        dump("controller  "  + controller);


        describe("controller", function(){
            describe("display", function(){
                it('should bring the zombified document version',function(){
                    expect(googleApis.docs.length).not.toBe(6);
                    dump("PASO  2 " +  controller);
                    controller.getLista();
                    expect(googleApis.docs.length).toBe(6);
                });
            });
        });

      });

});
