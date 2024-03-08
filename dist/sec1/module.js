"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeIfHasField = exports.doWhen = exports.truthy = exports.existy = exports.mergeResults = exports.selectHairColor = exports.selectAges = exports.selectNames = exports.lameCSV = exports.compareLessOrEqual = exports.nth = exports.parseAge = exports.unsplat = exports.splat = void 0;
const lodash_1 = __importDefault(require("lodash"));
function splat(fun) {
    return function (array) {
        return fun.apply(null, array);
    };
}
exports.splat = splat;
function unsplat(fun) {
    return function (..._args) {
        return fun.call(null, lodash_1.default.toArray(arguments));
    };
}
exports.unsplat = unsplat;
const fail = (thing) => {
    throw new Error(thing);
};
const warn = (thing) => {
    console.log(["WARNING:", thing].join(" "));
};
const note = (thing) => {
    console.log(["NOTE:", thing].join(" "));
};
const parseAge = (age) => {
    if (!lodash_1.default.isString(age))
        fail("Expecting a string");
    note("Attempting to parse an age");
    let a = parseInt(age, 10);
    if (lodash_1.default.isNaN(a)) {
        warn(["Could not parse age:", age].join(" "));
        a = 0;
    }
    return a;
};
exports.parseAge = parseAge;
const nth = (a, index) => {
    if (index < 0 || index >= a.length)
        fail("Index out of bounds");
    return a[index];
};
exports.nth = nth;
const lessOrEqual = (x, y) => x <= y;
const boolToCompare = (bool) => {
    return bool ? -1 : 1;
};
const compareLessOrEqual = (x, y) => {
    return boolToCompare(lessOrEqual(x, y));
};
exports.compareLessOrEqual = compareLessOrEqual;
const lameCSV = (str) => {
    return str.split("\n").map((line) => line.split(","));
};
exports.lameCSV = lameCSV;
const selectNames = (table) => {
    return lodash_1.default.tail(lodash_1.default.map(table, lodash_1.default.first));
};
exports.selectNames = selectNames;
const selectAges = (table) => {
    return lodash_1.default.tail(lodash_1.default.map(table, (row) => (0, exports.nth)(row, 1)));
};
exports.selectAges = selectAges;
const selectHairColor = (table) => {
    return lodash_1.default.tail(lodash_1.default.map(table, (row) => (0, exports.nth)(row, 2)));
};
exports.selectHairColor = selectHairColor;
exports.mergeResults = lodash_1.default.zip;
// 非等値演算子(!=)を使ってnullとundefinedを区別する
const existy = (x) => x != null;
exports.existy = existy;
// 与えられた値がtrueかどうかを判定する
const truthy = (x) => x !== false && (0, exports.existy)(x);
exports.truthy = truthy;
// 条件がtrueの場合にのみアクションを実行する
const doWhen = (cond, action) => {
    if ((0, exports.truthy)(cond))
        return action();
    return undefined;
};
exports.doWhen = doWhen;
// オブジェクトが指定されたフィールドを持っている場合にのみ実行する
const executeIfHasField = (target, name) => {
    return (0, exports.doWhen)((0, exports.existy)(target[name]), () => {
        const result = lodash_1.default.result(target, name);
        console.log(["The result is", result].join(" "));
        return result;
    });
};
exports.executeIfHasField = executeIfHasField;
