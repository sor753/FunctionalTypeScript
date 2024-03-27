"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasKeys = exports.validator = exports.checker = exports.doSomething = exports.defaults = exports.fnull = exports.makeUniqueStringFunction = exports.uniqueString = exports.invoker = exports.always = exports.iterateUntil = exports.repeatedly = exports.repeat = exports.best = exports.finder = void 0;
const lodash_1 = __importDefault(require("lodash"));
const module_1 = require("../sec1/module");
const finder = (valueFun, bestFun, coll) => {
    return lodash_1.default.reduce(coll, (best, current) => {
        const bestValue = valueFun(best);
        const currentValue = valueFun(current);
        return bestValue === bestFun(bestValue, currentValue) ? best : current;
    });
};
exports.finder = finder;
const best = (fun, coll) => {
    return lodash_1.default.reduce(coll, (x, y) => (fun(x, y) ? x : y));
};
exports.best = best;
const repeat = (times, value) => {
    return lodash_1.default.map(lodash_1.default.range(times), () => value);
};
exports.repeat = repeat;
const repeatedly = (times, fun) => {
    return lodash_1.default.map(lodash_1.default.range(times), fun);
};
exports.repeatedly = repeatedly;
const iterateUntil = (
// 実行関数
fun, 
// 終了条件
check, 
// 初期値
init) => {
    const ret = [];
    let result = fun(init);
    while (check(result)) {
        ret.push(result);
        result = fun(result);
    }
    return ret;
};
exports.iterateUntil = iterateUntil;
const always = (value) => () => value;
exports.always = always;
// メソッドを引数に取り、ターゲットとなるオブジェクトでそのメソッドを実行する関数を返す
const invoker = (name, method) => (target, ...args) => {
    if (!(0, module_1.existy)(target))
        (0, module_1.fail)("Must provide a target");
    return (0, module_1.doWhen)((0, module_1.existy)(target[name]) && method === target[name], () => target[name](args));
};
exports.invoker = invoker;
// String.substr()は非推奨なので、String.substring()を使う
// export const uniqueString = (len: number) => {
//   return Math.random().toString(36).substr(2, len)
// }
// substrの引数は開始位置と返される文字列の文字数
// substringは開始位置と終了位置
const uniqueString = (len) => {
    return Math.random()
        .toString(36)
        .substring(2, 2 + len);
};
exports.uniqueString = uniqueString;
const makeUniqueStringFunction = () => {
    let seed = 0;
    return (prefix) => {
        const unique = `${prefix}${seed}`;
        seed += 1;
        return unique;
    };
};
exports.makeUniqueStringFunction = makeUniqueStringFunction;
const fnull = (fun, ...defaults) => (...args) => {
    const newArgs = args.map((val, i) => ((0, module_1.existy)(val) ? val : defaults[i]));
    return fun(...newArgs);
};
exports.fnull = fnull;
const defaults = (df) => (obj, key) => {
    const val = (0, exports.fnull)(lodash_1.default.identity, df);
    return obj && val(obj[key]);
};
exports.defaults = defaults;
const doSomething = (config) => {
    const lookup = (0, exports.defaults)({ critical: 108, a: 1 });
    return lookup(config, "critical");
};
exports.doSomething = doSomething;
const checker = (...validators) => (obj) => validators.reduce((errs, check) => {
    if (check(obj)) {
        return errs;
    }
    return [...errs, check.message];
}, []);
exports.checker = checker;
const validator = (message, fun) => {
    const f = (args) => fun(args);
    f["message"] = message;
    return f;
};
exports.validator = validator;
const hasKeys = (...keys) => {
    const fun = (obj) => {
        return keys.every((key) => obj[key] !== undefined);
    };
    fun["message"] = `Must have values for keys: ${keys.join(", ")}`;
    return fun;
};
exports.hasKeys = hasKeys;
