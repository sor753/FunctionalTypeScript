"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableBaseClass = exports.CASClass = exports.HoleClass = exports.ObservableClass = exports.ContainerClass = exports.stringfyArray = exports.polyToString = exports.processTriples = exports.postProcess = exports.validateTripleStore = exports.validateTriples = exports.force = exports.deferredSort = exports.lazyChain = void 0;
const lodash_1 = __importDefault(require("lodash"));
const module_1 = require("../sec4/module");
const module_2 = require("../sec5/module");
const module_3 = require("../sec1/module");
const module_4 = require("../sec8/module");
function lazyChain(obj) {
    const calls = [];
    return {
        invoke: function (methodName, ...args) {
            calls.push((target) => {
                const meth = target[methodName];
                return meth.apply(target, args);
            });
            return this;
        },
        force: () => {
            return calls.reduce((ret, thunk) => thunk(ret), obj);
        },
    };
}
exports.lazyChain = lazyChain;
const deferredSort = (any) => lazyChain(any).invoke("sort");
exports.deferredSort = deferredSort;
const force = (thunk) => thunk.force();
exports.force = force;
exports.validateTriples = (0, module_1.validator)("それぞれの配列は3つの要素を持つ必要があります。", (arrays) => arrays.every((array) => array.length === 3));
exports.validateTripleStore = (0, module_2.partial1)((0, module_2.condition1)(exports.validateTriples), lodash_1.default.identity);
const postProcess = (arrays) => arrays.map(module_3.second);
exports.postProcess = postProcess;
const processTriples = (data) => (0, module_4.pipline)(data, JSON.parse, exports.validateTripleStore, exports.deferredSort, exports.force, exports.postProcess, (0, module_1.invoker)("sort", Array.prototype.sort));
exports.processTriples = processTriples;
// export const polyToString = (obj: any) => {
//   if (obj instanceof String) return obj
//   if (obj instanceof Array) return stringfyArray(obj)
//   return obj.toString()
// }
exports.polyToString = (0, module_2.dispatch)((s) => (lodash_1.default.isString(s) ? s : undefined), (s) => (lodash_1.default.isArray(s) ? (0, exports.stringfyArray)(s) : undefined), (s) => (lodash_1.default.isObject(s) ? JSON.stringify(s) : undefined), (s) => s.toString());
const stringfyArray = (arr) => ["[", arr.map(exports.polyToString).join(","), "]"].join("");
exports.stringfyArray = stringfyArray;
class ContainerClass {
    constructor(_value) {
        this._value = _value;
    }
    init(value) {
        this._value = value;
    }
}
exports.ContainerClass = ContainerClass;
class ObservableClass extends ContainerClass {
    observe(f) {
        (0, module_3.note)("observerを設定");
    }
    notify() {
        (0, module_3.note)("observersに通知");
    }
}
exports.ObservableClass = ObservableClass;
class HoleClass extends ObservableClass {
    init(value) {
        this.setValue(value);
    }
    setValue(value) {
        this._value = value;
        this.notify();
        return value;
    }
}
exports.HoleClass = HoleClass;
class CASClass extends HoleClass {
    swap(oldVal, newVal) {
        if (!lodash_1.default.isEqual(oldVal, this._value))
            (0, module_3.fail)("現在値が一致しません");
        return this.setValue(newVal);
    }
}
exports.CASClass = CASClass;
class TableBaseClass extends HoleClass {
}
exports.TableBaseClass = TableBaseClass;
