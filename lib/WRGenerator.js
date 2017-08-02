var util = require('util');
var EventEmitter = require("events").EventEmitter;
//exports.story = story;
var lib = exports;


var WRGenerator = exports.WRGenerator = function WRGenerator(entries,event) {this.event=event||"emit"; this.total=0; this.entries=entries.sort((a,b)=>lib.cmp(b[1],a[1])).map(([key,val],i)=>(val=parseInt(val,10),this.total+=val,[key, {name:key,rank:i,score:val,bond:this.total}])); }; WRGenerator.prototype=new EventEmitter(); 
WRGenerator.prototype.rnd = function(n) { var next=()=>{var dice=lib.rand(1,this.total); var result=this.entries.filter(entry=>entry[1].bond<=dice).sort((a,b)=>lib.cmp(b[1].bond,a[1].bond))[0][1]; return result;}; if(n) { return Array.from({length:(+n)},(v,k)=>next());} else { return next() }}
WRGenerator.prototype.stats = function() { return this.entries.map(e=>[e[1].name,e[1].score]) };
WRGenerator.prototype.toJSON = function() { return JSON.stringify(this.stats()); }

