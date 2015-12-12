var List = require("../models/list.js")

var saveList = function(request,response){

	List.find({_id:request.body._id},function(error,docs){
		console.log(docs)
		if(docs.length === 0){
			var d = new Date()
			var n = d.getTime()

			var newList = new List({
				dateCreated : +n,
				username    : request.user.username,
				items       : request.body.items,
				title       : request.body.title, 
			})

			newList.save(function(error){
			})
		}
		else{
			List.update({_id : request.body._id},{items: request.body.items, complete: request.body.complete, title: request.body.title},function(error){
				
			})
		}
	})

}

var getLists = function(request,response){
	var user = request.user.username
	List.find({username : user},function(error,docs){
		response.send(docs)
	})
}

module.exports = {
	saveList : saveList,
	getLists : getLists,
}