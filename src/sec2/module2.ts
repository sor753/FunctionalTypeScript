import _ from "lodash"

export const project = (table: any[], keys: string[]) => {
  return table.map((obj) => _.pick(obj, keys))
}

export const rename = (obj: any, newNames: any) => {
  return _.reduce(
    newNames,
    (o, nu, old) => {
      if (_.has(obj, old)) {
        o[nu] = obj[old]
        return o
      } else {
        return o
      }
    },
    _.omit(obj, _.keys(newNames)),
  )
}

export const as = (table: any[], newNames: any) => {
  return table.map((obj) => rename(obj, newNames))
}

export const restrict = (table: any[], pred: any) => {
  return table.filter(pred)
}
