
var lib=module.exports;
var seed=lib.seed=require("./seed"); var rand=lib.rand=require("./random");
var female=lib.female=JSON.parse(require("fs").readFileSync(require("path").join(__dirname,"lib/female.json"),{encoding:"utf-8"}));
var male=lib.male=JSON.parse(require("fs").readFileSync(require("path").join(__dirname,"lib/male.json"),{encoding:"utf-8"}));


var frand=lib.frand=(r)=>rand(female,r);
var mrand=lib.mrand=(r)=>rand(male,r);
var f=lib.f=frand(seed(String(Date.now())));
var m=lib.m=mrand(seed(String(Date.now())));
