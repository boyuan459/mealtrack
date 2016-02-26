var app = angular.module('mealtrack', [
	'ionic',
	'ngMessages',
	'ngCordova',
    'ngResource',
	'angularMoment',
	'mealtrack.controllers.authentication',
	'mealtrack.controllers.rent',
	'mealtrack.controllers.account',
	'mealtrack.services.authentication',
	'mealtrack.services.rent',
	'mealtrack.filters.mealtime'
]);

app.run(function ($ionicPlatform) {
	$ionicPlatform.ready(function () {
		// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
		// for form inputs)
		if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
		}
		if (window.StatusBar) {
			// org.apache.cordova.statusbar required
			StatusBar.styleBlackTranslucent();
		}
	});
    
});

//for test purpose
app.config(function($httpProvider) {
    // $httpProvider.defaults.headers.common['Authorization'] = 'Bearer 8TuuEAeJqEVgOAbLoYWOwY1DtK57aq9X0SwYm9mR';
    $httpProvider.defaults.headers.common['Authorization'] = 'Bearer 0xGk7R40gr3A85DNZ1e6hxcRrFWb0YQpQi0lQqWa';
});

app.config(function ($stateProvider, $urlRouterProvider) {
	$stateProvider
		.state('login', {
			url: "/login",
			cache: false,
			controller: 'LoginCtrl',
			templateUrl: "templates/login.html"
		})
		.state('signup', {
			url: "/signup",
			cache: false,
			controller: 'SignupCtrl',
			templateUrl: "templates/signup.html"
		})
		.state('tab', {
			url: "/tab",
			abstract: true,
			templateUrl: "templates/tabs.html"
		})
		.state('tab.rent', {
            url: '/rent',
            views: {
                'tab-rent': {
                    templateUrl: 'templates/tabs/tab-rent.html',
                    controller: 'RentListCtrl'
                }
            }
        })
        .state('tab.rent-property', {
            url: '/rent/:propertyId',
            views: {
                'tab-rent': {
                    templateUrl: 'templates/tabs/tab-rent-property.html',
                    controller: 'PropertyCtrl'
                }
            }
        })
        .state('tab.track', {
            url: '/track',
            views: {
                'tab-track': {
                    templateUrl: 'templates/tabs/tab-track.html',
                    controller: 'RentTrackCtrl'
                }
            }
        })
        .state('tab.account', {
            url: '/account',
            views: {
                'tab-account': {
                    templateUrl: 'templates/tabs/tab-account.html',
                    controller: 'AccountCtrl'
                }
            }
        })
	;

	// if none of the above states are matched, use this as the fallback
	$urlRouterProvider.otherwise('/login');

});

// .run(function($rootScope, $state, AuthService, AUTH_EVENTS) {
//     $rootScope.$on('$stateChangeStart', function(event, next, nextParams, fromState) {
//        if ('data' in next && 'authorizedRoles' in next.data) {
//            var authorizedRoles = next.data.authorizedRoles;
//            if (!AuthService.isAuthorized(authorizedRoles)) {
//                event.preventDefault();
//                $state.go($state.current, {}, {reload: true});
//                $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
//            }
//        }
       
//        if (!AuthService.isAuthenticated()) {
//            console.log(next);
//            if (next.name != 'signup' || next.name != 'login') {
//                event.preventDefault();
//                $state.go('login');
//            }
//        } 
//     });
// });
