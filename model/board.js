"use strict";

const randomTile = () => {
  const rnd = Math.random();
  if (rnd < 0.2) return 1;
  if (rnd >= 0.2 && rnd < 0.4) return 2;
  if (rnd >= 0.4 && rnd < 0.6) return 3;
  if (rnd >= 0.6) return 4;
}

const buildBoard = (rows, columns) => {
  let board = [];
  for (let i = 0; i < rows; i++) {
    let row = [];
    for (let j = 0; j < columns; j++) {
      row.push(randomTile());
    }
    board.push(row);
  }
  return board;
}

const getNeighbours = (tile) => {
  let x = tile[0];
  let y = tile[1];
  return [
    [x, y - 1],
    [x, y + 1],
    [x - 1, y],
    [x + 1, y]
  ]
}


console.log(JSON.stringify(getNeighbours([1,2])));


let board = buildBoard(8, 8);
console.log(JSON.stringify(board));
