import _ from "lodash"
import {
  Container,
  freq,
  generateRandomCharacter,
  generateString,
  merge,
  rand,
  randString,
  skipTake,
} from "./module"
import { repeatedly } from "../sec4/module"

const sec7Modules = () => {
  // console.log(rand(100))
  // console.log(repeatedly(10, () => rand(10)))
  // console.log(
  //   _.take(
  //     repeatedly(100, () => rand(10)),
  //     5,
  //   ),
  // )

  // console.log(randString(0))
  // console.log(randString(1))
  // console.log(randString(10))

  // console.log(generateString(generateRandomCharacter, 20))

  // console.log(skipTake(2, [1, 2, 3, 4, 5, 6, 7, 8, 9]))
  // console.log(skipTake(3, _.range(20)))

  // console.log(freq([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3]))
  // const a = repeatedly(100, () => rand(2))
  // console.log(freq(a))
  // const copy = _.clone(a)
  // console.log(freq(copy))
  // console.log(_.isEqual(freq(a), freq(copy)))
  // console.log(_.isEqual(a, copy))

  // const person = { fname: "Simon" }
  // // _.extend(person, { lname: "Petrikov" }, { age: 28 }, { age: 108 })
  // merge(person, { lname: "Petrikov" }, { age: 28 }, { age: 108 })
  // console.log(person)

  const aNumber = new Container(42)
  console.log(aNumber)
  aNumber.update((n: number) => n + 1)
  console.log(aNumber)
  aNumber.update(
    (n: number, x: number, y: number, z: number) => n / x / y / z,
    1,
    2,
    3,
  )
  console.log(aNumber)
}

export default sec7Modules
