let userSocket = {};
const express = require('express');
const session = require("express-session");
const app = express();
const http = require('http').Server(app);
const io = require("socket.io")(http);
const startDb = require("./database/init");
const userModel = require("./database/models/user");
const alarmModel = require("./database/models/alarm");
const deleteProd = require('./controllers/deleteProd');
const { request } = require('http');
const CookieParser = require("cookie-parser");
let sessionData={};
app.use(CookieParser());
startDb();
const port = process.env.PORT||5000;
// const port = 3000;  //TODO Change before Deployement
let userId = 0;
function newSession(req,res,next){
    console.log('yePakka',req.cookies);
    if(sessionData[req.cookies.CID]===undefined){
        res.cookie("CID",userId,{maxAge:1800000});
        sessionData[userId]={"nam":"setalis"};
        console.log('wanted to print',sessionData,req.cookies);
        userId++;
    }
    next();

}
app.use(express.static("public"));
app.use('/uploads', express.static(__dirname + '/public'));
app.use(express.json()); //middleware used to parse json data
app.use(express.urlencoded({extended:true})); //middleware used to parse form data
// const sessionMiddleware= session({
// 	secret:'keyboard cat',
// 	resave:false,
// 	saveUninitialized:true,
// 	cookie:{secure:false}
// })
// app.use(sessionMiddleware);

//setting middleware for templating
app.set("view engine","ejs");
app.set("views","./views");


// const wrap = middleware => (socket, next) => middleware(socket.request, {}, next);

// io.use(wrap(newSession));

// only allow authenticated users
// io.use((socket, next) => {
// 	console.log('idhar',socket.request.cookies);
//   const session = sessionData[socket.request.cookies.CID];
//   if (session && session.authenticated) {
//     next();
//   } else {
//     next(new Error("unauthorized"));
//   }
// });
let uid='';
io.on("connection", socket=>{
	console.log("A user connected");
	socket.emit("message","SOcket Connected Successfully");
	socket.on("disconnect",()=>{
		console.log("A user Disconnected");
	})
	socket.on("message",msg=>{
		console.log("Client msg",msg);

})
	console.log(socket.id);
		socket.on("uid",user=>{
			console.log("In UID on server side");
			// console.log(user);
			uid = user;
			
		})
		try{
			let userId = uid._id;
			console.log('idharKya',userId);
			console.log(userSocket); //todo ye printwa dekhna hai
			if(userSocket[userId]===undefined){
				userSocket[userId] = socket.id;
				console.log('shayadIdhar',userSocket);
			}
			else{
				console.log("joining room",userSocket[userId]);
				socket.join(userSocket[userId]) //todo minimize room logic
				// console.log('mayBeIdhar',userSocket);
			}
		}catch(err){
			console.log("in io",err);
		}
	
})



app.get('/', Home);
app.route("/alarm").get(GetTodo).post(PostTodo);
app.route("/delete").get(DeleteTodo).post(deleteProd);


app.route("/login").get(newSession,function(req,res){
	res.sendFile(__dirname+"/public/html/login.html")
}).post(function(req,res){
	// console.log(req.body);
	getUser(req.body.username, req.body.password, function(err,user){
		// console.log(user);
		if(user.length){
			sessionData[req.cookies.CID].isLoggedIn = true;
			sessionData[req.cookies.CID].authenticated = true;
			// console.log("user looks like ",user);
			sessionData[req.cookies.CID].username = user[0].username;
			sessionData[req.cookies.CID].user = user[0];
		
			res.redirect('/');
		}
		else{
			res.redirect('/login');
		}
	})
});

app.route("/signup").get(function(req,res){
	res.sendFile(__dirname+"/public/html/signup.html")
}).post(function(req,res){ //using the fucntion upload as middleware in post
	// console.log(req.file);
	const user = {
		username: req.body.username,
		password: req.body.password
	}
	// console.log("user saved is: ",user);
	saveUser(user,function(err){
		if(err){
			res.end(err);
		}
		else{
			res.redirect('/login');
		}
	})
});

app.route("/logout").get(function(req,res){
	// req.cookies.destroy();
	res.redirect("/login");
})


http.listen(port, () => {
	console.log(`Server is Live running at http://localhost:${port}`);
})

function Home(req,res){
	console.log(sessionData[req.cookies.CID]);
    try{
        if(!sessionData[req.cookies.CID].isLoggedIn){
            res.redirect("/login");
        }else{
			getTodos(function(err,alarms){
				const userTodo = alarms.filter(function(alarm){
					return alarm.createdBy === sessionData[req.cookies.CID].username;
				});
				
				sessionData[req.cookies.CID].data = userTodo;
				
				res.render("home",{data:userTodo,user:sessionData[req.cookies.CID].user}); //home.ejs
			})
		}
    }catch(err){
        console.log("isloggedin no yet set");
        res.redirect("/login");
    }
}


function GetTodo(req,res){ //todo Change Naming convention
	// console.log("In GetTodo");      //1
	getTodos(function(err,data){
		// console.log("in getTodos");    //4
		//console.log(res.json(data));
		res.json(data);
	})
}

function PostTodo(req,res){
	console.log("In Post Todo");    //5
	const alarm = {
		text:  req.body.ip, // String is shorthand for {type: String}
		createdBy: sessionData[req.cookies.CID].username,
		userId:sessionData[req.cookies.CID].user._id,
		time:   req.body.time,
		date: req.body.date
	}
	res.cookie("CID",req.cookies.CID,{maxAge:1800000});
	saveTodos(alarm,function(){
		// console.log("in saveTodos");
		res.redirect("/");
	})
}

function DeleteTodo(req,res){
	// console.log("In Delete Todo");
	// console.log("req body: ",req.body);
	delTodos(req.body,function(){
		// console.log("in delTodos");
		res.redirect("/");
	})
}



function getTodos(callback){
	alarmModel.find({})
	.then(function(alarms){
		callback(null,alarms);
	})
	.catch(function(){
		callback("cant read alarms")
	})

}


function saveTodos(alarm,callback){
	alarmModel.create(alarm)
	.then(function(){
		callback(null);
	})
	.catch(function(){
		callback("cant save alarm");
	})

}

function delTodos(alarm,callback){ //todo don't actually delete, just make it inactive
	alarmModel.deleteOne({text:alarm.delete})
	.then(function(){
		callback(null);
	})
	.catch(function(){
		callback("cant delete alarm");
	})

}



function getUser(username,password,callback){

	userModel.find({username:username,password:password})
	.then(function(data){
		// console.log("user found")
		callback(null,data);
	})
	.catch(function(err){
		callback("user not found");
	})
}

function saveUser(user,callback){
	userModel.create(user).then(function(){
		callback(null);
	}).catch(function(){
		callback("Cant save user");
	})

}	


setInterval(async()=>{
	var currentdate = new Date(); 
	var datetime = currentdate.getHours() + ":";
	if(currentdate.getMinutes()<10){
		datetime=datetime+"0"+ currentdate.getMinutes();
	}
	else{
		datetime=datetime + currentdate.getMinutes();
	}
	var today =  currentdate.getFullYear()+"-"+ (currentdate.getMonth()+1)
		if (currentdate.getDate()<10){
			today = today+ "-0"+currentdate.getDate();
		}
		else{
			today = today+ "-"+currentdate.getDate();
		}
	try{
		//todo check if the request has returned or not, if it has not returned don't send another req
		//Compound Index date_1_time_1
		let dueAlarms = await alarmModel.find({date:today,time:datetime});
		if (dueAlarms.length){

			console.log(dueAlarms);
			let alarms = dueAlarms;
			alarms.forEach(alarm => {
				let sockId = userSocket[alarm.userId];
				console.log(userSocket[alarm.userId]);
				console.log("sending to",sockId);
				io.to(sockId).emit("done",{text:alarm.text})
			});
		}
	}catch(er){
		console.log("in db req",er)
	}

	// console.log(today,datetime);
	// console.log(userSocket);
},45000)

//Built By Shubham Vora
