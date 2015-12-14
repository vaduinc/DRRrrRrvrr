/**
 *  Google client ID, Google scope URL, Zombie API URL and number of documents to
 *  fetch when calling the getList from the Google API.
 */

app.value('appConfig' ,
    {
        CLIENT_ID : '',
        SCOPES : ['https://www.googleapis.com/auth/drive.readonly'],
        ZOMBIE_URL : 'http://ancient-anchorage-9224.herokuapp.com/zombify?q=',
        MAX_RESULTS : 10
    }
);