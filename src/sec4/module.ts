import _ from "lodash"
import { doWhen, existy, fail } from "../sec1/module"

export const finder = (
  valueFun: (value: any) => any,
  bestFun: (x: any, y: any) => any,
  coll: any[] | { [key in string]: any },
) => {
  return _.reduce(coll, (best, current) => {
    const bestValue = valueFun(best)
    const currentValue = valueFun(current)
    return bestValue === bestFun(bestValue, currentValue) ? best : current
  })
}

export const best = (
  fun: (x: any, y: any) => any,
  coll: any[] | { [key in string]: any },
) => {
  return _.reduce(coll, (x, y) => (fun(x, y) ? x : y))
}

export const repeat = (times: number, value: any) => {
  return _.map(_.range(times), () => value)
}

export const repeatedly = (times: number, fun: () => any) => {
  return _.map(_.range(times), fun)
}

export const iterateUntil = (
  // 実行関数
  fun: (a: any) => any,
  // 終了条件
  check: (a: any) => boolean,
  // 初期値
  init: any,
) => {
  const ret = []
  let result = fun(init)
  while (check(result)) {
    ret.push(result)
    result = fun(result)
  }
  return ret
}

export const always: <T>(value: T) => () => T = (value) => () => value

export const invoker = (name: string, method: () => any) => {
  return (target: any, ...args: any[]) => {
    if (!existy(target)) fail("Must provide a target")
    const targetMethod = target[name]
    return doWhen(existy(targetMethod) && method === targetMethod, () =>
      targetMethod.apply(target, args),
    )
  }
}

// String.substr()は非推奨なので、String.substring()を使う
// export const uniqueString = (len: number) => {
//   return Math.random().toString(36).substr(2, len)
// }
// substrの引数は開始位置と返される文字列の文字数
// substringは開始位置と終了位置
export const uniqueString = (len: number) => {
  return Math.random()
    .toString(36)
    .substring(2, 2 + len)
}

export const makeUniqueStringFunction = () => {
  let seed = 0
  return (prefix: string) => {
    const unique = `${prefix}${seed}`
    seed += 1
    return unique
  }
}

export const fnull =
  (fun: (...args: any[]) => any, ...defaults: any[]) =>
  (...args: any[]) => {
    const newArgs = args.map((val, i) => (existy(val) ? val : defaults[i]))
    return fun(...newArgs)
  }

export const defaults =
  (df: { [key in string]: any }) =>
  (obj: { [key in string]: any }, key: string) => {
    const val = fnull(_.identity, df)
    return obj && val(obj[key])
  }

export const doSomething = (config: { [key in string]: any }) => {
  const lookup = defaults({ critical: 108, a: 1 })
  return lookup(config, "critical")
}

export const checker =
  (
    ...validators: {
      (...args: any[]): boolean
      message: string
    }[]
  ) =>
  (obj: { [key in string]: any } | any) =>
    validators.reduce((errs, check) => {
      if (check(obj)) {
        return errs
      }
      return [...errs, check.message]
    }, [] as string[])

export const validator = (message: string, fun: (value: any) => boolean) => {
  const f = (args: any) => fun(args)
  f["message"] = message
  return f
}

export const hasKeys = (...keys: string[]) => {
  const fun = (obj: { [key in string]: any }) => {
    return keys.every((key) => obj[key] !== undefined)
  }
  fun["message"] = `Must have values for keys: ${keys.join(", ")}`
  return fun
}
