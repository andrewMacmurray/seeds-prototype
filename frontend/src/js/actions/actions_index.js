export const SET_DRAG = 'SET_DRAG'

export function setDrag (bool) {
  return {
    type: SET_DRAG,
    payload: bool
  }
}
