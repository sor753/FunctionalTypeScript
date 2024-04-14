"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(require("lodash"));
const module_1 = require("./module");
const module2_1 = require("../sec2/module2");
const module_2 = require("../sec5/module");
const sec8Modules = () => {
    // console.log(
    //   createPerson()
    //     .setFirstName("Simon")
    //     .setLastName("Petrikov")
    //     .setAge(28)
    //     .toString(),
    // )
    const library = [
        { title: "SICP", isbn: "0262010771", ed: 1 },
        { title: "SICP", isbn: "0262510871", ed: 2 },
        { title: "Joy of Clojure", isbn: "1935182641", ed: 1 },
    ];
    // const titles = _.chain(library)
    //   // .tap((books) => console.log(books))
    //   .map((book) => book.title)
    // // console.log(sortByTitle)
    // console.log(titles.value())
    // const sortByTitle = _.chain(titles).sortBy()
    // console.log(sortByTitle.value())
    // console.log(library)
    // console.log(pipline())
    // console.log(pipline(42))
    // console.log(pipline(42, (n: number) => -n))
    const rest = (array) => [...array.slice(1)];
    const first = (array) => array[0];
    const fifth = (a) => (0, module_1.pipline)(a, rest, rest, rest, rest, first);
    // console.log(fifth([1, 2, 3, 4, 5])) // 5;
    const negativeFitth = (a) => (0, module_1.pipline)(a, fifth, (n) => -n);
    // console.log(negativeFitth([1, 2, 3, 4, 5])) // -5;
    const RQL = {
        select: (0, module_2.curry2)(module2_1.project),
        as: (0, module_2.curry2)(module2_1.as),
        where: (0, module_2.curry2)(module2_1.restrict),
    };
    const firstEditions = (table) => {
        return (0, module_1.pipline)(table, RQL.as({ ed: "edition" }), RQL.select(["title", "edition", "isbn"]), RQL.where((book) => book.edition === 1));
    };
    // const firstEditions = (table: any[]) => {
    //   return pipline(
    //     table,
    //     (t: any[]) => as(t, { ed: "edition" }),
    //     (t: any[]) => project(t, ["title", "edition", "isbn"]),
    //     (t: any[]) => restrict(t, (book: any) => book.edition === 1),
    //   )
    // }
    // console.log(firstEditions(library)) // [{ title: "SICP", isbn: "0262010771", edition: 1 }, { title: "Joy of Clojure", isbn: "1935182641", edition: 1 }];
    // const doubleSquareAction = actions([mSqr(), mSqr()], (value: number) => value)
    // console.log(doubleSquareAction(10)) // [100, 10000];
    // const negativeSqrAction = actions(
    //   [mSqr(), mNote(), mNeg()],
    //   (_: any, state: number) => state,
    // )
    // console.log(negativeSqrAction(9)) // -81;
    // const negativeSqrAction2 = actions(
    //   [mSqr2(), mNote2(), mNeg2()],
    //   (notUsed: any, state: number) => state,
    // )
    // console.log(negativeSqrAction2(7)) // -49;
    const stackAction = (0, module_1.actions)([(0, module_1.push)(1), (0, module_1.push)(2), (0, module_1.pop)()], (values, _) => values);
    // console.log(stackAction([]))
    console.log((0, module_1.pipline)([], stackAction, lodash_1.default.chain).map((elem) => console.log(elem)));
};
exports.default = sec8Modules;
