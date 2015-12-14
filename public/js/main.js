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

	$scope.lists = []

	$scope.activeList = []
	
	var getLists = function(){
		$http.get("/api/list").then(function(returnData){
			$scope.lists = returnData.data.sort(function(a,b){
				return b.dateCreated - a.dateCreated
			})
			$scope.activeList.push(returnData.data[0])
			$scope.activeList[0].active = true
		})
	}

	getLists()
	
	$http.get("/api/me").then(function(returnData){
		if(returnData.data.username){
			$scope.username = returnData.data.username
			$scope.list.username = $scope.username
			$scope.user = returnData.data
		}
	})

	$scope.selectList = function($index){
		$scope.hideActiveList = false
		$scope.showNewForm = false
		$scope.showEdit = false
		$scope.activeList = []
		$scope.lists[$index].active = true
		for(var i = 0; i < $scope.lists.length; i++){
			if(i!==$index){
				$scope.lists[i].active = false
			}
		}
		$scope.activeList.push($scope.lists[$index])
	}

	$scope.addItem = function(item,difficulty){
		$scope.activeList[0].items.push({
			item       : item,
			complete   : false,
			difficulty : difficulty ? difficulty : 0,
		})
	}

	$scope.saveList = function(){
		$scope.hideActiveList = false
		$scope.showEdit = false
		$http({
			method  : 'POST',
			url     : '/api/list',
			data    : $scope.activeList[0],
		})
	}

	$scope.createItem = function(item,difficulty){
		$scope.list.items.push({
			item     : item,
			complete : false,
			difficulty: difficulty ? difficulty : 0,
		})
	}
	
	$scope.createList = function(){

		$scope.list.active = true
		$scope.hideActiveList = false
		$scope.showNewForm = false
		$http({
			method  : 'POST',
			url     : '/api/list',
			data    : $scope.list,
		}).then($scope.lists.unshift($scope.list))
		$scope.activeList = []
		$scope.activeList.push($scope.list)
	}

	$scope.toggleEdit = function(){
		$scope.showNewForm = false
		if($scope.showEdit){
			$scope.showEdit = false
			$scope.hideActiveList = false
		}
		else{
			$scope.showEdit = true
			$scope.hideActiveList = true
		}
	}

	$scope.toggleNew = function(){
		$scope.activeList = []
		$scope.showEdit = false
		if($scope.showNewForm){
			$scope.showNewForm = false
		}
		else{
			$scope.showNewForm = true
		}		
	}

}])