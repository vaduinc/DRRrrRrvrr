//describe('postList directive', function(){
//
//    var compile, scope, compiledDirective, googleApis, controller;
//
//    var itemsMock = [{
//        "id": "1",
//        "title": "Close-Juango-bofa"
//    },
//        {
//            "id": "2",
//            "title": "Copy of SurNorte Assay Management System"
//        },
//        {
//            "id": "3",
//            "title": "A-TODO-LIST"
//        },
//        {
//            "id": "4",
//            "title": "Jenkins-Build"
//        },
//        {
//            "id": "5",
//            "title": "Jenkins-Deployment"
//        },
//        {
//            "id": "5",
//            "title": "Research Paper"
//        }
//    ];
//
//    module('templates', 'DRRrrRrvrr');
//    beforeEach(function(){
//
//        module(function($provide){
//            $provide.service('googleApis', function(){
//                this.docs = [];
//                this.getList = function(){
//                    this.docs = itemsMock;
//                };
//            });
//        });
//
//        inject(function($compile, $rootScope, $injector){
//            compile = $compile;
//            //dump("PASO  1 "  + compile );
//            scope = $rootScope.$new();
//            googleApis = $injector.get('googleApis');
//          //  dump(googleApis);
//
//        });
//
//        var element = angular.element("<google-list></google-list>");
//        compiledDirective = compile(element)(scope);
//
//        //dump(compiledDirective);
//
//        scope.$digest();
//
//        //dump(compiledDirective.controller);
//
//        dump(compiledDirective.find("googleList"));
//
//        //controller = compiledDirective.controller();
//        //controller = compiledDirective.find("googleList");
//        controller = compiledDirective.controller('googleList');
//
//        dump("PASO  2 " + controller);
////=============
//        //scope = $rootScope.$new();
//        //var element = angular.element("<google-list></google-list>");
//        //template = compile(element)(scope);
//        //scope.$digest();
//        //controller = element.controller; //('googleList');
//        //dump("PASO  2 " + controller);
//
//    });
//
//    it('should bring the zombified document version',function(){
//
//        dump(scope);
//
//        expect(googleApis.docs.length).not.toBe(6);
//        dump("PASO  3 " +  controller);
//        scope.getLista();
//        expect(googleApis.docs.length).toBe(6);
//    });
//
//});