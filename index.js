var {male, female} = require("./lib/names");
var {Person,Gender} = require("./lib/person");
Person.male = male;
Person.female = female;

module.exports = {
    Person: Person,
    Gender: Gender,
    male: male.rnd.bind(male),
    female: female.rnd.bind(female)
}