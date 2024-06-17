#!/usr/bin/env node
var {male,female,seed,mrand,frand}=require("./names");

var [count,...words]=process.argv.slice(2);
if(!words.length)
	words.push(String(Date.now()));
var hash=words.join(" ");

var rnd=mrand(seed(hash));
var names=Array.from({length:(count||1)},(v,k)=>rnd());
console.log(names.join(" "));
