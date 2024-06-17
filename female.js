#!/usr/bin/env node
var n=require("./names");

var [count,...words]=process.argv.slice(2);
if(!words.length)
	words.push(String(Date.now()));
var hash=words.join(" ");

var rnd=n.rand(n.female,n.seed(hash));
var xs=Array.from({length:(count||1)},(v,k)=>k);
var names=xs.map(x=>rnd());
//process.stdout.write(names.join(" "));
console.log(xs.map(x=>rnd()).join(" "));
//console.log(xs.map(x=>f).join(" "));


