import _ from "lodash"
import {
  splat,
  unsplat,
  parseAge,
  compareLessOrEqual,
  lameCSV,
  nth,
  selectNames,
  selectAges,
  selectHairColor,
  mergeResults,
  existy,
  truthy,
  doWhen,
  executeIfHasField,
} from "./module"

const sec1Modules = () => {
  const addArrayElements = splat((x: number, y: number, z: number) => x + y + z)
  console.log(addArrayElements([1, 2, 3])) // 6

  const joinElements = unsplat((array) => array.join(" "))
  console.log(joinElements(1, 2)) // "1 2"

  parseAge("太郎")

  console.log(nth(["a", "b", "c"], 1)) // "b"
  console.log(nth("abc", 0)) // "a"
  // console.log(nth("abc", 3)) // "Index out of bounds"

  const second = (a: any[] | string) => nth(a, 1)
  console.log(second(["a", "b"])) // "b";

  console.log([0, -1, -2].sort())
  console.log([0, -1, -2].sort(compareLessOrEqual)) // [-2, -1, 0]

  const peopleTable = lameCSV(
    "name, age, hair\nMerble, 35, red\nBob, 64, blonde",
  )
  console.log(peopleTable) // [["name", "age", "hair"], ["Merble", "35", "red"], ["Bob", "64", "blonde"]]log
  console.log(_.drop(peopleTable).sort())

  console.log(selectNames(peopleTable)) // ["Merble", "Bob"]
  console.log(selectAges(peopleTable)) // ["35", "64"]
  console.log(selectHairColor(peopleTable)) // ["red", "blonde"]
  console.log(mergeResults(selectNames(peopleTable), selectAges(peopleTable)))

  // console.log(existy(null)) // false
  // console.log(existy(undefined)) // false
  // console.log(existy(((): any => {})())) // false
  // console.log(existy(0)) // true
  // console.log(existy(false)) // true
  // console.log(existy("")) // true
  // console.log(existy({})) // true
  // console.log(existy([])) // true
  // console.log(existy([null])) // true
  // console.log(existy([undefined])) // true
  // console.log(existy([null, undefined])) // true

  // console.log(truthy(null)) // false
  // console.log(truthy(undefined)) // false
  // console.log(truthy(((): any => {})())) // false
  // console.log(truthy(0)) // true

  // doWhen(true, () => console.log("truthy")) // "truthy"
  // doWhen(false, () => console.log("falsy")) // undefined
  // doWhen(0, () => console.log("truthy")) // "truthy"
  // doWhen("", () => console.log("truthy")) // "truthy"
  // doWhen(null, () => console.log("truthy")) // undefined
  // doWhen(undefined, () => console.log("truthy")) // undefined
  // doWhen(((): any => {})(), () => console.log("truthy")) // undefined
  // doWhen({}, () => console.log("truthy")) // "truthy"
  // doWhen([], () => console.log("truthy")) // "truthy"
  // doWhen([null], () => console.log("truthy")) // "truthy"

  console.log(executeIfHasField({ name: "Boris" }, "name")) // "Boris"
  console.log(executeIfHasField({ name: "Boris" }, "age")) // undefined
  console.log(executeIfHasField([1, 2, 3], "reverse")) // undefined
}

export default sec1Modules
