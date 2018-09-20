var http = require("http");
var fs = require("fs");

http.createServer(function (req, res) {
	var path = req.url;
	if (path == "/") {
		path = "/public/index.html";
		sendFile(res, path);
	}
	else if (path.substr(path.lastIndexOf(".") + 1, path.length) == "css" || path.substr(path.lastIndexOf(".") + 1, path.length) == "js") {
		path = "/public" + path;
		sendFile(res, path);
	}
	else if (path == "/user") {
		req.on("data", function (chunk) {
			check(res, chunk.toString());
		});
	}
	else if(path.substr(0,2) == '/?'){
		var temp = path.substr(2,path.length);
		var query = temp.toString().split('&');
		for(var i = 0; i < query.length; i++){
			var key = query[i].toString().split('=');
			if(key[0] == 'username'){
				if_exist(res,key[1]);
			}
		}
	}
	else if(path.substr(path.lastIndexOf(".") + 1, path.length) == "jpg"){
		sendFile(res,path);
	}
	console.log("path: " + path);
}).listen(8000)

function sendFile(res, path) {
	var path = process.cwd() + path;
	fs.readFile(path, function (err, stdout, stderr) {
		if (!err) {
			var data = stdout;
			var type = path.substr(path.lastIndexOf(".") + 1, path.length);
			res.writeHead(200, { 'Content-type': "text/" + type });
			res.write(data);
		}
		res.end();
	});
}

function check(res, users) {
	var user = users.split(',');
	fs.readFile(process.cwd() + "/data/user.txt", function (err, stdout, stderr) {
		if (!err) {
			var temp = -1;
			var data = stdout.toString().split("\n");
			for (var i = 0; i < data.length; i++) {
				var user_data = data[i].split(',');
				for (var j = 0; j < 4; j++) {
					if (user[j] == user_data[j]) {
						temp = j;
						break;
					}
				}
				if (temp != -1) {
					break;
				}
			}
			if (temp != -1) res.write(temp.toString());
			else {
				var store = "";
				if (stdout.toString() == "") var store = users;
				else store = stdout.toString() + '\n' + users;
				fs.writeFile(process.cwd() + "/data/user.txt", store, function (err) {
					if (err) throw err;
				});
				res.write(users);
			}
		}
		res.end();
	});
}

function if_exist(res,username){
	fs.readFile(process.cwd() + "/data/user.txt", function (err, stdout, stderr){
		if (!err) {
			var temp = -1;
			var data = stdout.toString().split("\n");
			for (var i = 0; i < data.length; i++) {
				var user_data = data[i].split(',');
				if(user_data[0] == username){
					console.log(1);
					show_user(res,data[i].split(','));
					return;
				}
			}
			res.writeHead(302,{'Location': '/'});
		}
		res.end();
	});
}

function show_user(res,user_information){
	fs.readFile(process.cwd() + "/public/user.html",function(err,stdout,stderr){
		if(!err){
			var data = stdout.toString();
			data = data.replace(/#username/,user_information[0].toString());
			data = data.replace(/#number/,user_information[1].toString());
			data = data.replace(/#phone/,user_information[2].toString());
			data = data.replace(/#email/,user_information[3].toString());
			res.write(data.toString());
		}
		res.end();
	});
}