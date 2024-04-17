import _ from "lodash"
import {
  CASClass,
  ContainerClass,
  HoleClass,
  TableBaseClass,
  deferredSort,
  force,
  lazyChain,
  polyToString,
  processTriples,
  validateTripleStore,
} from "./moudle"
import { Container } from "../sec7/module"

const sec9Modules = () => {
  const lazyOp = lazyChain([2, 1, 3])
    .invoke("concat", [7, 7, 8, 9])
    .invoke("sort")
  // console.log(lazyOp.force()) // [1, 2, 3, 7, 7, 8, 9];

  const deferredSorts = [
    [2, 1, 3],
    [7, 7, 1],
    [0, 9, 5],
  ].map(deferredSort)
  // console.log(deferredSorts)
  // console.log(deferredSorts.map(force))

  // console.log(
  //   validateTripleStore([
  //     [2, 1, 3],
  //     [7, 7, 1],
  //     [0, 9, 5],
  //   ]),
  // )
  // console.log(
  //   validateTripleStore([
  //     [2, 1, 3],
  //     [7, 7, 1],
  //     [0, 9, 5, 3],
  //   ]),
  // )

  // console.log(processTriples("[[2, 1, 3], [7, 7, 1], [0, 9, 5]]"))

  // console.log(polyToString([2, 3, 4]))
  // console.log(polyToString([1, 2, [3, 4]]))
  // console.log(polyToString("a"))
  // console.log(polyToString(1))
  // console.log(polyToString({ a: 1, b: 2 }))
  // console.log(polyToString([1, 2, { a: 1, b: 2, c: 3 }, 77]))
  // console.log(polyToString(new Container(_.range(5))))

  // console.log(new CASClass(1) instanceof HoleClass)
  // console.log(new TableBaseClass(1) instanceof HoleClass)
  // console.log(new HoleClass(1) instanceof CASClass)

  // const c = new ContainerClass(42)
  // console.log(c)

  const h = new HoleClass(42)
  h.observe(null)
  h.setValue(108)
  console.log(h)

  const c = new CASClass(42)
  c.swap(42, 108)
  console.log(c)
  // c.swap(42, 108)
}

export default sec9Modules
