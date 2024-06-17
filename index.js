var {male, female, males, females, db} = require("./lib/names");
var {Person,Gender} = require("./lib/person");
Person.male = ()=> Person.create({sex:"Male"});
Person.female = () => Person.create({sex:"Female"});

module.exports = {
    Person: Person,
    Gender: Gender,
    male: male,
    female: female,
    males: males,
    females: females,
    db: db
}
