"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.plucker = exports.g = exports.f = exports.dynamicLookup = exports.stackUnbinder = exports.stackBinder = exports.globals = void 0;
const lodash_1 = __importDefault(require("lodash"));
exports.globals = {};
const makeBindFun = (resolver) => {
    return (k, v) => {
        let stack = exports.globals[k] || [];
        exports.globals[k] = resolver(stack, v);
        return exports.globals;
    };
};
exports.stackBinder = makeBindFun((stack, v) => {
    stack.push(v);
    return stack;
});
exports.stackUnbinder = makeBindFun((stack, _) => {
    stack.pop();
    return stack;
});
const dynamicLookup = (k) => {
    const slot = exports.globals[k] || [];
    return lodash_1.default.last(slot);
};
exports.dynamicLookup = dynamicLookup;
const f = () => (0, exports.dynamicLookup)("a");
exports.f = f;
const g = () => {
    (0, exports.stackBinder)("a", "g");
    return (0, exports.f)();
};
exports.g = g;
const plucker = (field) => (obj) => obj && obj[field];
exports.plucker = plucker;
