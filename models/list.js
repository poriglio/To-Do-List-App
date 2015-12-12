var mongoose = require("mongoose")

var listSchema = mongoose.Schema({
	dateCreated   : {type:Number},
	username      : {type:String},
	title         : {type:String},
	items         : {type:Array},
	complete      : {type:Boolean, default:false},
	active        : {type:Boolean, default:false},
})

module.exports = mongoose.model("List",listSchema)