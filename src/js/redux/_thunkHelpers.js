const { groupWith, map, is, complement, compose } = require('ramda')

const isFunction = is(Function)
const isNotFunction = complement(isFunction)
const groupWhereArgs = groupWith((a, b) => isFunction(a) && isNotFunction(b))

const groupHasArgs = (x) => x.length > 1
const callGroup = ([ fn, ...x ]) => fn(...x)

const callAction = (action) =>
  groupHasArgs(action)
    ? callGroup(action)
    : action[0]()

const groupAndDispatch = (dispatch) => compose(
  map(dispatch),
  map(callAction),
  groupWhereArgs
)

export const batch = (dispatch, actions) => () => groupAndDispatch(dispatch)(actions)

export const makeLazyDispatcher = (dispatch) => (action, ...x) => () => dispatch(action(...x))
