import _ from "lodash"
import { existy, fail, splat } from "../sec1/module"
import { cat, complement, mapcat } from "../sec2/module"
import { validator } from "../sec4/module"
/**
 * dispatch関数は、複数の関数を受け取り、ターゲットオブジェクトと引数を渡して順番に実行します。
 * 各関数はターゲットオブジェクトと引数を受け取り、処理を行います。
 * 処理結果が存在する場合、それを返します。
 * 処理結果が存在しない場合、次の関数を実行します。
 * 最終的な処理結果を返します。
 */

export const dispatch =
  <T>(...funs: Function[]) =>
  (target: T, ...args: any[]) => {
    const ret = funs.reduce((acc, fun, i) => {
      if (existy(acc)) return acc
      return fun(target, ...args)
    }, undefined)
    return ret
  }

export const stringReverse = (str: string) =>
  _.isString(str) ? str.split("").reverse().join("") : undefined

export const notify = (msg: string) => {
  console.log(`notify: ${msg}`)
  return msg
}
export const changeView = (view: string) => {
  console.log(`changeView: ${view}`)
  return view
}
export const alert = (msg: string) => {
  console.log(`alert: ${msg}`)
  return msg
}
export const shutdown = (hostname: string) => {
  console.log(`shutdown: ${hostname}`)
  return hostname
}
export const isa =
  (type: string, action: Function) =>
  (obj: any): Function | undefined => {
    if (type === obj.type) return action(obj)
  }
export const performCommand = dispatch(
  isa("notify", (obj: any) => notify(obj.msg)),
  isa("changeView", (obj: any) => changeView(obj.view)),
  (obj: any) => alert(obj.type),
)
export const performAdminCommand = dispatch(
  isa("kill", (obj: any) => shutdown(obj.hostname)),
  performCommand,
)
export const performTrialCommand = dispatch(
  isa("join", (obj: any) => alert("許可されるまで参加できません")),
  performAdminCommand,
)

export const curry = (fun: Function) => (arg: any) => fun(arg)
export const curry2 = (fun: Function) => (arg2: any) => (arg1: any) =>
  fun(arg1, arg2)
export const curry3 =
  (fun: Function) => (arg3: any) => (arg2: any) => (arg1: any) =>
    fun(arg1, arg2, arg3)

export const divPart = (n: number) => (d: number) => n / d

export const partial1 =
  (fun: Function, arg1: any) =>
  (...args: any[]) =>
    fun(arg1, ...args)

export const partial2 =
  (fun: Function, arg1: any, arg2: any) =>
  (...args: any[]) =>
    fun(arg1, arg2, ...args)

export const partial =
  (fun: Function, ...args: any[]) =>
  (...rest: any[]) =>
    fun(...args, ...rest)

export const condition1 =
  (...validators: { (args: any): boolean; message: string }[]) =>
  (fun: Function, arg: any) => {
    const errors = mapcat(
      (isValid: { (args: any): boolean; message: string }) =>
        isValid(arg) ? [] : [isValid.message],
      validators,
    )
    if (!_.isEmpty(errors)) fail(errors.join(", "))
    return fun(arg)
  }

export const condition =
  (...validators: { (args: any): boolean; message: string }[]) =>
  (fun: Function, ...args: any[]) => {
    const errors = mapcat(
      (isValid: { (args: any): boolean; message: string }) => {
        const result = args.map((arg) =>
          isValid(arg) ? [] : [isValid.message],
        )
        return result.flat()
      },
      validators,
    )
    if (!_.isEmpty(errors)) fail(errors.join(", "))
    return fun(args)
  }

export const flowedMapcat = _.flow(_.map, splat(cat))

export const sqrPost = condition1(
  validator("結果は数値である必要があります", _.isNumber),
)
