"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(require("lodash"));
const module_1 = require("./module");
const sec1Modules = () => {
    const addArrayElements = (0, module_1.splat)((x, y, z) => x + y + z);
    console.log(addArrayElements([1, 2, 3])); // 6
    const joinElements = (0, module_1.unsplat)((array) => array.join(" "));
    console.log(joinElements(1, 2)); // "1 2"
    (0, module_1.parseAge)("太郎");
    console.log((0, module_1.nth)(["a", "b", "c"], 1)); // "b"
    console.log((0, module_1.nth)("abc", 0)); // "a"
    // console.log(nth("abc", 3)) // "Index out of bounds"
    const second = (a) => (0, module_1.nth)(a, 1);
    console.log(second(["a", "b"])); // "b";
    console.log([0, -1, -2].sort());
    console.log([0, -1, -2].sort(module_1.compareLessOrEqual)); // [-2, -1, 0]
    const peopleTable = (0, module_1.lameCSV)("name, age, hair\nMerble, 35, red\nBob, 64, blonde");
    console.log(peopleTable); // [["name", "age", "hair"], ["Merble", "35", "red"], ["Bob", "64", "blonde"]]log
    console.log(lodash_1.default.drop(peopleTable).sort());
    console.log((0, module_1.selectNames)(peopleTable)); // ["Merble", "Bob"]
    console.log((0, module_1.selectAges)(peopleTable)); // ["35", "64"]
    console.log((0, module_1.selectHairColor)(peopleTable)); // ["red", "blonde"]
    console.log((0, module_1.mergeResults)((0, module_1.selectNames)(peopleTable), (0, module_1.selectAges)(peopleTable)));
    // console.log(existy(null)) // false
    // console.log(existy(undefined)) // false
    // console.log(existy(((): any => {})())) // false
    // console.log(existy(0)) // true
    // console.log(existy(false)) // true
    // console.log(existy("")) // true
    // console.log(existy({})) // true
    // console.log(existy([])) // true
    // console.log(existy([null])) // true
    // console.log(existy([undefined])) // true
    // console.log(existy([null, undefined])) // true
    // console.log(truthy(null)) // false
    // console.log(truthy(undefined)) // false
    // console.log(truthy(((): any => {})())) // false
    // console.log(truthy(0)) // true
    // doWhen(true, () => console.log("truthy")) // "truthy"
    // doWhen(false, () => console.log("falsy")) // undefined
    // doWhen(0, () => console.log("truthy")) // "truthy"
    // doWhen("", () => console.log("truthy")) // "truthy"
    // doWhen(null, () => console.log("truthy")) // undefined
    // doWhen(undefined, () => console.log("truthy")) // undefined
    // doWhen(((): any => {})(), () => console.log("truthy")) // undefined
    // doWhen({}, () => console.log("truthy")) // "truthy"
    // doWhen([], () => console.log("truthy")) // "truthy"
    // doWhen([null], () => console.log("truthy")) // "truthy"
    console.log((0, module_1.executeIfHasField)({ name: "Boris" }, "name")); // "Boris"
    console.log((0, module_1.executeIfHasField)({ name: "Boris" }, "age")); // undefined
    console.log((0, module_1.executeIfHasField)([1, 2, 3], "reverse")); // undefined
};
exports.default = sec1Modules;
