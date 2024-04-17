import _ from "lodash"
import { invoker, validator } from "../sec4/module"
import { condition1, dispatch, partial1, str } from "../sec5/module"
import { fail, note, second } from "../sec1/module"
import { pipline } from "../sec8/module"

export function lazyChain(obj: any) {
  const calls: any[] = []
  return {
    invoke: function (methodName: string, ...args: any[]) {
      calls.push((target: any) => {
        const meth = target[methodName]
        return meth.apply(target, args)
      })
      return this
    },
    force: () => {
      return calls.reduce((ret, thunk) => thunk(ret), obj)
    },
  }
}

export const deferredSort = (any: any[]) => lazyChain(any).invoke("sort")
export const force = (thunk: any) => thunk.force()

export const validateTriples = validator(
  "それぞれの配列は3つの要素を持つ必要があります。",
  (arrays: any[]) => arrays.every((array) => array.length === 3),
)
export const validateTripleStore = partial1(
  condition1(validateTriples),
  _.identity,
)

export const postProcess = (arrays: any[]) => arrays.map(second)

export const processTriples = (data: string) =>
  pipline(
    data,
    JSON.parse,
    validateTripleStore,
    deferredSort,
    force,
    postProcess,
    invoker("sort", Array.prototype.sort),
  )

// export const polyToString = (obj: any) => {
//   if (obj instanceof String) return obj
//   if (obj instanceof Array) return stringfyArray(obj)
//   return obj.toString()
// }
export const polyToString = dispatch(
  (s: any) => (_.isString(s) ? s : undefined),
  (s: any) => (_.isArray(s) ? stringfyArray(s) : undefined),
  (s: any) => (_.isObject(s) ? JSON.stringify(s) : undefined),
  (s: any) => s.toString(),
)
export const stringfyArray = (arr: any[]): string =>
  ["[", arr.map(polyToString).join(","), "]"].join("")

export class ContainerClass {
  constructor(public _value: any) {}

  public init(value: any) {
    this._value = value
  }
}
export class ObservableClass extends ContainerClass {
  public observe(f: any) {
    note("observerを設定")
  }
  public notify() {
    note("observersに通知")
  }
}
export class HoleClass extends ObservableClass {
  public init(value: any) {
    this.setValue(value)
  }
  public setValue(value: any) {
    this._value = value
    this.notify()
    return value
  }
}
export class CASClass extends HoleClass {
  swap(oldVal: any, newVal: any) {
    if (!_.isEqual(oldVal, this._value)) fail("現在値が一致しません")
    return this.setValue(newVal)
  }
}
export class TableBaseClass extends HoleClass {}
