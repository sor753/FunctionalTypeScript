"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pop = exports.push = exports.mNeg2 = exports.mNote2 = exports.mSqr2 = exports.lift = exports.mNeg = exports.mNote = exports.mSqr = exports.actions = exports.pipline = exports.createPerson = void 0;
const lodash_1 = __importDefault(require("lodash"));
const module_1 = require("../sec1/module");
const module_2 = require("../sec5/module");
function createPerson() {
    let firstName = "";
    let lastName = "";
    let age = 0;
    return {
        setFirstName: function (fn) {
            firstName = fn;
            return this;
        },
        setLastName: function (ln) {
            lastName = ln;
            return this;
        },
        setAge: function (a) {
            age = a;
            return this;
        },
        toString: function () {
            return `${firstName} ${lastName}, ${age}`;
        },
    };
}
exports.createPerson = createPerson;
const pipline = (seed, ...fns) => {
    return fns.reduce((acc, fn) => fn(acc), seed);
};
exports.pipline = pipline;
const actions = (acts, done) => {
    return (seed) => {
        const init = { values: [], state: seed };
        const intermediate = acts.reduce((acc, act) => {
            const result = act(acc.state);
            const values = acc.values.concat(result.answer);
            return { values, state: result.state };
        }, init);
        const keep = intermediate.values.filter(module_1.existy);
        return done(keep, intermediate.state);
    };
};
exports.actions = actions;
const mSqr = () => (state) => {
    const answer = (0, module_2.sqr)(state);
    return { answer, state: answer };
};
exports.mSqr = mSqr;
const mNote = () => (state) => {
    (0, module_1.note)(state);
    return { answer: undefined, state };
};
exports.mNote = mNote;
const mNeg = () => (state) => {
    return { answer: -state, state: -state };
};
exports.mNeg = mNeg;
const lift = (answerFun, stateFun) => {
    return (...args) => (state) => {
        const answer = answerFun(state, ...args);
        const s = stateFun ? stateFun(state) : answer;
        return { answer, state: s };
    };
};
exports.lift = lift;
exports.mSqr2 = (0, exports.lift)(module_2.sqr);
exports.mNote2 = (0, exports.lift)(module_1.note, lodash_1.default.identity);
exports.mNeg2 = (0, exports.lift)((n) => -n);
exports.push = (0, exports.lift)((stack, e) => [e, ...stack]);
exports.pop = (0, exports.lift)(lodash_1.default.first, lodash_1.default.tail);
