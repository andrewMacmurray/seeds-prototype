import { times } from 'ramda'

const row = (bool) => times(() => bool, 8)
const board = (bool) => times(() => row(bool), 8)

export const trueBoard = board(true)
export const falseBoard = board(false)
