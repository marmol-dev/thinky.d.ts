"use strict";
var thinky = require("thinky");
var _a = thinky(), createModel = _a.createModel, r = _a.r, type = _a.type;
exports.Person = createModel("people", {
    id: type.string(),
    name: type.string().required(),
    dni: type.string().required().alphanum(),
    secondName: type.string().optional().default("")
}, {
    enforce_extra: "remove"
});
exports.Person.ensureIndex("dni");
function getByDNI(dni) {
    return exports.Person.getAll(dni, { index: "dni" }).nth(0).run();
}
exports.Person.defineStatic("getByDNI", getByDNI);
function say(msg) {
    var self = this;
    var personName = self.name;
    console.log("${personName} says \"${msg}\"");
}
exports.Person.define("say", say);
