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
