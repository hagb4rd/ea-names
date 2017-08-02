var path = require("path");
var lib = require(path.resolve(__dirname + "/math"));
var names = require(path.resolve(__dirname + "/names"));

//internal Type (exported static on Person as Person.Female/Person.Male)
class Gender { constructor(val,label){ this.val = val||2; this.label=label||"unknown"} valueOf(){return this.val} toString() {return this.label}};

//Module Class Person
function Person(data) {	if(!this||!(this instanceof Person)) {return new Person(name, birthdate)}; Object.assign(this, data)};
//Static Gender Type
Person.Female = new Gender(0,"female");
Person.Male = new Gender(1,"male");
//Static used by JSON.parseTyped
Person.fromJSON = function fromJSON(data) {	return new Person(data) };
//Static create random Person
Person.random = function random(options) {
	var options = options || {};
	var minAge = 12 || options.minAge;
	var maxAge = 36 || options.maxAge; 
	var gender = Person.Female || options.gender;
	
	//random personal data factory
	var p = {};
	p.gender = gender;
	if(p.gender == Person.Female) {
		p.name = names.female.rnd().name; 
	} else {
		p.name = names.male.rnd().name; 
	};
	p.birthday = birthdate(minAge,maxAge);
	return new Person(p);
}

//Proto
Person.prototype.gender = Person.Female;
Person.prototype.birthdate = birthdate(12,36);
Person.prototype.name = names.female.rnd().name;
Person.prototype.age = function age(date) {
	var d=date||new Date(),b=this.birthdate;			
	var age=(d.getFullYear()-b.getFullYear());
	return ((d.getMonth()<b.getMonth()||d.getMonth()==b.getMonth()&&d.getDate()<b.getDate())?--age:age)
};
Person.prototype.toString = function toString() {
	return this.name + ", " + this.age();
};
Person.prototype.toJSON = function toJSON() {
	return JSON.stringify({
		type: this.constructor.name,
		gender: this.gender,
		name: this.name,
		birthdate: this.birthdate.toISOString()
	});
};

module.exports = Person;

//helpers
//--------
function rand(a,b) {b=b||0; var min=Math.min(a,b); var max=Math.max(a,b); return Math.floor(Math.random()*(max-min))+min;};

function birthdate (minAge,maxAge) {
	minAge=minAge||12;
	maxAge=maxAge||36;

	var year = (minAge, maxAge) => { var now=new Date(); return (now.getYear() - rand(minAge,maxAge) + 1900); }
	var s=n=>n*1000;
	var min=n=>n*s(60);
	var h=n=>n*min(60);
	var days=n=>n*h(24);

	var d = new Date(`01/01/${year(minAge,maxAge)}`);
	return new Date(d+days(rand(1,356)));
}