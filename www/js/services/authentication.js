var app = angular.module('mealtrack.services.authentication', ['mealtrack.services.constants']);

app.service('AuthService', function($q, $http, OAUTH2) {
    var LOCAL_TOKEN_KEY = {};
    var username = '';
    var isAuthenticated = false;
    var authToken;
    
    var loadUserCredentails = function() {
        var token = window.localStorage.getItem(LOCAL_TOKEN_KEY);
        if (token) {
            useCredentails(token);
        }
    };
    
    var useCredentails = function(token) {
        username = token.name;
        isAuthenticated = true;
        authToken = token;
        
        // $http.defaults.headers.common['X-Auth-Token'] = token;
        $http.defaults.headers.common['Authorization'] = 'Bearer ' + token.access_token;
    };
    
    var storeUserCredentials = function(token) {
        window.localStorage.setItem(LOCAL_TOKEN_KEY, token);
        useCredentails(token);
    };
    
    var destroyUserCredentails = function() {
        authToken = undefined;
        username = '';
        isAuthenticated = false;
        // $http.defaults.headers.common['X-Auth-Token'] = undefined;
        $http.defaults.headers.common['Authorization'] = undefined;
        window.localStorage.removeItem(LOCAL_TOKEN_KEY);
    };
    
    var login = function(name, pw) {
        var d = $q.defer();
        $http.post(OAUTH2.url, {
            grant_type: OAUTH2.grant_type,
            client_id: OAUTH2.client_id,
            client_secret: OAUTH2.client_secret,
            username: name,
            password: pw
        }).success(function success(data) {
            data.expires = parseInt(data.expires_in) * 1000 + (new Date()).getTime();
            data.name = name;
            console.log(data);
            storeUserCredentials(data);
            d.resolve('Login success');
        }).error(function error(msg) {
            console.error(msg);
            d.reject('Login failed.');
        });
        return d.promise;
    };
    
    var logout = function() {
        destroyUserCredentails();
    };
    
    var signup = function(email, fname, lname, pw) {
        var d = $q.defer();
        $http.post(OAUTH2.api + '/auth/signup', {
            firstname: fname,
            lastname: lname,
            email: email,
            password: pw
        }).success(function success(data) {
            data.expires = parseInt(data.expires_in) * 1000 + (new Date()).getTime();
            data.name = name;
            console.log(data);
            storeUserCredentials(data);
            d.resolve('Login success');
        }).error(function error(msg) {
            console.error(msg);
            d.reject('Login failed.');
        });
        return d.promise;
    };
    
    loadUserCredentails();
    
    return {
        login: login,
        logout: logout,
        signup: signup,
        isAuthenticated: function() {return isAuthenticated && authToken && authToken.expires>(new Date()).getTime();},
        username: function() {
            return username;
        }
    };
})

.factory('AuthInterceptor', function($rootScope, $q, AUTH_EVENTS) {
    return {
        responseError: function(response) {
            $rootScope.$broadcast({
                401: AUTH_EVENTS.notAuthenticated,
                403: AUTH_EVENTS.notAuthorized
            }[response.status], response);
            
            return $q.reject(response);
        }
    };
})

.config(function($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');
});
