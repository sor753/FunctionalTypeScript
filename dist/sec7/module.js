"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Container = exports.merge = exports.freq = exports.skipTake = exports.generateString = exports.generateRandomCharacter = exports.randString = exports.rand = void 0;
const lodash_1 = __importDefault(require("lodash"));
const module_1 = require("../sec5/module");
const module_2 = require("../sec4/module");
exports.rand = (0, module_1.partial1)(lodash_1.default.random, 1);
const randString = (len) => {
    const ascii = (0, module_2.repeatedly)(len, () => (0, exports.rand)(36));
    return ascii.map((n) => n.toString(36)).join("");
};
exports.randString = randString;
const generateRandomCharacter = () => {
    return (0, exports.rand)(36).toString(36);
};
exports.generateRandomCharacter = generateRandomCharacter;
const generateString = (charGen, len) => {
    return (0, module_2.repeatedly)(len, charGen).join("");
};
exports.generateString = generateString;
// 数値nと配列collを受け取り、collのインデックスがnの倍数の要素を取り出した新たな配列を返す
const skipTake = (n, coll) => {
    let ret = [];
    const sz = lodash_1.default.size(coll);
    for (let index = 0; index < sz; index += n) {
        ret.push(coll[index]);
    }
    return ret;
};
exports.skipTake = skipTake;
exports.freq = (0, module_1.curry2)(lodash_1.default.countBy)(lodash_1.default.identity);
const merge = (...objs) => {
    return { ...objs };
};
exports.merge = merge;
class Container {
    constructor(_value) {
        this._value = _value;
    }
    update(fun, ...args) {
        const oldValue = this._value;
        this._value = fun(oldValue, ...args);
        return this._value;
    }
}
exports.Container = Container;
