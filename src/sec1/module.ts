import _ from "lodash"

export function splat(fun: (...args: any[]) => any) {
  return function (array: any[]) {
    return fun.apply(null, array)
  }
}

export function unsplat(fun: (...args: any[]) => any) {
  return function (..._args: any[]) {
    return fun.call(null, _.toArray(arguments))
  }
}

const fail = (thing: string) => {
  throw new Error(thing)
}
const warn = (thing: string) => {
  console.log(["WARNING:", thing].join(" "))
}
const note = (thing: string) => {
  console.log(["NOTE:", thing].join(" "))
}

export const parseAge = (age: string) => {
  if (!_.isString(age)) fail("Expecting a string")

  note("Attempting to parse an age")
  let a = parseInt(age, 10)

  if (_.isNaN(a)) {
    warn(["Could not parse age:", age].join(" "))
    a = 0
  }
  return a
}

export const nth = (a: any[] | string, index: number) => {
  if (index < 0 || index >= a.length) fail("Index out of bounds")

  return a[index]
}

const lessOrEqual = (x: number, y: number) => x <= y
const boolToCompare = (bool: boolean) => {
  return bool ? -1 : 1
}
export const compareLessOrEqual = (x: number, y: number) => {
  return boolToCompare(lessOrEqual(x, y))
}

export const lameCSV = (str: string) => {
  return str.split("\n").map((line) => line.split(","))
}

export const selectNames = (table: string[][]) => {
  return _.tail(_.map(table, _.first))
}
export const selectAges = (table: string[][]) => {
  return _.tail(_.map(table, (row) => nth(row, 1)))
}
export const selectHairColor = (table: string[][]) => {
  return _.tail(_.map(table, (row) => nth(row, 2)))
}

export const mergeResults = _.zip

// 非等値演算子(!=)を使ってnullとundefinedを区別する
export const existy = (x: any) => x != null

// 与えられた値がtrueかどうかを判定する
export const truthy = (x: any) => x !== false && existy(x)

// 条件がtrueの場合にのみアクションを実行する
export const doWhen = (cond: any, action: () => void) => {
  if (truthy(cond)) return action()
  return undefined
}

// オブジェクトが指定されたフィールドを持っている場合にのみ実行する
export const executeIfHasField = (target: any, name: string) => {
  return doWhen(existy(target[name]), () => {
    const result = _.result(target, name)
    console.log(["The result is", result].join(" "))
    return result
  })
}
