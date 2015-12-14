describe('Service Tester', function(){

    describe('define all pieces of the service layer', function(){

        var googleApis;
        var appConfig;

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


        beforeEach(module('DRRrrRrvrr'));

        beforeEach(function () {


            inject(function($injector) {
                appConfig = $injector.get('appConfig');
                googleApis = $injector.get('googleApis');

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

            });

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

    });

});
