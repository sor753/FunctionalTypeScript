import _ from "lodash"
import { existy, note } from "../sec1/module"
import { sqr } from "../sec5/module"

type Person = {
  setFirstName: (fn: string) => Person
  setLastName: (ln: string) => Person
  setAge: (a: number) => Person
  toString: () => string
}

export function createPerson(): Person {
  let firstName = ""
  let lastName = ""
  let age = 0

  return {
    setFirstName: function (fn: string): Person {
      firstName = fn
      return this
    },
    setLastName: function (ln: string): Person {
      lastName = ln
      return this
    },
    setAge: function (a: number): Person {
      age = a
      return this
    },
    toString: function (): string {
      return `${firstName} ${lastName}, ${age}`
    },
  }
}

export const pipline = (seed: any, ...fns: Function[]) => {
  return fns.reduce((acc, fn) => fn(acc), seed)
}

export const actions = (
  acts: ((state: any) => { state: any; answer: any })[],
  done: Function,
) => {
  return (seed: any) => {
    const init = { values: [], state: seed }
    const intermediate = acts.reduce((acc, act) => {
      const result = act(acc.state)
      const values = acc.values.concat(result.answer)
      return { values, state: result.state }
    }, init)
    const keep = intermediate.values.filter(existy)
    return done(keep, intermediate.state)
  }
}

export const mSqr = () => (state: any) => {
  const answer = sqr(state)
  return { answer, state: answer }
}

export const mNote = () => (state: any) => {
  note(state)
  return { answer: undefined, state }
}

export const mNeg = () => (state: any) => {
  return { answer: -state, state: -state }
}

export const lift = (answerFun: Function, stateFun?: Function) => {
  return (...args: any) =>
    (state: any) => {
      const answer = answerFun(state, ...args)
      const s = stateFun ? stateFun(state) : answer

      return { answer, state: s }
    }
}

export const mSqr2 = lift(sqr)
export const mNote2 = lift(note, _.identity)
export const mNeg2 = lift((n: number) => -n)

export const push = lift((stack: any, e: any) => [e, ...stack])
export const pop = lift(_.first, _.tail)
