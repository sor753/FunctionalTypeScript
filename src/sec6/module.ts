import _ from "lodash"
import { cat, construct } from "../sec2/module"
import { existy, second } from "../sec1/module"
import { rev } from "../sec4/module"
import { partial, partial1 } from "../sec5/module"

export const myLength = (arr: any[]): number => {
  if (_.isEmpty(arr)) return 0
  return 1 + myLength(_.tail(arr))
}

export const cycle = (times: number, arr: any[]): any[] => {
  if (times <= 0) return []
  return arr.concat(cycle(times - 1, arr))
}

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

export const constructPair = (
  pair: [any, any],
  rests: [any[], any[]],
): [any[], any[]] => [
  construct(_.first(pair), _.first(rests)!),
  construct(second(pair), second(rests)),
]

// export const unzip = (pairs: any): [any[], any[]] => {
//   if (_.isEmpty(pairs)) return [[], []]
//   return constructPair(_.first(pairs)!, unzip(_.rest(pairs)))
// }
// export const unzip = (pairs: [any, any][]): [any[], any[]] => {
//   if (_.isEmpty(pairs)) return [[], []];
//   return constructPair(_.first(pairs)!, unzip(_.rest(pairs)));
// }
export const unzip = <T, U>(pairs: [T, U][]): [T[], U[]] => {
  if (_.isEmpty(pairs)) return [[], []]
  return constructPair(_.head(pairs)!, unzip(_.tail(pairs)))
}

// export const nexts = (graph: [string, string][], node: string): string[] => {
//   if (_.isEmpty(graph)) return []
//   const pair = _.first(graph)
//   const from = _.first(pair)
//   const to = second(pair as any[])
//   const more = _.tail(graph)
//   if (_.isEqual(node, from)) return [to, ...nexts(more, node)]
//   return nexts(more, node)
// }
export const nexts = (
  graph: [string, string][],
  ...nodes: string[]
): string[] => {
  if (_.isEmpty(graph)) return []
  const pair = _.first(graph)
  const from = _.first(pair)
  const to = second(pair as any[])
  const more = _.tail(graph)
  if (nodes.includes(from!)) return [to, ...nexts(more, ...nodes)]
  return nexts(more, ...nodes)
}

export const depthSearch = (
  graph: [string, string][],
  nodes: string[],
  seen: string[] = [], // 累積変数 既に見たノードを記録する
): string[] => {
  // 終了条件 nodesが空の場合はseenを逆順にして返す
  if (_.isEmpty(nodes)) return rev(seen) as unknown as string[]

  const node = _.first(nodes) as string
  const more = _.tail(nodes)

  // 既に見たノードは無視する
  if (seen.includes(node)) return depthSearch(graph, more, seen)
  // 未探索のノードを探索する
  return depthSearch(graph, cat(nexts(graph, node), more), [node, ...seen])
}

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

export const andify = (
  ...preds: ((a: any) => boolean)[]
): ((...args: any[]) => boolean) => {
  if (_.isEmpty(preds)) return () => true
  return (...args: any[]) =>
    _.every(args, (arg) => _.every(preds, (pred) => pred(arg)))
}

export const orify = (
  ...preds: ((a: any) => boolean)[]
): ((...args: any[]) => boolean) => {
  if (_.isEmpty(preds)) return () => false
  return (...args: any[]) =>
    _.some(args, (arg) => _.some(preds, (pred) => pred(arg)))
}

export const evenSteven = (n: number): boolean => {
  if (n === 0) return true
  return oddJohn(Math.abs(n) - 1)
}
export const oddJohn = (n: number): boolean => {
  if (n === 0) return false
  return evenSteven(Math.abs(n) - 1)
}

export const deepClone = (obj: any): any => {
  if (!existy(obj) || !_.isObject(obj)) return obj

  if (_.isArray(obj)) return obj.map(deepClone)
  if (_.isObject(obj)) return _.mapValues(obj, deepClone)
  return obj
}

export const visit = (
  mapFun: (a: any) => any,
  resultFun: (a: any) => any,
  array: any[] | any,
) => {
  if (_.isArray(array)) return resultFun(array.map(mapFun))
  return resultFun(array)
}

// 子要素を展開した「後に」それぞれの要素にmapFunを実行し、その配列に対して深さ優先探索を行う
export const postDepth = (fun: (a: any) => any, ary: any): any =>
  visit(partial1(postDepth, fun), fun, ary)
// 子要素を展開する「前に」mapFunを実行する
export const preDepth = (fun: (a: any) => any, ary: any): any =>
  visit(partial1(preDepth, fun), fun, fun(ary))

export const evenOline = (n: number): boolean | Function =>
  n === 0 || partial1(oddOline, Math.abs(n) - 1)
export const oddOline = (n: number): boolean | Function =>
  n !== 0 && partial1(evenOline, Math.abs(n) - 1)

export const trampoline = (fun: Function, ...args: any[]) => {
  let result = fun(...args)
  while (_.isFunction(result)) result = result()
  return result
}

export const isEvenSafe = (n: number): boolean | Function =>
  n === 0 || trampoline(partial1(oddOline, Math.abs(n) - 1))
export const isOddSafe = (n: number): boolean | Function =>
  n !== 0 && trampoline(partial1(evenOline, Math.abs(n) - 1))

export const generator = (
  seed: number,
  current: (arg: any) => any,
  step: (arg: number) => number,
) => ({
  head: current(seed),
  tail: () => generator(step(seed), current, step),
})
export const genHead = (gen: any) => gen.head
export const genTail = (gen: any) => gen.tail()
export const ints = generator(0, _.identity, (n) => n + 1)

export const genTake = (n: number, gen: any) => {
  const doTake = (n: number, g: any, ret: any[]) => {
    if (n === 0) return ret
    return partial(doTake, n - 1, genTail(g), construct(genHead(g), ret))
  }
  return trampoline(doTake, n, gen, [])
}
