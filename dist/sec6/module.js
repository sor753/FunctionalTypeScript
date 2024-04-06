"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.genTake = exports.ints = exports.genTail = exports.genHead = exports.generator = exports.isOddSafe = exports.isEvenSafe = exports.trampoline = exports.oddOline = exports.evenOline = exports.preDepth = exports.postDepth = exports.visit = exports.deepClone = exports.oddJohn = exports.evenSteven = exports.orify = exports.andify = exports.depthSearch = exports.nexts = exports.unzip = exports.constructPair = exports.cycle = exports.myLength = void 0;
const lodash_1 = __importDefault(require("lodash"));
const module_1 = require("../sec2/module");
const module_2 = require("../sec1/module");
const module_3 = require("../sec4/module");
const module_4 = require("../sec5/module");
const myLength = (arr) => {
    if (lodash_1.default.isEmpty(arr))
        return 0;
    return 1 + (0, exports.myLength)(lodash_1.default.tail(arr));
};
exports.myLength = myLength;
const cycle = (times, arr) => {
    if (times <= 0)
        return [];
    return arr.concat((0, exports.cycle)(times - 1, arr));
};
exports.cycle = cycle;
// export const constructPair = (
//   ziped: [any, any][],
//   first: any[] = [],
//   second: any[] = [],
// ): [any[], any[]] => {
//   if (_.isEmpty(ziped) || !ziped[0]) return [first, second]
//   const [firstElement, secondElement] = ziped[0]
//   return constructPair(
//     ziped.slice(1),
//     [...first, firstElement],
//     [...second, secondElement],
//   )
// }
const constructPair = (pair, rests) => [
    (0, module_1.construct)(lodash_1.default.first(pair), lodash_1.default.first(rests)),
    (0, module_1.construct)((0, module_2.second)(pair), (0, module_2.second)(rests)),
];
exports.constructPair = constructPair;
// export const unzip = (pairs: any): [any[], any[]] => {
//   if (_.isEmpty(pairs)) return [[], []]
//   return constructPair(_.first(pairs)!, unzip(_.rest(pairs)))
// }
// export const unzip = (pairs: [any, any][]): [any[], any[]] => {
//   if (_.isEmpty(pairs)) return [[], []];
//   return constructPair(_.first(pairs)!, unzip(_.rest(pairs)));
// }
const unzip = (pairs) => {
    if (lodash_1.default.isEmpty(pairs))
        return [[], []];
    return (0, exports.constructPair)(lodash_1.default.head(pairs), (0, exports.unzip)(lodash_1.default.tail(pairs)));
};
exports.unzip = unzip;
// export const nexts = (graph: [string, string][], node: string): string[] => {
//   if (_.isEmpty(graph)) return []
//   const pair = _.first(graph)
//   const from = _.first(pair)
//   const to = second(pair as any[])
//   const more = _.tail(graph)
//   if (_.isEqual(node, from)) return [to, ...nexts(more, node)]
//   return nexts(more, node)
// }
const nexts = (graph, ...nodes) => {
    if (lodash_1.default.isEmpty(graph))
        return [];
    const pair = lodash_1.default.first(graph);
    const from = lodash_1.default.first(pair);
    const to = (0, module_2.second)(pair);
    const more = lodash_1.default.tail(graph);
    if (nodes.includes(from))
        return [to, ...(0, exports.nexts)(more, ...nodes)];
    return (0, exports.nexts)(more, ...nodes);
};
exports.nexts = nexts;
const depthSearch = (graph, nodes, seen = []) => {
    // 終了条件 nodesが空の場合はseenを逆順にして返す
    if (lodash_1.default.isEmpty(nodes))
        return (0, module_3.rev)(seen);
    const node = lodash_1.default.first(nodes);
    const more = lodash_1.default.tail(nodes);
    // 既に見たノードは無視する
    if (seen.includes(node))
        return (0, exports.depthSearch)(graph, more, seen);
    // 未探索のノードを探索する
    return (0, exports.depthSearch)(graph, (0, module_1.cat)((0, exports.nexts)(graph, node), more), [node, ...seen]);
};
exports.depthSearch = depthSearch;
// export const andify = (
//   ...preds: ((a: any) => boolean)[]
// ): ((...args: any[]) => boolean) => {
//   if (_.isEmpty(preds)) return () => true
//   return (...args: any[]) => {
//     const everything = (
//       ps: ((a: any) => boolean)[],
//       truth: boolean,
//     ): boolean => {
//       if (_.isEmpty(ps)) return truth
//       return _.every(args, _.first(ps)) && everything(_.tail(ps), truth)
//     }
//     return everything(preds, true)
//   }
// }
const andify = (...preds) => {
    if (lodash_1.default.isEmpty(preds))
        return () => true;
    return (...args) => lodash_1.default.every(args, (arg) => lodash_1.default.every(preds, (pred) => pred(arg)));
};
exports.andify = andify;
const orify = (...preds) => {
    if (lodash_1.default.isEmpty(preds))
        return () => false;
    return (...args) => lodash_1.default.some(args, (arg) => lodash_1.default.some(preds, (pred) => pred(arg)));
};
exports.orify = orify;
const evenSteven = (n) => {
    if (n === 0)
        return true;
    return (0, exports.oddJohn)(Math.abs(n) - 1);
};
exports.evenSteven = evenSteven;
const oddJohn = (n) => {
    if (n === 0)
        return false;
    return (0, exports.evenSteven)(Math.abs(n) - 1);
};
exports.oddJohn = oddJohn;
const deepClone = (obj) => {
    if (!(0, module_2.existy)(obj) || !lodash_1.default.isObject(obj))
        return obj;
    if (lodash_1.default.isArray(obj))
        return obj.map(exports.deepClone);
    if (lodash_1.default.isObject(obj))
        return lodash_1.default.mapValues(obj, exports.deepClone);
    return obj;
};
exports.deepClone = deepClone;
const visit = (mapFun, resultFun, array) => {
    if (lodash_1.default.isArray(array))
        return resultFun(array.map(mapFun));
    return resultFun(array);
};
exports.visit = visit;
// 子要素を展開した「後に」それぞれの要素にmapFunを実行し、その配列に対して深さ優先探索を行う
const postDepth = (fun, ary) => (0, exports.visit)((0, module_4.partial1)(exports.postDepth, fun), fun, ary);
exports.postDepth = postDepth;
// 子要素を展開する「前に」mapFunを実行する
const preDepth = (fun, ary) => (0, exports.visit)((0, module_4.partial1)(exports.preDepth, fun), fun, fun(ary));
exports.preDepth = preDepth;
const evenOline = (n) => n === 0 || (0, module_4.partial1)(exports.oddOline, Math.abs(n) - 1);
exports.evenOline = evenOline;
const oddOline = (n) => n !== 0 && (0, module_4.partial1)(exports.evenOline, Math.abs(n) - 1);
exports.oddOline = oddOline;
const trampoline = (fun, ...args) => {
    let result = fun(...args);
    while (lodash_1.default.isFunction(result))
        result = result();
    return result;
};
exports.trampoline = trampoline;
const isEvenSafe = (n) => n === 0 || (0, exports.trampoline)((0, module_4.partial1)(exports.oddOline, Math.abs(n) - 1));
exports.isEvenSafe = isEvenSafe;
const isOddSafe = (n) => n !== 0 && (0, exports.trampoline)((0, module_4.partial1)(exports.evenOline, Math.abs(n) - 1));
exports.isOddSafe = isOddSafe;
const generator = (seed, current, step) => ({
    head: current(seed),
    tail: () => (0, exports.generator)(step(seed), current, step),
});
exports.generator = generator;
const genHead = (gen) => gen.head;
exports.genHead = genHead;
const genTail = (gen) => gen.tail();
exports.genTail = genTail;
exports.ints = (0, exports.generator)(0, lodash_1.default.identity, (n) => n + 1);
const genTake = (n, gen) => {
    const doTake = (n, g, ret) => {
        if (n === 0)
            return ret;
        return (0, module_4.partial)(doTake, n - 1, (0, exports.genTail)(g), (0, module_1.construct)((0, exports.genHead)(g), ret));
    };
    return (0, exports.trampoline)(doTake, n, gen, []);
};
exports.genTake = genTake;
