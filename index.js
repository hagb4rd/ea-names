var EventEmitter = require("events").EventEmitter;
var sqlite3 = require("sqlite3").verbose();
var fs = require("fs");
var female = exports.female = require("./entries-female.json");
var male = exports.male = require("./entries-male.json");




var db = exports.db = new sqlite3.Database(__dirname + "/names-1.sqlite");

exports.restore = function() { 
		
		var execString = fs.readFileSync(__dirname + "/names-ny-1981.sql", {encoding: "utf8"});
		return	db.exec(execString);
} 



var quuery = exports.query = sql => {
	sql = sql || 'SELECT * FROM "names" LIMIT 10';
	
	return new Promise((resolve,reject) => {
	
		db.all(sql, (err, rows) => {
			if(err)
				reject(err);
			resolve(rows);
		});	
    });	
};

var help = exports.help = "require(\"ea-names\").query('SELECT * FROM \"names\" LIMIT 10').then(util.inspect).then(console.log)";
var test = exports.test = function() {
	
	query().then(util.inspect).then(results=>{
		console.log("require(\"ea-names\").query('SELECT * FROM \"names\" LIMIT 10').then(util.inspect).then(console.log)",
					"\r\n",
					"--------------------------------------------------------------------------------------------",
					"\r\n",
					results);
		return results;
	});		
}
	
	   
//db.close();  