"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(require("lodash"));
const module_1 = require("./module");
const module_2 = require("../sec4/module");
const module_3 = require("../sec2/module");
const sec5Modules = () => {
    // const str = dispatch<string | any[]>(
    //   invoker("toString", Array.prototype.toString),
    //   invoker("toString", String.prototype.toString),
    // )
    // console.log(str("a"))
    // console.log(str(_.range(10)))
    // // console.log(str({}))
    // console.log(stringReverse("abc"))
    // // console.log(stringReverse(1))
    // const polyrev = dispatch(
    //   invoker("reverse", Array.prototype.reverse),
    //   stringReverse,
    // )
    // console.log(polyrev([1, 2, 3]))
    // console.log(polyrev("abc"))
    // const sillyReverse = dispatch(polyrev, always(42))
    // console.log(sillyReverse([1, 2, 3]))
    // console.log(sillyReverse("abc"))
    // console.log(sillyReverse(1000))
    // performAdminCommand({ type: "kill", hostname: "localhost" })
    // performAdminCommand({ type: "flail" })
    // performAdminCommand({ type: "notify", msg: "Hello" })
    // performTrialCommand({ type: "join", target: "foo" })
    // performTrialCommand({ type: "notify", msg: "Hi new user" })
    // console.log(["11", "11", "11", "11"].map(parseInt))
    // console.log(["11", "11", "11", "11"].map(curry(parseInt)))
    const div = (n, d) => n / d;
    // const div10 = curry2(div)(10)
    // console.log(div10(50))
    // const plays = [
    //   { artist: "Burial", track: "Archangel" },
    //   { artist: "Ben Frost", track: "Stomp" },
    //   { artist: "Ben Frost", track: "Stomp" },
    //   { artist: "Burial", track: "Archangel" },
    //   { artist: "Emeralds", track: "Snores" },
    //   { artist: "Burial", track: "Archangel" },
    // ]
    // console.log(_.countBy(plays, (song) => [song.artist, song.track].join(" - ")))
    // const sonfToStoring = (song: { artist: string; track: string }) =>
    //   [song.artist, song.track].join(" - ")
    // const songCount = curry2(_.countBy)(sonfToStoring) // To implementing songCount, countBy songToStoring
    // console.log(songCount(plays))
    // const songPlayed = curry3(_.uniq)(false)(sonfToStoring)
    // console.log(songPlayed(plays))
    // const over10Part = divPart(10)
    // console.log(over10Part(5))
    // const over10Part1 = partial1(div, 10)
    // console.log(over10Part1(5))
    // const div10By2 = partial2(div, 10, 2)
    // console.log(div10By2())
    // const over10Partial = partial(div, 10)
    // console.log(over10Partial(2))
    // const div10By2By4By500 = partial(div, 10, 2, 4, 500)
    // console.log(div10By2By4By500()) // 4, 500 は無視される
    const zero = (0, module_2.validator)("0ではいけません", (n) => n === 0);
    const number = (0, module_2.validator)("引数は数値である必要があります", lodash_1.default.isNumber);
    const sqr = (n) => {
        if (!number(n))
            throw new Error(number.message);
        if (zero(n))
            throw new Error(zero.message);
        return n * n;
    };
    console.log(sqr(10));
    // console.log(sqr(0))
    // console.log(sqr("10"))
    const sqrPre = (0, module_1.condition1)((0, module_2.validator)("0ではいけません", (0, module_3.complement)(zero)), (0, module_2.validator)("引数は数値である必要があります", lodash_1.default.isNumber));
    console.log(sqrPre(lodash_1.default.identity, 10));
    // console.log(sqrPre(_.identity, 0))
    // console.log(sqrPre(_.identity, "10"))
    const sqrPre2 = (0, module_1.condition)((0, module_2.validator)("0ではいけません", (0, module_3.complement)(zero)), (0, module_2.validator)("引数は数値である必要があります", lodash_1.default.isNumber));
    console.log(sqrPre2(lodash_1.default.identity, 10, 20));
    // console.log(sqrPre2(_.identity, 0, 10, 20))
    // console.log(sqrPre2(_.identity, "10", 20))
    const uncheckedSqr = (n) => n * n;
    // console.log(uncheckedSqr(""))
    const checkedSqr = (0, module_1.partial)(sqrPre2, uncheckedSqr);
    console.log(checkedSqr(10));
    // console.log(checkedSqr(""))
    // console.log(checkedSqr(0))
    console.log("====================================");
    const isntString1 = (n) => !lodash_1.default.isString(n);
    console.log(isntString1(1));
    // _.negateとは、述語関数を受け取り、その否定を返す関数を返す
    const isntString2 = lodash_1.default.negate(lodash_1.default.isString);
    console.log(isntString2(1));
    const isntString3 = lodash_1.default.flow(lodash_1.default.isString, (x) => !x);
    console.log(isntString3(1));
    const not = (x) => !x;
    const isntString4 = lodash_1.default.flow(lodash_1.default.isString, not);
    console.log(isntString4(1));
    console.log((0, module_1.flowedMapcat)([
        [1, 2],
        [3, 4],
        [5, 6],
    ], lodash_1.default.identity));
    console.log("====================================");
    const sqrPost = (0, module_1.condition1)((0, module_2.validator)("結果は数値である必要があります", lodash_1.default.isNumber), (0, module_2.validator)("結果はゼロではいけません", (0, module_3.complement)(zero)), (0, module_2.validator)("結果は正数である必要があります", (n) => n > 0));
    console.log(sqrPost(lodash_1.default.identity, 10));
    // console.log(sqrPost(_.identity, 0))
    // console.log(sqrPost(_.identity, "10"))
    // console.log(sqrPost(_.identity, -1))
    const megaCheckedSqr = lodash_1.default.flow(checkedSqr, (0, module_1.partial)(sqrPost, checkedSqr));
    console.log(megaCheckedSqr(10));
    // console.log(megaCheckedSqr(""))
    // console.log(megaCheckedSqr(0))
    console.log(megaCheckedSqr(-1));
    // console.log(megaCheckedSqr(NaN))
};
exports.default = sec5Modules;
