"use strict";
var person_model_1 = require("../models/person.model");
var util_1 = require('util');
var PersonsController = (function () {
    function PersonsController() {
    }
    PersonsController.getInstance = function () {
        if (!this.instance) {
            this.instance = new PersonsController();
        }
        return this.instance;
    };
    PersonsController.prototype.printPersons = function () {
        person_model_1.Person.run().then(function (persons) {
            console.log(util_1.inspect(persons));
        }, function (error) {
            console.error(error);
        });
    };
    PersonsController.instance = undefined;
    return PersonsController;
})();
exports.PersonsController = PersonsController;
