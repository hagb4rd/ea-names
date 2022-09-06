var {male, female} = require("./lib/names");
var {Person,Gender} = require("./lib/person");
Person.male = ()=> Person.create({sex:"Male"});
Person.female = () => Person.create({sex:"Female"});

module.exports = {
    Person: Person,
    Gender: Gender,
    male: male,
    female: female,
    rand: require('ea-lib').rand
}