import _ from "lodash"
import { existy } from "../sec1/module"

export const lyricSegment = (n: number): never[] => {
  return _.chain([])
    .push((n + " bottles of beer on the wall") as never)
    .push((n + " bottles of beer") as never)
    .push("Take one down, pass it around" as never)
    .tap((lyrics) => {
      if (n > 1) {
        lyrics.push((n - 1 + " bottles of beer on the wall.") as never)
      } else {
        lyrics.push("No more bottles of beer on the wall!" as never)
      }
    })
    .value()
}

export const song = (
  start: number,
  end: number,
  lyricsGen: (n: number) => never[],
) => {
  return _.reduce(
    _.range(start, end, -1),
    (acc, n) => {
      return acc.concat(lyricsGen(n))
    },
    [],
  )
}

// export const doubleAll = (array: number[]) => {
//   return _.map(array, (n) => n * 2)
// }
export const doubleAll = (array: number[]) => array.map((n) => n * 2)
// export const average = (array: number[]) => {
//   const sum = _.reduce(array, (a, b) => a + b, 0)
//   return sum / _.size(array)
// }
export const average = (array: number[]) =>
  array.reduce((a, b) => a + b, 0) / array.length

// export const onlyEven = (array: number[]) => {
//   return _.filter(array, (n) => n % 2 === 0)
// }
export const onlyEven = (array: number[]) => array.filter((n) => n % 2 === 0)

export const allOf = (...args: any[]) => {
  return args.every(Boolean)
}
export const anyOf = (...args: any[]) => {
  return args.some(Boolean)
}

export const complement = (pred: (...args: any[]) => boolean) => {
  return function (...args: any[]) {
    return !pred(...args)
  }
}

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
export const cat = <T>(...arrays: T[][]): T[] => arrays.flat()

// construct関数は、引数に渡された配列の先頭に第一引数を追加する関数
// export const construct = (head: any, tail: any[]) => {
//   return cat([head], _.toArray(tail))
// }
export const construct = (head: any, tail: any[]) => [head, ...tail]

// mapcat関数は、第一引数に渡された関数を第二引数に渡された配列の各要素に適用し、結果を結合する関数
// export const mapcat = (fun: (a: any) => any, coll: any[]) => {
//   return cat.apply(null, _.map(coll, fun))
// }
// export const mapcat = (fun: (a: any) => any, coll: any[]) =>
//   cat(...coll.map(fun))
export const mapcat = (fun: (a: any) => any[], coll: any[]): any[] =>
  coll.flatMap(fun)
