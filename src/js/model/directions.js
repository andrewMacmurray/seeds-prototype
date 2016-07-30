export const right = ([ x2, y2 ], [ x1, y1 ]) => x2 + 1 === x1 && y2 === y1
export const down = ([ x2, y2 ], [ x1, y1 ]) => x2 === x1 && y2 + 1 === y1
export const left = ([ x2, y2 ], [ x1, y1 ]) => x2 - 1 === x1 && y2 === y1
export const up = ([ x2, y2 ], [ x1, y1 ]) => x2 === x1 && y2 - 1 === y1
export const topRight = ([ x2, y2 ], [ x1, y1 ]) => x2 + 1 === x1 && y2 - 1 === y1
export const bottomRight = ([ x2, y2 ], [ x1, y1 ]) => x2 + 1 === x1 && y2 + 1 === y1
export const bottomLeft = ([ x2, y2 ], [ x1, y1 ]) => x2 - 1 === x1 && y2 + 1 === y1
export const topLeft = ([ x2, y2 ], [ x1, y1 ]) => x2 - 1 === x1 && y2 - 1 === y1
