angular.module("listApp").factory("callFactory",["$http", function($http){
	
	// This thing is broken, but I would really like to have the $http call here so I can reuse it elsewhere...

	var getUser = function(){
		$http.get("/api/me").then(function(returnData){
			if(returnData.data.username){
				$scope.username = returnData.data.username
			}
		})
	}

	return{
		getUser : getUser,
	}

}])