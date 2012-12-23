(function () {
"use strict";

// Add some methods to make coding easier
// No need to set the context of for instances
Object.defineProperties(Object.prototype, {
    defineProperty: {
        value: function (name, desc) {
            return Object.defineProperty(this, name, desc);
        }
    },
    defineProperties: { 
        value: function (props) {
            return Object.defineProperties(this, props);
        }
    },
    freeze: { 
        value: function () {
            return Object.freeze(this);
        }
    },
    isFrozen: {
        value: function () {
            return Object.isFrozen(this);
        }
    },
    seal: {
        value: function () {
            return Object.seal(this);
        }
    },
    isSealed: {
        value: function () {
            return Object.isSealed(this);
        }
    },
    preventExtensions: { 
        value: function () {
            return Object.preventExtensions(this);
        }
    },
    isExtensible: {
        value: function () {
            return Object.isExtensible(this);
        }
    },

});

// These functions are generated from coffee script
// Basic inheritance
var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { 
        // If the prototype is frozen, that means this class is final
        // AKA, no extending
        if (parent.prototype.isFrozen()) {
            throw new TypeError("Extending this class is forbidden");
        }

        for (var key in parent) { 
            if (__hasProp.call(parent, key)) 
                child.defineProperty(key, Object.getOwnPropertyDescriptor(parent, key));
        } 
        function ctor() { this.constructor = child; } 
        ctor.prototype = parent.prototype; 
        child.prototype = new ctor(); 
        child.__super__ = parent.prototype; 
        
            

        // Seal in the methods, methods that are overwritable are still overwritable
        if (parent.prototype.isSealed() || !parent.prototype.isExtensible()) {
            // We must add any overwritable methods
            Object.getOwnPropertyNames(parent.prototype).forEach(function (key) {
                if (key !== "constructor") {
                    // Add any writable methods so that they can be overridden.
                    var descriptor = Object.getOwnPropertyDescriptor(this, key);
                    if (descriptor.writable) {
                        child.prototype.defineProperty(key, descriptor);
                    }
                }
            }, parent.prototype);

            if (parent.prototype.isSealed()) {
                child.prototype.seal();
            } else {
                child.prototype.preventExtensions();
            }
            return child;
        }

        return child; 
    };



var Animal = (function () {
    function Animal(name, age) {
        this.defineProperties({
            name: {
                value: name,
                enumerable: true
            },
            age: {
                set: function (value) {
                    value = parseInt(value, 10);
                    console.assert(!isNaN(value), "value set on age is not a number");
                    age = value;
                },
                get: function () {
                    return age;
                },
                enumerable: true
            }
        });
    }
    
    Animal.prototype.defineProperties({
        bark: {
            value: function () {
                throw new Error("Subclass must implement this method");
            },
            writable: true
        } 
    });

    return Animal;
}());

var Dog = (function (_super) {

    // Add inheritance layer
    __extends(Dog, _super);

    function Dog() {
        Dog.__super__.constructor.apply(this, arguments);
    }

    Dog.prototype.defineProperties({
        bark: {
            value: function () {
                console.log("Bark");
            },
            writable: true
        } 
    });

    return Dog;
}(Animal));

var Bulldog = (function (_super) {

    __extends(Bulldog, _super);

    function Bulldog() {
        Dog.__super__.constructor.apply(this, arguments);
    }

    Bulldog.prototype.defineProperties({

        // If someone wants to inherit from Bulldog
        // They must use the same bark command
        bark: {
            value: function () {
                console.log(this.name + ": Woof");
            },
            writable: true
        }
    });

    Bulldog.prototype.seal();

    return Bulldog;
}(Dog));

var SuperBulldog = (function (_super) {

    __extends(SuperBulldog, _super);

    function SuperBulldog() {
        SuperBulldog.__super__.constructor.apply(this, arguments);
    }

    SuperBulldog.prototype.defineProperties({
        /*
         *  This will throw an error because the prototype is sealed
        fly: {
            value: function () {
                console.log(this.bark() + " I'm flying!");
            }
        } 
        */
        // We can add this method because it was already defined and is writable
        bark: {
            value: function () {
                SuperBulldog.__super__.bark.call(this);
                console.log("I am super dog!");
            },
            writable: false
        }
    });

    return SuperBulldog;
}(Bulldog));

var dog = new SuperBulldog("Butch", 4);
dog.bark();
// dog.name = "Foo"; //Error! Silent when not under strict mode
dog.age = "5";
console.log(typeof dog.age); // number

})();
