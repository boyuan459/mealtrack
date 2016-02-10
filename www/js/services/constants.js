var app = angular.module('mealtrack.services.constants', []);

app.constant('AUTH_EVENTS', {
    notAuthenticated: 'auth-not-authenticated',
    notAuthorized: 'auth-not-authorized'
})

.constant('OAUTH2', {
    grant_type: 'password',
    client_id: '9vrqyYED9uEPmdvO',
    client_secret: 'DW97v4H5Jsl0KoMKXqnAk209Y5M6h9tT',
    api: 'http://restcms.local/api/v1',
    url: 'http://restcms.local/oauth/access_token'
    
});