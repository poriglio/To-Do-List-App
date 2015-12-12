var List = require("../models/list.js")

var saveList = function(request,response){

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