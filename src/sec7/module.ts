import _ from "lodash"
import { curry2, partial1 } from "../sec5/module"
import { repeatedly } from "../sec4/module"
import { as } from "../sec2/module2"

export const rand = partial1(_.random, 1)

export const randString = (len: number) => {
  const ascii = repeatedly(len, () => rand(36))

  return ascii.map((n) => n.toString(36)).join("")
}

export const generateRandomCharacter = () => {
  return rand(36).toString(36)
}
export const generateString = (charGen: () => any, len: number) => {
  return repeatedly(len, charGen).join("")
}

// 数値nと配列collを受け取り、collのインデックスがnの倍数の要素を取り出した新たな配列を返す
export const skipTake = (n: number, coll: any[]) => {
  let ret: any[] = []
  const sz = _.size(coll)
  for (let index = 0; index < sz; index += n) {
    ret.push(coll[index])
  }
  return ret
}

export const freq = curry2(_.countBy)(_.identity)

export const merge = (...objs: { [key: string]: any }[]) => {
  return { ...objs }
}

export class Container<T> {
  constructor(private _value: T) {}

  update(fun: Function, ...args: any[]) {
    const oldValue = this._value
    this._value = fun(oldValue, ...args)
    return this._value
  }
}
