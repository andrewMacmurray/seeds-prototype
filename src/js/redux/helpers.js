const { groupWith, map, type, equals, not, compose } = require('ramda')

const isFunction = (x) => equals('Function', type(x))
const isNotFunction = compose(not, isFunction)
const groupWhereArgs = groupWith((a, b) => isFunction(a) && isNotFunction(b))
const containsArgs = (x) => x.length > 1
const callTuple = ([ fn, x ]) => fn(x)
const callAction = (action) => containsArgs(action)
  ? callTuple(action)
  : action[0]()

const groupAndDispatch = (dispatch) => compose(
  map(dispatch),
  map(callAction),
  groupWhereArgs
)
export const batch = (dispatch, actions) => () => groupAndDispatch(dispatch)(actions)

export const makeLazyDispatcher = (dispatch) => (actionCreator, x) => () =>
  dispatch(actionCreator(x))
