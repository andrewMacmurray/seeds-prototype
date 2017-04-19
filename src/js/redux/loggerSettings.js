module.exports = {
  collapsed: true,
  predicate: (getState, action) =>
    action.type !== 'CHECK_TILE' &&
    action.type !== 'WEATHER_POWER' &&
    action.type !== 'NOOP' &&
    typeof action !== 'function'
}
