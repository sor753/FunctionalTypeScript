"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const module_1 = require("./module");
const sec3Modules = () => {
    (0, module_1.stackBinder)("a", 1);
    (0, module_1.stackBinder)("b", 100);
    console.log((0, module_1.dynamicLookup)("a"));
    (0, module_1.stackBinder)("a", "*");
    console.log((0, module_1.dynamicLookup)("a"));
    (0, module_1.stackUnbinder)("a");
    console.log((0, module_1.dynamicLookup)("a"));
    console.log(module_1.globals);
    console.log((0, module_1.f)());
    console.log((0, module_1.g)());
    console.log(module_1.globals);
};
exports.default = sec3Modules;
