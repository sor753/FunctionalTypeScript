"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.flowedMapcat = exports.condition = exports.condition1 = exports.partial = exports.partial2 = exports.partial1 = exports.divPart = exports.curry3 = exports.curry2 = exports.curry = exports.performTrialCommand = exports.performAdminCommand = exports.performCommand = exports.isa = exports.shutdown = exports.alert = exports.changeView = exports.notify = exports.stringReverse = exports.dispatch = void 0;
const lodash_1 = __importDefault(require("lodash"));
const module_1 = require("../sec1/module");
const module_2 = require("../sec2/module");
/**
 * dispatch関数は、複数の関数を受け取り、ターゲットオブジェクトと引数を渡して順番に実行します。
 * 各関数はターゲットオブジェクトと引数を受け取り、処理を行います。
 * 処理結果が存在する場合、それを返します。
 * 処理結果が存在しない場合、次の関数を実行します。
 * 最終的な処理結果を返します。
 */
const dispatch = (...funs) => (target, ...args) => {
    const ret = funs.reduce((acc, fun, i) => {
        if ((0, module_1.existy)(acc))
            return acc;
        return fun(target, ...args);
    }, undefined);
    return ret;
};
exports.dispatch = dispatch;
const stringReverse = (str) => lodash_1.default.isString(str) ? str.split("").reverse().join("") : undefined;
exports.stringReverse = stringReverse;
const notify = (msg) => {
    console.log(`notify: ${msg}`);
    return msg;
};
exports.notify = notify;
const changeView = (view) => {
    console.log(`changeView: ${view}`);
    return view;
};
exports.changeView = changeView;
const alert = (msg) => {
    console.log(`alert: ${msg}`);
    return msg;
};
exports.alert = alert;
const shutdown = (hostname) => {
    console.log(`shutdown: ${hostname}`);
    return hostname;
};
exports.shutdown = shutdown;
const isa = (type, action) => (obj) => {
    if (type === obj.type)
        return action(obj);
};
exports.isa = isa;
exports.performCommand = (0, exports.dispatch)((0, exports.isa)("notify", (obj) => (0, exports.notify)(obj.msg)), (0, exports.isa)("changeView", (obj) => (0, exports.changeView)(obj.view)), (obj) => (0, exports.alert)(obj.type));
exports.performAdminCommand = (0, exports.dispatch)((0, exports.isa)("kill", (obj) => (0, exports.shutdown)(obj.hostname)), exports.performCommand);
exports.performTrialCommand = (0, exports.dispatch)((0, exports.isa)("join", (obj) => (0, exports.alert)("許可されるまで参加できません")), exports.performAdminCommand);
const curry = (fun) => (arg) => fun(arg);
exports.curry = curry;
const curry2 = (fun) => (arg2) => (arg1) => fun(arg1, arg2);
exports.curry2 = curry2;
const curry3 = (fun) => (arg3) => (arg2) => (arg1) => fun(arg1, arg2, arg3);
exports.curry3 = curry3;
const divPart = (n) => (d) => n / d;
exports.divPart = divPart;
const partial1 = (fun, arg1) => (...args) => fun(arg1, ...args);
exports.partial1 = partial1;
const partial2 = (fun, arg1, arg2) => (...args) => fun(arg1, arg2, ...args);
exports.partial2 = partial2;
const partial = (fun, ...args) => (...rest) => fun(...args, ...rest);
exports.partial = partial;
const condition1 = (...validators) => (fun, arg) => {
    const errors = (0, module_2.mapcat)((isValid) => isValid(arg) ? [] : [isValid.message], validators);
    if (!lodash_1.default.isEmpty(errors))
        (0, module_1.fail)(errors.join(", "));
    return fun(arg);
};
exports.condition1 = condition1;
const condition = (...validators) => (fun, ...args) => {
    const errors = (0, module_2.mapcat)((isValid) => {
        const result = args.map((arg) => isValid(arg) ? [] : [isValid.message]);
        return result.flat();
    }, validators);
    if (!lodash_1.default.isEmpty(errors))
        (0, module_1.fail)(errors.join(", "));
    return fun(args);
};
exports.condition = condition;
exports.flowedMapcat = lodash_1.default.flow(lodash_1.default.map, (0, module_1.splat)(module_2.cat));
