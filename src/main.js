"use strict";
const Board = require('./board.js');
const BoardMap = require('./board-map.js');
Board.populateBoard();
console.log(BoardMap.buildMap());

let blue = '#92CAE3';
let orange = '#F99F36';
BoardMap.setTiles('water', blue);
BoardMap.setTiles('sunshine', orange);


var myEvents = ['load', 'resize'];
var grid = document.getElementById('grid-container');

var responsiveHeight = function() {
   var height = window.innerHeight;
   var margin = (height - grid.clientHeight) / 2;
   grid.style.margin = margin + 'px auto';
};

myEvents.forEach(function(event) {
   window.addEventListener(event, responsiveHeight, false);
});
