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

angular.module("listApp").controller("profileController",["$scope","$http","callFactory",function($scope,$http,callFactory){

	$scope.list = {
		title    : "",
		items    : [],
		username : "",
	}
	
	$http.get("/api/list").then(function(returnData){
		$scope.lists = returnData.data
	})
	
	$http.get("/api/me").then(function(returnData){
		if(returnData.data.username){
			$scope.username = returnData.data.username
			$scope.list.username = $scope.username
		}
	})


	$scope.item = ""

	$scope.addItem = function(item){
		$scope.list.items.push({
			item     : item,
			complete : false,
		})
	}

	$scope.submitList = function(){
		console.log($scope.list)
		$http({
			method  : 'POST',
			url     : '/api/list',
			data    : $scope.list,
		})
	}

}])