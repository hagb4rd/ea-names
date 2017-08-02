var util = require('util');
var EventEmitter = require("events").EventEmitter;
var lib = exports;




var { abs, min, max, random, floor, ceil, round, sin, cos, pow } = Math;
function rand(a,b) {b=b||0; return floor(random()*(max(a,b)-min(a,b)))+min(a,b)};
function cmp(a,b) { return a-b; }; cmp.locale = (a,b) => String(a).localeCompare(String(b));
function range(a, b, step){ b=b||a||9; a=a||0; for (var r = []; r.length <= abs(b-a); r.push(min(a, b)+r.length*abs(step||1))) return r; };
function shuffle(o){for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x); return o;};
function map(arr,f){ arr=Array.from(arr); var xs = new Array(arr.length); for (var i = arr.length; i--> 0;) xs[i] = f(arr[i]); return xs; };
function WRGenerator(entries,event) {this.event=event||"emit"; this.total=0; this.entries=entries.sort((a,b)=>lib.cmp(b[1],a[1])).map(([key,val],i)=>(val=parseInt(val,10),this.total+=val,[key, {name:key,rank:i,score:val,bond:this.total}])); }; WRGenerator.prototype=new EventEmitter(); 
WRGenerator.prototype.rnd = function(n) { var next=()=>{var dice=rand(1,this.total); var result=this.entries.filter(entry=>entry[1].bond<=dice).sort((a,b)=>cmp(b[1].bond,a[1].bond))[0][1]; return result;}; if(n) { return Array.from({length:(+n)},(v,k)=>next());} else { return next() }}
WRGenerator.prototype.stats = function() { return this.entries.map(e=>[e[1].name,e[1].score]) };
WRGenerator.prototype.toJSON = function() { return JSON.stringify(this.stats()); }



exports.map = map;
exports.cmp = cmp;
exports.shuffle = shuffle;
exports.WRGenerator = WRGenerator;