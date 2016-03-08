
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes');
var fs = require('fs');
var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index);
app.get('/getcity',function(req,res,next) {


	var cities = [];
	
	fs.readFile(__dirname + '/public/cities.txt',function(err,data) {
            if(err) throw err;
            cities = data.toString().split("\n");
            var myRe = new RegExp("^" + req.query.q);
        		console.log("MYRE: " + myRe);

				var jsonresult = [];
        		for(var i = 0; i < cities.length; i++) {
          		var result = cities[i].search(myRe); 
          		console.log(result);
          		if(result != -1) {        
	           		jsonresult.push({city:cities[i]});
          		} 
        }
           
        console.log(jsonresult);

	res.status(200).json(jsonresult);
          })
          


});     	

app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
