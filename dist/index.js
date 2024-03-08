"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(require("lodash"));
const sec1_1 = __importDefault(require("./sec1"));
lodash_1.default.times(4, () => {
    console.log("Hello, world!");
});
(0, sec1_1.default)();
