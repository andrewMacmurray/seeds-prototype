const { groupWith, map, is, not, compose, prop } = require('ramda')

const isFunction = is(Function)
const isObject = is(Object)

const isNotFunction = compose(not, isFunction)
const groupWhereArgs = groupWith((a, b) => isFunction(a) && isNotFunction(b))
const containsArg = (x) => x.length > 1
const containsArgsObject = ([ _, x ]) => isObject(x) && prop('args', x) // eslint-disable-line

const callTuple = ([ fn, x ]) => fn(x)
const callWithArgsObj = ([ fn, { args } ]) => fn(...args)

const callAction = (action) => {
  if (containsArgsObject(action)) {
    return callWithArgsObj(action)
  }
  return containsArg(action)
    ? callTuple(action)
    : action[0]()
}

const groupAndDispatch = (dispatch) => compose(
  map(dispatch),
  map(callAction),
  groupWhereArgs
)

export const batch = (dispatch, actions) => () => groupAndDispatch(dispatch)(actions)

export const makeLazyDispatcher = (dispatch) => (actionCreator, x) => () =>
  dispatch(actionCreator(x))
