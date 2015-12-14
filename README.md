## Assignment 3
*CSCI-E32*
*Jaime Valencia*
*valencia.jaime@yahoo.com*

## IMPORTANT
In order to make the application work on your local machine you need to set first the
CLIENT_ID in the appConfig.js file.

## Description

The application does not use any timer to check whether the Google token exist or not.
Instead it always renders a button that will check for the Google token when click.
If it exist then now the end user can click on the "Document List" tab to fetch the
document list from the end user's Google account. Otherwise, it displays a pop up window
asking for the Google users credentials. Once those are provided the popup window is closed.

Once the document list is displayed the user can click on any of the list items to
fetch that particular document. After the user clicks on the document then on the right
panel of the screen the zombiefied version of the document will be displayed.
To check the original Google document the user can switch to the Document Viewer tab.

This application is composed of the following modules;

source
    HTML
	    - index.html
	        general application layout.
	JS
	    - app.js
	        route configuration to HTML templates

	  - CONTROLLERS
	        - DisplayController.js
	            Controller to have access to the service layer documents.

	  - DIRECTIVES
	        - googleDoc.js
                Directive to render/display one specific document.
                It is used to show the original Google document and
                it zombiefied version.

            - googleList.js
                Uses the googleApi service layer to fetch the document list
                and to get and translate a specific document using the docId.

            - googleSecu.js
                Directive in charge of checking whether the end User has signed-in previously or not.
                It has the click event to sign in every time the user gets into the web app the
                first time.
                It also checks whether the Google API is already loaded.

	  - SERVICES
            - appConfig.js
                Google client ID, Google scope URL, Zombie API URL and number of documents to
                fetch when calling the getList from the Google API.

            - google.js
                Service layer that interact with the google API and the Zombie API

test
	- directiveSpecs.js
	- displayControllerSpecs.js
	- serviceSpecs.js

+ configuration files for karma, gulp, package.json, bower.json, etc.


## Testing

	All the testing files are located under "src/test""

	Jasmine Tests run using Karma. On RequireJS modules.

	There are a total of 18 different tests for all the system components; Controllers, Directives and Services
	
	18 specs, 0 failures

	mbpjaime:DRRrrRrvrr jaimevalencia$ karma start
        13 12 2015 22:36:18.806:DEBUG [config]: autoWatch set to false, because of singleRun
        13 12 2015 22:36:18.810:DEBUG [plugin]: Loading inlined plugin (defining framework:jasmine).
        13 12 2015 22:36:18.811:DEBUG [plugin]: Loading inlined plugin (defining preprocessor:ng-html2js).
        13 12 2015 22:36:18.812:DEBUG [plugin]: Loading inlined plugin (defining launcher:Chrome, launcher:ChromeCanary, launcher:Dartium, test).

		Chrome 47.0.2526 (Mac OS X 10.8.5): Executed 18 of 18 SUCCESS (0.293 secs / 0.279 secs)
        13 12 2015 22:35:11.236:DEBUG [karma]: Run complete, exiting.
        13 12 2015 22:35:11.237:DEBUG [launcher]: Disconnecting all browsers
        13 12 2015 22:35:11.352:DEBUG [launcher]: Process Chrome exited with code 0