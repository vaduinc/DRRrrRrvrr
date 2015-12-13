describe('FULL Tester', function(){

    describe('define all pieces of the system', function(){

        var compile, scope, compiledDirective, controller;
        //var $httpBackend;
        var $q;
        var googleApis;
        var resolveApiLoad;
        var def;
        var appConfig;

        var itemsMock = [
                {
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

        var originalDocMock = "this is the original document to be translated";
        var currentDocMock = "thrrRrs rrRrs thrr rrrRrRRrrRrgrrRrnhral drrrRrcrrrrRrmrrnt trrrRr brr tRRhranslhratrrd";


        beforeEach(module('templates', 'DRRrrRrvrr'));

        //beforeEach(inject(function (_$controller_, _$rootScope_, _$q_) {
        //    //$rootScope = _$rootScope_;
        //    $q = _$q_;
        //    //$controller = _$controller_;
        //}));

        beforeEach(function () {
            //module('templates', 'DRRrrRrvrr');

            //module(function($provide){
            //
            //    var authMock   = jasmine.createSpyObj('auth', ['authorize']);
            //    var clientMock = jasmine.createSpyObj('client', ['load']);
            //    var filesMock  = jasmine.createSpyObj('drive', ['list', 'get']);
            //
            //    authMock.authorize.and.callFake(function(options, callback){
            //        // mocked function
            //    });
            //
            //    clientMock.drive = { files: filesMock};
            //
            //    $provide.value('$window', { gapi: { auth: authMock, client : clientMock } });
            //});

            inject(function($compile, $rootScope, $injector){
                compile = $compile;
                scope = $rootScope.$new();
                //posts = $injector.get('posts');
            });

            inject(function($injector) {
                appConfig = $injector.get('appConfig');
                googleApis = $injector.get('googleApis');
                //$httpBackend = $injector.get('$httpBackend');

                spyOn(googleApis, "authorization").and.callFake(function(options, callback){
                    googleApis.isConnected = true;
                });

                spyOn(googleApis, "getList").and.callFake(function(options, callback){
                    googleApis.docs  = itemsMock;
                });

                spyOn(googleApis, "getDocument").and.callFake(function(options, callback){
                    googleApis.currentDoc  = currentDocMock;
                    googleApis.originalDoc = originalDocMock;
                });

                spyOn(googleApis, "translate2zombie").and.callFake(function(options, callback){
                    googleApis.currentDoc  = currentDocMock;
                });

                //$httpBackend
                //    .when('GET', 'http://ancient-anchorage-9224.herokuapp.com/zombify?q=')
                //    .respond(200, originalDocMock + currentDocMock);

            });

            var element = angular.element('<google-list></google-list>');
            compiledDirective = compile(element)(scope);
            scope.$digest();
            controller = compiledDirective.controller('googleList');

            //inject(function ($injector) {
            //    windowMock = $injector.get('$window');
            //
            //});

        });

        it('should be connected = false',function(){
            expect(googleApis.isConnected).not.toBeTruthy();
        });

        it('should be connected = true',function(){
            googleApis.authorization(false);
            expect(googleApis.isConnected).toBeTruthy();
        });

        it('should NOT contain 6 items/documents',function(){
            expect(googleApis.docs.length).not.toBe(6);
        });

        it('should contain 6 items/documents',function(){
            googleApis.getList();
            expect(googleApis.docs.length).toBe(6);
        });

        it('should NOT contain original and zombify documents',function(){
            expect(googleApis.currentDoc).toBe("N/A");
            expect(googleApis.originalDoc).toBe("N/A");
        });

        it('should fetch the original document and zombify it',function(){
            googleApis.getDocument();

            expect(googleApis.currentDoc).toBe(currentDocMock);
            expect(googleApis.originalDoc).toBe(originalDocMock);
        });

        it('should be N/A the current doc before zombifying the document',function(){
            expect(googleApis.currentDoc).toBe("N/A");
        });

        it('should bring the zombified document version',function(){
            googleApis.translate2zombie("any text will return same response");

            expect(googleApis.currentDoc).toBe(currentDocMock);
        });

// ============================= googleList directive ==============================

        //it('should bring the zombified document version',function(){
        //    expect(googleApis.currentDoc).toBe("N/A");
        //
        //    controller.getLista();
        //
        //    expect(googleApis.currentDoc).toBe(currentDocMock);
        //});

    });


    //describe('users service', function(){
    //    var users, $httpBackend;
    //    var usersMock = [
    //        {id: 1, username: "some1"},
    //        {id: 2, username: "some2"},
    //        {id: 3, username: "some3"},
    //        {id: 4, username: "some4"}
    //    ];
    //    beforeEach(function(){
    //        module('directings');
    //
    //        inject(function($injector){
    //            users = $injector.get('users');
    //            $httpBackend = $injector.get('$httpBackend');
    //        });
    //        $httpBackend
    //            .when('GET', 'http://jsonplaceholder.typicode.com/users/')
    //            .respond(200, usersMock);
    //
    //
    //    });
    //
    //
    //    describe('get', function(){
    //        it("should get some users", function(){
    //            expect(users.data.length).toBe(0);
    //            users.get(function(){
    //                expect(users.data.length).toBe(usersMock.length);
    //            });
    //        });
    //    });
    //});

});
