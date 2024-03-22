import {
  dynamicLookup,
  f,
  g,
  globals,
  stackBinder,
  stackUnbinder,
} from "./module"

const sec3Modules = () => {
  stackBinder("a", 1)
  stackBinder("b", 100)
  console.log(dynamicLookup("a"))

  stackBinder("a", "*")
  console.log(dynamicLookup("a"))

  stackUnbinder("a")
  console.log(dynamicLookup("a"))

  console.log(globals)

  console.log(f())
  console.log(g())

  console.log(globals)
}

export default sec3Modules
