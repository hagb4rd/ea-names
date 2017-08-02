var EventEmitter = require("events").EventEmitter;
var sqlite3 = require("sqlite3").verbose();
var fs = require("fs");
var path = require("path");


var names = require(path.resolve(__dirname + "/lib/names"));
names.Person = require(path.resolve(__dirname+ "/lib/person"));
names.lib = require(path.resolve(__dirname + "/lib/math"));

module.exports = names;