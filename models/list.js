var mongoose = require("mongoose")

var listSchema = mongoose.Schema({
	dateCreated   : {type:Number},
	username      : {type: },
	title         : {type: },
	items         : {type: },
	complete      : {type: },
})

module.exports = mongoose.model("List",listSchema)