angular.module("listApp",["ngRoute"])

angular.module("listApp").config(["$routeProvider",function($routeProvider){

	$routeProvider.when("/",{
		templateUrl : "/html/home.html",
		controller  : "homeController"
	})
	.when("/profile",{
		templateUrl : "/html/profile.html",
		controller  : "profileController"
	})

}])

angular.module("listApp").controller("homeController",["$scope",function($scope){

	$scope.toggleForm = function(form){
		$scope.signup;
		function toggle(){
			if(form){
				$scope.signup = false
			}
			else{
				$scope.signup = true
			}
			return $scope.signup
		}
		return toggle()
	}

}])

angular.module("listApp").controller("profileController",["$scope","$http",function($scope,$http){

	$http.get("/api/me").then(function(returnData){
		if(returnData.data.username){
			$scope.username = returnData.data.username
		}
	})

}])