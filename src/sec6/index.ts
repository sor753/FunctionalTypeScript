import _ from "lodash"
import {
  andify,
  constructPair,
  cycle,
  deepClone,
  depthSearch,
  evenOline,
  evenSteven,
  genHead,
  genTail,
  genTake,
  ints,
  isEvenSafe,
  isOddSafe,
  myLength,
  nexts,
  oddOline,
  orify,
  postDepth,
  trampoline,
  unzip,
  visit,
} from "./module"
import { rev } from "../sec4/module"
import { isEven, isOdd } from "../sec3/module"

const sec6Modules = () => {
  // console.log(myLength(_.range(10)))
  // console.log(myLength([]))
  // console.log(myLength([1, 2, 3, 4, 5]))

  // console.log(cycle(3, [1, 2, 3]))
  // console.log(cycle(0, [1, 2, 3]))
  // console.log(_.take(cycle(20, [1, 2, 3]), 10))

  // // console.log(
  // //   constructPair([
  // //     ["a", 1],
  // //     ["b", 2],
  // //     ["c", 3],
  // //     ["d", 4],
  // //   ]),
  // // )
  // console.log(constructPair(["a", 1], [[], []]))
  // console.log(_.zip(["a"], [1]))
  // console.log(_.zip(...constructPair(["a", 1], [[], []])))
  // console.log(unzip(_.zip(["a", "b", "c"], [1, 2, 3])))

  const influences: [string, string][] = [
    ["Lisp", "Smalltalk"],
    ["Lisp", "Scheme"],
    ["Smalltalk", "Self"],
    ["Scheme", "JavaScript"],
    ["Scheme", "Lua"],
    ["Self", "Lua"],
    ["Self", "JavaScript"],
  ]
  // console.log(nexts(influences, "Lisp", "Smalltalk"))
  // console.log(depthSearch(influences, ["Lisp"], []))
  // console.log(depthSearch(influences, ["Smalltalk", "Self"], []))
  // console.log(depthSearch([["Lua", "Io"], ...influences], ["Lisp"], []))

  // const evenNum = andify(_.isNumber, isEven)
  // console.log(evenNum(1, 2))
  // console.log(evenNum(2, 4, 6, 8))
  // console.log(evenNum(2, 4, 6, 8, 9))

  // const zeroOrOdd = orify(isOdd, (n) => _.isEqual(n, 0))
  // console.log(zeroOrOdd())
  // console.log(zeroOrOdd(0, 2, 4, 6))
  // console.log(zeroOrOdd(2, 4, 6))

  // console.log("====================")

  // let x = [{ a: [1, 2, 3], b: 42 }, { c: { d: [] } }]
  // let y = deepClone(x)
  // console.log(_.isEqual(x, y))
  // y[1]["c"]["d"] = 42
  // console.log(_.isEqual(x, y))

  // console.log("====================")
  // console.log(visit(_.identity, _.isNumber, 42))
  // console.log(visit(_.identity, _.isNumber, "42"))
  // console.log(visit(_.isNumber, _.identity, [1, 2, null, 3, 4]))
  // console.log(visit((n) => n * 2, rev, _.range(10)))

  // console.log("====================")
  // console.log(postDepth(_.identity, influences))
  // console.log(postDepth((x) => (x === "Lisp" ? "LISP" : x), influences))
  // console.log(influences)

  // console.log("====================")
  // Maximum call stack size exceeded（最大呼び出しスタックサイズを超えました）
  // console.log(evenSteven(100000))

  // console.log("====================")
  // console.log(trampoline(evenSteven, 100))
  // console.log(trampoline(oddOline, 3))
  // console.log(trampoline(evenOline, 200000))
  // console.log(trampoline(oddOline, 300000))
  // console.log(trampoline(evenOline, 200000000))
  // console.log(isOddSafe(2000001))
  // console.log(isEvenSafe(2000001))

  console.log("====================")
  // console.log(genHead(ints))
  // console.log(genTail(ints))
  // console.log(genTail(genTail(ints)))
  // console.log(genTake(10, ints))
  // console.log(genTake(100, ints))
  // console.log(genTake(1000, ints))
  // console.log(genTake(10000, ints))
  console.log(genTake(100000, ints))
}

export default sec6Modules
