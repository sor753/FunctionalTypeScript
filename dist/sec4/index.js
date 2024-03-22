"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(require("lodash"));
const module_1 = require("./module");
const sec4Modules = () => {
    // const people = [
    //   { name: "Fred", age: 65 },
    //   { name: "Lucy", age: 36 },
    //   { name: "Curt", age: 55 },
    // ]
    // console.log(finder(_.identity, Math.max, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]))
    // console.log(finder(plucker("age"), Math.max, people))
    // console.log(
    //   finder(
    //     plucker("name"),
    //     (x: string, y: string) => (x.charAt(0) === "C" ? x : y),
    //     people,
    //   ),
    // )
    // console.log(best((x, y) => x > y, [1, 4, 5, 8, 9, 3, 7, 2, 6]))
    // console.log(repeat(4, "Major"))
    // console.log(repeatedly(4, () => Math.floor(Math.random() * 10)))
    // console.log(
    //   iterateUntil(
    //     (n: number) => n + n,
    //     (n: number) => n <= 1024,
    //     1,
    //   ),
    // )
    // const f = always(function () {})
    // console.log(f() === f())
    // const f2 = function () {
    //   return function () {}
    // }
    // console.log(f2() === f2())
    // // const f3 = always(() => {})
    // // console.log(f3() === f3())
    // // const f4 = () => {}
    // // console.log(f4() === f4())
    // const g = always(function () {})
    // console.log(g() === f())
    // console.log(repeatedly(3, always("Odelay")))
    // const rev = invoker("reverse", Array.prototype.reverse)
    // console.log(_.map([[1, 2, 3]], rev))
    // console.log(uniqueString(10))
    // const uniqueString2 = makeUniqueStringFunction()
    // console.log(uniqueString2("dari"))
    // console.log(uniqueString2("dari"))
    // const nums = [1, 2, 3, null, 5]
    // const safeMult = fnull((total: number, n: number) => total * n, 1, 1)
    // console.log(nums.reduce(safeMult))
    // console.log(doSomething({ critical: 9 }))
    // console.log(doSomething({ critical: 10 }))
    // console.log(doSomething({ a: 2 }))
    const passes = (0, module_1.always)(true);
    passes["message"] = "a failure in life";
    const alwaysPasses = (0, module_1.checker)(passes);
    console.log(alwaysPasses({}));
    const fails = (0, module_1.always)(false);
    fails["message"] = "a failure in life";
    const alwaysFails = (0, module_1.checker)(fails);
    console.log(alwaysFails({}));
    const gonnaFail = (0, module_1.checker)((0, module_1.validator)("ZOMG!", (0, module_1.always)(false)));
    console.log(gonnaFail(100));
    const aMap = (obj) => lodash_1.default.isObject(obj);
    const checkCommand = (0, module_1.checker)((0, module_1.validator)("must be a map", aMap), (0, module_1.hasKeys)("msg", "type"));
    console.log(checkCommand({ msg: "blah", type: "display" }));
    console.log(checkCommand({ msg: "blah" }));
    console.log(checkCommand({}));
    console.log(checkCommand(42));
};
exports.default = sec4Modules;
