var app = angular.module('mealtrack.services.constants', []);

app.constant('AUTH_EVENTS', {
    notAuthenticated: 'auth-not-authenticated',
    notAuthorized: 'auth-not-authorized'
})

.constant('OAUTH2', {
    grant_type: 'password',
    // client_id: '9vrqyYED9uEPmdvO',
    client_id: 'hMWwljJZX0fRFamB',
    // client_secret: 'DW97v4H5Jsl0KoMKXqnAk209Y5M6h9tT',
    client_secret: 'mTxaJqXR1hWbHMrtA2Dca9K9u1wvng2Q',
    api: 'http://restcms.local/api/v1',
    url: 'http://restcms.local/oauth/access_token'
    
});