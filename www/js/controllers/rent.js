var app = angular.module('mealtrack.controllers.rent', []);


/*********************************************************************
 * RentListCtrl
 *********************************************************************/
app.controller('RentListCtrl', function ($scope, $ionicLoading, RentService) {

	$scope.rent = RentService;

	$ionicLoading.show();
	$scope.rent.load().then(function () {
        $ionicLoading.hide();
    });
   
	$scope.refreshItems = function () {
		$scope.rent.refresh().then(function () {
			$scope.$broadcast('scroll.refreshComplete');
		});
	};

	$scope.nextPage = function () {
		$scope.rent.next().then(function () {
			$scope.$broadcast('scroll.infiniteScrollComplete');
		});
	};

});

/*********************************************************************
 * RentTrackCtrl
 *********************************************************************/
app.controller('RentTrackCtrl', function ($scope,
                                           $state,
                                           $ionicPopup,
                                           $ionicLoading,
                                           $cordovaCamera,
                                           RentService) {

	$scope.resetFormData = function () {
		$scope.formData = {
			'title': '',
			'category': '',
			'calories': 29,
			'picture': null
		};
	};
	$scope.resetFormData();


	$scope.trackMeal = function (form) {
		console.log("MealCreateCtrl::trackMeal");
		//TODO
	};

	$scope.addPicture = function () {
		//var options = {
		//	quality: 50,
		//	destinationType: Camera.DestinationType.DATA_URL,
		//	sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
		//	allowEdit: true,
		//	encodingType: Camera.EncodingType.JPEG,
		//	targetWidth: 480,
		//	popoverOptions: CameraPopoverOptions,
		//	saveToPhotoAlbum: false
		//};


		//TODO


	};

});