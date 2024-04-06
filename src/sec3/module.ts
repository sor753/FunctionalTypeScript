import _ from "lodash"

export const globals: { [key in string]: any[] } = {}

const makeBindFun = (resolver: (stack: any[], v?: any) => any[]) => {
  return (k: keyof typeof globals, v?: any) => {
    let stack = globals[k] || []
    globals[k] = resolver(stack, v)
    return globals
  }
}

export const stackBinder = makeBindFun((stack, v) => {
  stack.push(v)
  return stack
})

export const stackUnbinder = makeBindFun((stack, _) => {
  stack.pop()
  return stack
})

export const dynamicLookup = (k: keyof typeof globals) => {
  const slot = globals[k] || []
  return _.last(slot)
}

export const f = () => dynamicLookup("a")
export const g = () => {
  stackBinder("a", "g")
  return f()
}

export const plucker = (field: string) => (obj: { [key in string]: any }) =>
  obj && obj[field]

export const complement = (pred: (...args: any[]) => boolean) => {
  return (...args: any[]) => !pred(...args)
}

export const isEven = (n: number) => n % 2 === 0
export const isOdd = complement(isEven)
