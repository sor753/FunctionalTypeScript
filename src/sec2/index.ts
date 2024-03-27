import _ from "lodash"
import {
  allOf,
  anyOf,
  average,
  cat,
  complement,
  construct,
  doubleAll,
  lyricSegment,
  mapcat,
  onlyEven,
  song,
} from "./module"
import { as, project, rename, restrict } from "./module2"

const sec2Modules = () => {
  // console.log(song(99, 0, lyricSegment))
  // const nums = [1, 2, 3, 4, 5]
  // console.log(doubleAll(nums)) // [2, 4, 6, 8, 10]
  // console.log(average(nums)) // 3
  // console.log(onlyEven(nums)) // [2, 4]
  // console.log(_.map({ a: 1, b: 2 }, _.identity))
  // console.log(allOf(1, true, "a"))
  // console.log(anyOf(0, null, undefined))
  // console.log(_.find([1, 2, 3, 4, 5, 6], (n) => n > 3))
  // console.log(_.find(["a", "b", 3, "x"], _.isNumber))
  // console.log(_.reject([1, 2, 3, 4, 5, 6], (n) => n % 2 === 0))
  // console.log(
  //   _.filter(
  //     [1, 2, 3, 4, 5, 6],
  //     complement((n) => n % 2 === 0),
  //   ),
  // )
  // console.log(_.every([1, 2, 3, 4], _.isNumber))
  // console.log(_.some([1, "a", 3, 4], _.isString))
  // const people = [
  //   { name: "Fred", age: 65 },
  //   { name: "Lucy", age: 36 },
  // ]
  // console.log(_.sortBy(people, (p) => p.age))
  // const albums = [
  //   { title: "Sabbath Bloody Sabbath", genre: "Metal" },
  //   { title: "Scientist", genre: "Dub" },
  //   { title: "Undertow", genre: "Metal" },
  // ]
  // console.log(_.groupBy(albums, (a) => a.genre))
  // console.log(_.countBy(albums, (a) => a.genre))
  // console.log(cat([1, 2, 3], [4, 5], [6, 7, 8]))
  // console.log(cat(null))
  // console.log(construct(42, [1, 2, 3]))
  // console.log(construct(null, [1, 2, 3]))
  console.log(mapcat((n) => construct(n, [","]), [1, 2, 3]))
  // const zombie = { name: "Bub", film: "Day of the Dead" }
  // console.log(_.keys(zombie))
  // console.log(_.values(zombie))
  // console.log(
  //   _.map(
  //     [
  //       { title: "Chthon", author: "Anthony" },
  //       { title: "Grendel", author: "Gardner" },
  //       { title: "After Dark" },
  //     ],
  //     _.property("author"),
  //   ),
  // )
  // console.log(_.toPairs(zombie))
  // console.log(
  //   _.fromPairs(
  //     _.map(_.toPairs(zombie), (pair) => [pair[0].toUpperCase(), pair[1]]),
  //   ),
  // )
  // console.log(_.invert(zombie))
  // console.log(_.keys(_.invert({ a: 138, b: 9 })))
  // const titles = _.map(
  //   [
  //     { title: "Chthon", author: "Anthony" },
  //     { title: "Grendel", author: "Gardner" },
  //     { title: "After Dark" },
  //   ],
  //   (obj) => _.defaults(obj, { author: "Unknown" }).title,
  // )
  // console.log(titles)
  // const person = { name: "Romy", token: "j3983ij", password: "tigress" }
  // console.log(_.omit(person, "token", "password"))
  // console.log(_.pick(person, "password", "token"))
  const library = [
    { title: "SICP", isbn: "0262010771", ed: 1 },
    { title: "SICP", isbn: "0262510871", ed: 2 },
    { title: "Joy of Clojure", isbn: "1935182641", ed: 1 },
  ]
  // console.log(_.find(library, { title: "SICP", ed: 1 }))
  // console.log(_.filter(library, { title: "SICP" })

  // const editionResults = project(library, ["title", "isbn"])
  // console.log(editionResults)
  // const isbnResults = project(library, ["isbn"])
  // console.log(isbnResults)
  // console.log(isbnResults.map((obj) => obj.isbn))

  // console.log(rename({ a: 1, b: 2 }, { a: "AAA" }))
  // console.log(as(library, { ed: "edition" }))
  // console.log(project(as(library, { ed: "edition" }), ["edition"]))
  // console.log(
  //   restrict(as(library, { ed: "edition" }), (book: any) => book.edition === 1),
  // )
}

export default sec2Modules
