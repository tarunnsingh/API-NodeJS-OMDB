var express = require("express");
var app = express();
var request = require("request");
app.set("view engine","ejs");

// app.get("/", function(req, res){
// 	res.render("search");
// })

app.get("/",function(req, res){
	var city = jsUcfirst("jaipur");
	console.log(city);
	var url = "http://postalpincode.in/api/postoffice/" + city;
	request(url, function(error, response, body){
			if(!error && response.statusCode == 200){
			var data = JSON.parse(body);
			var numberOfPlaces = Object.keys(data.PostOffice).length;
			
			console.log(numberOfPlaces);
			
			data["PostOffice"].forEach(function(location){
				if(location["Name"]===city){
					
					console.log(location["PINCode"]);
				}
			})
			res.send(data);
		}  
	});
});

function jsUcfirst(string) 
{

    return string.charAt(0).toUpperCase() + string.slice(1);

}

app.listen("3000",function(){
	console.log("Movie Server Started");
});