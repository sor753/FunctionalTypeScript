"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapcat = exports.construct = exports.cat = exports.complement = exports.anyOf = exports.allOf = exports.onlyEven = exports.average = exports.doubleAll = exports.song = exports.lyricSegment = void 0;
const lodash_1 = __importDefault(require("lodash"));
const lyricSegment = (n) => {
    return lodash_1.default.chain([])
        .push((n + " bottles of beer on the wall"))
        .push((n + " bottles of beer"))
        .push("Take one down, pass it around")
        .tap((lyrics) => {
        if (n > 1) {
            lyrics.push((n - 1 + " bottles of beer on the wall."));
        }
        else {
            lyrics.push("No more bottles of beer on the wall!");
        }
    })
        .value();
};
exports.lyricSegment = lyricSegment;
const song = (start, end, lyricsGen) => {
    return lodash_1.default.reduce(lodash_1.default.range(start, end, -1), (acc, n) => {
        return acc.concat(lyricsGen(n));
    }, []);
};
exports.song = song;
// export const doubleAll = (array: number[]) => {
//   return _.map(array, (n) => n * 2)
// }
const doubleAll = (array) => array.map((n) => n * 2);
exports.doubleAll = doubleAll;
// export const average = (array: number[]) => {
//   const sum = _.reduce(array, (a, b) => a + b, 0)
//   return sum / _.size(array)
// }
const average = (array) => array.reduce((a, b) => a + b, 0) / array.length;
exports.average = average;
// export const onlyEven = (array: number[]) => {
//   return _.filter(array, (n) => n % 2 === 0)
// }
const onlyEven = (array) => array.filter((n) => n % 2 === 0);
exports.onlyEven = onlyEven;
const allOf = (...args) => {
    return args.every(Boolean);
};
exports.allOf = allOf;
const anyOf = (...args) => {
    return args.some(Boolean);
};
exports.anyOf = anyOf;
const complement = (pred) => {
    return function (...args) {
        return !pred(...args);
    };
};
exports.complement = complement;
// cat関数は、引数に渡された配列を結合する関数
// export const cat = (...args: any[]) => {
//   const head = _.first(args)
//   if (existy(head)) return head.concat.apply(head, _.tail(args))
//   else return []
// }
// export const cat = (...args: any[][]): any[] => {
//   const head = args[0]
//   return head ? head.concat(...args.slice(1)) : []
// }
const cat = (...arrays) => arrays.flat();
exports.cat = cat;
// construct関数は、引数に渡された配列の先頭に第一引数を追加する関数
// export const construct = (head: any, tail: any[]) => {
//   return cat([head], _.toArray(tail))
// }
const construct = (head, tail) => [head, ...tail];
exports.construct = construct;
// mapcat関数は、第一引数に渡された関数を第二引数に渡された配列の各要素に適用し、結果を結合する関数
// export const mapcat = (fun: (a: any) => any, coll: any[]) => {
//   return cat.apply(null, _.map(coll, fun))
// }
// export const mapcat = (fun: (a: any) => any, coll: any[]) =>
//   cat(...coll.map(fun))
const mapcat = (fun, coll) => coll.flatMap(fun);
exports.mapcat = mapcat;
