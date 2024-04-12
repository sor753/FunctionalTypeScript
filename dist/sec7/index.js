"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const module_1 = require("./module");
const sec7Modules = () => {
    // console.log(rand(100))
    // console.log(repeatedly(10, () => rand(10)))
    // console.log(
    //   _.take(
    //     repeatedly(100, () => rand(10)),
    //     5,
    //   ),
    // )
    // console.log(randString(0))
    // console.log(randString(1))
    // console.log(randString(10))
    // console.log(generateString(generateRandomCharacter, 20))
    // console.log(skipTake(2, [1, 2, 3, 4, 5, 6, 7, 8, 9]))
    // console.log(skipTake(3, _.range(20)))
    // console.log(freq([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3]))
    // const a = repeatedly(100, () => rand(2))
    // console.log(freq(a))
    // const copy = _.clone(a)
    // console.log(freq(copy))
    // console.log(_.isEqual(freq(a), freq(copy)))
    // console.log(_.isEqual(a, copy))
    // const person = { fname: "Simon" }
    // // _.extend(person, { lname: "Petrikov" }, { age: 28 }, { age: 108 })
    // merge(person, { lname: "Petrikov" }, { age: 28 }, { age: 108 })
    // console.log(person)
    const aNumber = new module_1.Container(42);
    console.log(aNumber);
    aNumber.update((n) => n + 1);
    console.log(aNumber);
    aNumber.update((n, x, y, z) => n / x / y / z, 1, 2, 3);
    console.log(aNumber);
};
exports.default = sec7Modules;
