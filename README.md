# thinky.d.ts
**WARNING:** This project was build to personal usage and may contain bugs and incorrect typing definitions. Use at your own risk.

Typescript (.d.ts) definitions for Thinky, a RethinkDB ORM for Node.JS. Read the documentation in the official website of [thinky](http://thinky.io) and [rethinkdb](https://rethinkdb.com).

A usage example is included with the *d.ts*.

## Example
### Project structure
```
/
	/app
		/controllers
			persons.controller.ts
		/models
			person.model.ts
```

### Model
```typescript
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

```

### Controller
```typescript
"use strict";

import {Person} from "../models/person.model";
import {inspect} from 'util';

/**
 * The persons controller
 * Singleton class
 */
export class PersonsController {
    // Static properties
    private static instance : PersonsController = undefined;

    //Static methods
    static getInstance() : PersonsController {
        if (!this.instance){
            this.instance = new PersonsController();
        }
        return this.instance;
    }

    //Methods
    printPersons() {
        Person.run().then(
            (persons) => {
                console.log(inspect(persons));
            },
            (error) => {
                console.error(error);
            }
        )
    }

}

```

## License
[Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0.txt)