import _ from "lodash"
import {
  condition,
  condition1,
  curry,
  curry2,
  curry3,
  dispatch,
  divPart,
  flowedMapcat,
  partial,
  partial1,
  partial2,
  performAdminCommand,
  performTrialCommand,
  stringReverse,
} from "./module"
import { always, invoker, validator } from "../sec4/module"
import { complement, song } from "../sec2/module"

const sec5Modules = () => {
  // const str = dispatch<string | any[]>(
  //   invoker("toString", Array.prototype.toString),
  //   invoker("toString", String.prototype.toString),
  // )
  // console.log(str("a"))
  // console.log(str(_.range(10)))
  // // console.log(str({}))
  // console.log(stringReverse("abc"))
  // // console.log(stringReverse(1))
  // const polyrev = dispatch(
  //   invoker("reverse", Array.prototype.reverse),
  //   stringReverse,
  // )
  // console.log(polyrev([1, 2, 3]))
  // console.log(polyrev("abc"))
  // const sillyReverse = dispatch(polyrev, always(42))
  // console.log(sillyReverse([1, 2, 3]))
  // console.log(sillyReverse("abc"))
  // console.log(sillyReverse(1000))
  // performAdminCommand({ type: "kill", hostname: "localhost" })
  // performAdminCommand({ type: "flail" })
  // performAdminCommand({ type: "notify", msg: "Hello" })
  // performTrialCommand({ type: "join", target: "foo" })
  // performTrialCommand({ type: "notify", msg: "Hi new user" })
  // console.log(["11", "11", "11", "11"].map(parseInt))
  // console.log(["11", "11", "11", "11"].map(curry(parseInt)))
  const div = (n: number, d: number) => n / d
  // const div10 = curry2(div)(10)
  // console.log(div10(50))
  // const plays = [
  //   { artist: "Burial", track: "Archangel" },
  //   { artist: "Ben Frost", track: "Stomp" },
  //   { artist: "Ben Frost", track: "Stomp" },
  //   { artist: "Burial", track: "Archangel" },
  //   { artist: "Emeralds", track: "Snores" },
  //   { artist: "Burial", track: "Archangel" },
  // ]
  // console.log(_.countBy(plays, (song) => [song.artist, song.track].join(" - ")))
  // const sonfToStoring = (song: { artist: string; track: string }) =>
  //   [song.artist, song.track].join(" - ")
  // const songCount = curry2(_.countBy)(sonfToStoring) // To implementing songCount, countBy songToStoring
  // console.log(songCount(plays))
  // const songPlayed = curry3(_.uniq)(false)(sonfToStoring)
  // console.log(songPlayed(plays))

  // const over10Part = divPart(10)
  // console.log(over10Part(5))

  // const over10Part1 = partial1(div, 10)
  // console.log(over10Part1(5))

  // const div10By2 = partial2(div, 10, 2)
  // console.log(div10By2())

  // const over10Partial = partial(div, 10)
  // console.log(over10Partial(2))

  // const div10By2By4By500 = partial(div, 10, 2, 4, 500)
  // console.log(div10By2By4By500()) // 4, 500 は無視される

  const zero = validator("0ではいけません", (n: number) => n === 0)
  const number = validator("引数は数値である必要があります", _.isNumber)
  const sqr = (n: number) => {
    if (!number(n)) throw new Error(number.message)
    if (zero(n)) throw new Error(zero.message)
    return n * n
  }
  console.log(sqr(10))
  // console.log(sqr(0))
  // console.log(sqr("10"))

  const sqrPre = condition1(
    validator("0ではいけません", complement(zero)),
    validator("引数は数値である必要があります", _.isNumber),
  )
  console.log(sqrPre(_.identity, 10))
  // console.log(sqrPre(_.identity, 0))
  // console.log(sqrPre(_.identity, "10"))

  const sqrPre2 = condition(
    validator("0ではいけません", complement(zero)),
    validator("引数は数値である必要があります", _.isNumber),
  )
  console.log(sqrPre2(_.identity, 10, 20))
  // console.log(sqrPre2(_.identity, 0, 10, 20))
  // console.log(sqrPre2(_.identity, "10", 20))

  const uncheckedSqr = (n: number) => n * n
  // console.log(uncheckedSqr(""))
  const checkedSqr = partial(sqrPre2, uncheckedSqr)
  console.log(checkedSqr(10))
  // console.log(checkedSqr(""))
  // console.log(checkedSqr(0))

  console.log("====================================")

  const isntString1 = (n: any) => !_.isString(n)
  console.log(isntString1(1))

  // _.negateとは、述語関数を受け取り、その否定を返す関数を返す
  const isntString2 = _.negate(_.isString)
  console.log(isntString2(1))

  const isntString3 = _.flow(_.isString, (x) => !x)
  console.log(isntString3(1))

  const not = (x: boolean) => !x
  const isntString4 = _.flow(_.isString, not)
  console.log(isntString4(1))

  console.log(
    flowedMapcat(
      [
        [1, 2],
        [3, 4],
        [5, 6],
      ],
      _.identity,
    ),
  )

  console.log("====================================")

  const sqrPost = condition1(
    validator("結果は数値である必要があります", _.isNumber),
    validator("結果はゼロではいけません", complement(zero)),
    validator("結果は正数である必要があります", (n: number) => n > 0),
  )
  console.log(sqrPost(_.identity, 10))
  // console.log(sqrPost(_.identity, 0))
  // console.log(sqrPost(_.identity, "10"))
  // console.log(sqrPost(_.identity, -1))

  const megaCheckedSqr = _.flow(checkedSqr, partial(sqrPost, checkedSqr))
  console.log(megaCheckedSqr(10))
  // console.log(megaCheckedSqr(""))
  // console.log(megaCheckedSqr(0))
  console.log(megaCheckedSqr(-1))
  // console.log(megaCheckedSqr(NaN))
}

export default sec5Modules
