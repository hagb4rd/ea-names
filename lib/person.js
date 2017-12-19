var path = require("path");
var lib = require("ea-lib");
var names = require("./names");
var util = require("util");

//internal Type (exported static on Person as Gender.Female/Gender.Male)
var Gender = exports.Gender = class Gender { 
	constructor(val,label){ 
		this.val = val||2; 
		this.label=label||"unknown"
	} 
	get [Symbol.toStringTag]() {
		return this.label;
	}
	static fromJSON(data) {
		return (data?Gender.Female:Gender.Male);
	}
	toJSON(){
		self=this;
		return {
			type: self.constructor.name,
			data: self.valueOf()
		}
	}
	valueOf(){return this.val} 
	inspect(){return this.toString()}
	toString() {return this.label}
};

//Static Gender Type
Gender.Female = new Gender(0,"Female");
Gender.Male = new Gender(1,"Male");
Gender.Any = () => { 
	var pool=[Gender.Male, Gender.Female, Gender.Female, Gender.Female]; 
	return pool[lib.rand(0,pool.length-1)];
}

//Module Class Person
var Person = exports.Person = class Person {
	constructor(options) {
		var options = options || {};
		var minAge = options.minAge || 12;
		var maxAge = options.maxAge || 42; 
		var age = options.age || lib.rand(minAge,maxAge);

		//random personal data factory
		
		this.sex=options.sex || Gender.Any();
		this.name=options.name||(this.sex==Gender.Female?names.female.rnd().name:names.male.rnd().name);
		this.birthdate=options.birthdate || Person.birthdate(age);
	}
	static birthdate(minAge,maxAge) {
		if(!minAge) {
			minAge=12;
			maxAge=36;
		} else {
			maxAge=maxAge||minAge;
		}
		var year=(minAge,maxAge)=>{var now=new Date(); return (now.getYear()-lib.rand(minAge,maxAge)+1900); }
		var s=n=>n*1000;
		var min=n=>n*s(60);
		var h=n=>n*min(60);
		var days=n=>n*h(24);

		var d = new Date(`01/01/${year(minAge,maxAge)}`);
		return new Date((+d)+days(lib.rand(0,355)));
	}
	static create(options) {
		return new Person(options)
	}
	static fromJSON(data) {	
		return Person.create(data) 
	}
	get [Symbol.toStringTag]() {
		return `${this.sex.label}(${this.name}, ${this.age()})`
	}
	age (date) {
		var d=date||new Date(),b=this.birthdate;			
		var age=(d.getFullYear()-b.getFullYear());
		return ((d.getMonth()<b.getMonth()||d.getMonth()==b.getMonth()&&d.getDate()<b.getDate())?--age:age)
	}
	toJSON() {
		var self = this;
		return {
			type: this.constructor.name,
			data: {
				sex: this.sex,
				name: this.name,
				birthdate: this.birthdate.toISOString()
			}		
		}
	}
	inspect() {
		return this.toString()
	}
} 

/*
module.exports = {
	Person: Person,
	Gender: Gender
}
/* */