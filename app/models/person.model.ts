"use strict";

import thinky = require("thinky");
import bluebird = require("bluebird");

var { createModel, r, type } = thinky();

export interface PersonAttributes {
    id? : string;
    name: string;
    dni : string;
    secondName : string;
}

export interface PersonDocument extends PersonAttributes, thinky.Document<PersonDocument, PersonModel, PersonAttributes> {
    say(message : string);
}

export interface PersonModel extends thinky.Model<PersonDocument, PersonModel,PersonAttributes> {
    getByDNI(dni : string) : bluebird.Thenable<PersonDocument>;
}

export var Person = createModel<PersonDocument, PersonModel, PersonAttributes>("people", {
    id: type.string(),
    name: type.string().required(),
    dni: type.string().required().alphanum(),
    secondName: type.string().optional().default("")
}, {
    enforce_extra : "remove"
});

//Indexes
Person.ensureIndex("dni");

//Static methods
function getByDNI(dni : string) : bluebird.Thenable<PersonDocument> {
    return Person.getAll(dni, {index: "dni"}).nth(0).run();
}
Person.defineStatic("getByDNI", getByDNI);

//Methods
function say(msg : string) {
    var self : PersonDocument = this;
    var personName = self.name;
    console.log("${personName} says \"${msg}\"");
}
Person.define("say", say);
