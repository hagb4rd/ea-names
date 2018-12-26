var path = require("path");
var util = require("util");
var names = require("./names");
var lib = require("ea-lib");
var {female, male, db} = require('./names');




//Static Gender Type
var Gender = exports.Gender =  ["Female", "Male"];
Gender.Female = "Female";
Gender.Male = "Male";
Gender.Any = () => {
	return lib.rand(Gender);
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

		this.name=options.name
			? options.name
			: this.sex=="Female"
				? female()
				: male();

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
		return `${this.sex}(${this.name}, ${this.age()})`
	}
	toString() {
		return this.name + ', ' + this.age();
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
}

/*
module.exports = {
	Person: Person,
	Gender: Gender
}
/* */
