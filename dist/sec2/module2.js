"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.restrict = exports.as = exports.rename = exports.project = void 0;
const lodash_1 = __importDefault(require("lodash"));
const project = (table, keys) => {
    return table.map((obj) => lodash_1.default.pick(obj, keys));
};
exports.project = project;
const rename = (obj, newNames) => {
    return lodash_1.default.reduce(newNames, (o, nu, old) => {
        if (lodash_1.default.has(obj, old)) {
            o[nu] = obj[old];
            return o;
        }
        else {
            return o;
        }
    }, lodash_1.default.omit(obj, lodash_1.default.keys(newNames)));
};
exports.rename = rename;
const as = (table, newNames) => {
    return table.map((obj) => (0, exports.rename)(obj, newNames));
};
exports.as = as;
const restrict = (table, pred) => {
    return table.filter(pred);
};
exports.restrict = restrict;
