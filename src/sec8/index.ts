import _ from "lodash"
import {
  actions,
  createPerson,
  mNeg,
  mNeg2,
  mNote,
  mNote2,
  mSqr,
  mSqr2,
  pipline,
  pop,
  push,
} from "./module"
import { as, project, restrict } from "../sec2/module2"
import { curry2, sqr } from "../sec5/module"

const sec8Modules = () => {
  // console.log(
  //   createPerson()
  //     .setFirstName("Simon")
  //     .setLastName("Petrikov")
  //     .setAge(28)
  //     .toString(),
  // )

  const library = [
    { title: "SICP", isbn: "0262010771", ed: 1 },
    { title: "SICP", isbn: "0262510871", ed: 2 },
    { title: "Joy of Clojure", isbn: "1935182641", ed: 1 },
  ]
  // const titles = _.chain(library)
  //   // .tap((books) => console.log(books))
  //   .map((book) => book.title)
  // // console.log(sortByTitle)
  // console.log(titles.value())
  // const sortByTitle = _.chain(titles).sortBy()
  // console.log(sortByTitle.value())
  // console.log(library)

  // console.log(pipline())
  // console.log(pipline(42))
  // console.log(pipline(42, (n: number) => -n))

  const rest = (array: any[]) => [...array.slice(1)]
  const first = (array: any[]) => array[0]
  const fifth = (a: number[]) => pipline(a, rest, rest, rest, rest, first)
  // console.log(fifth([1, 2, 3, 4, 5])) // 5;

  const negativeFitth = (a: number[]) => pipline(a, fifth, (n: number) => -n)
  // console.log(negativeFitth([1, 2, 3, 4, 5])) // -5;

  const RQL = {
    select: curry2(project),
    as: curry2(as),
    where: curry2(restrict),
  }
  const firstEditions = (table: any[]) => {
    return pipline(
      table,
      RQL.as({ ed: "edition" }),
      RQL.select(["title", "edition", "isbn"]),
      RQL.where((book: any) => book.edition === 1),
    )
  }
  // const firstEditions = (table: any[]) => {
  //   return pipline(
  //     table,
  //     (t: any[]) => as(t, { ed: "edition" }),
  //     (t: any[]) => project(t, ["title", "edition", "isbn"]),
  //     (t: any[]) => restrict(t, (book: any) => book.edition === 1),
  //   )
  // }
  // console.log(firstEditions(library)) // [{ title: "SICP", isbn: "0262010771", edition: 1 }, { title: "Joy of Clojure", isbn: "1935182641", edition: 1 }];
  // const doubleSquareAction = actions([mSqr(), mSqr()], (value: number) => value)
  // console.log(doubleSquareAction(10)) // [100, 10000];

  // const negativeSqrAction = actions(
  //   [mSqr(), mNote(), mNeg()],
  //   (_: any, state: number) => state,
  // )
  // console.log(negativeSqrAction(9)) // -81;

  // const negativeSqrAction2 = actions(
  //   [mSqr2(), mNote2(), mNeg2()],
  //   (notUsed: any, state: number) => state,
  // )
  // console.log(negativeSqrAction2(7)) // -49;

  const stackAction = actions(
    [push(1), push(2), pop()],
    (values: any, _: any) => values,
  )
  // console.log(stackAction([]))

  console.log(
    pipline([], stackAction, _.chain).map((elem: any) => console.log(elem)),
  )
}

export default sec8Modules
