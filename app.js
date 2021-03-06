var express = require("express")
var bodyParser = require("body-parser")

var mongoose = require("mongoose")
mongoose.connect("mongodb://localhost/listies")

var session = require("express-session")
var passport = require("passport")

var passportConfig = require("./config/passport.js")

var app = express()

app.use(session({
	secret 			  : "listsaregood",
	resave 			  : true,
	saveUninitialized : true
}))

app.use(passport.initialize())

app.use(passport.session())

app.use(express.static(__dirname + "/public"))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

var authController = require("./controllers/auth.js")

app.get("/",function(request,response){
	response.sendFile("/html/index.html",{root:"./public"})
})

app.post("/auth/signup",function(request,response){
	authController.signup(request,response)
})

app.post("/auth/login",function(request,response){
	authController.login(request,response)
})

app.use(passportConfig.ensureAuthenticated)

// -=-=-=-=-=-=-=-=-=-=-
// AUTHENTICATED ROUTES:
// -=-=-=-=-=-=-=-=-=-=-

var listController = require("./controllers/list.js")

app.get("/api/me",function(request,response){
	response.send(request.user)
})

app.post("/api/remove/list",listController.deleteList)

app.post("/api/list",listController.saveList)

app.get("/api/list",listController.getLists)

app.get("/auth/logout",authController.logout)

var port = 3000

app.listen(port,function(){
	console.log("The server is listening on port", port)
})