var app = angular.module('mealtrack.controllers.authentication', []);

/*********************************************************************
 * LoginCtrl
 *********************************************************************/
app.controller('LoginCtrl', function ($scope, $state, $ionicPopup, AuthService) {

	$scope.formData = {
		"email": "",
		"password": ""
	};

	$scope.login = function (form) {
		console.log("LoginCtrl::login");
		if (form.$valid) {
            AuthService.login($scope.formData.email, $scope.formData.password).then(function(authenticated) {
                $state.go('tab', {}, {reload: true});
            }, function(err) {
                var alertPopup = $ionicPopup.alert({
                    title: 'Login failed',
                    template: 'Please check your credentials.'
                });
            });
        } else {
            console.log("Invalid form");
        }
	};

});

/*********************************************************************
 * SignupCtrl
 *********************************************************************/
app.controller('SignupCtrl', function ($scope, $state, AuthService) {

	$scope.formData = {
		"firstname": "",
        "lastname": "",
		"email": "",
		"password": ""
	};

	$scope.signup = function (form) {
        if (form.$valid) {
            console.log("SignupCtrl::signup");
            AuthService.signup($scope.formData.email, $scope.formData.firstname, $scope.formData.lastname, $scope.formData.password).then(function(authenticated) {
                $state.go('tab', {}, {reload: true});
            }, function(err) {
                var alertPopup = $ionicPopup.alert({
                    title: 'Signup failed',
                    template: 'Please check your input.'
                });
            });
        }
	};

});