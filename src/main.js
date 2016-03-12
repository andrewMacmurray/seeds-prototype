"use strict";
const Board = require('./board.js');
const BoardMap = require('./board-map.js');
const Tiles = require('./tiles.js');
const setMouseIcons = require('./mouse.js');
Board.populateBoard();
// console.log(BoardMap.buildMap());

// let blue = '#92CAE3';
// let orange = '#F99F36';
setMouseIcons();
Tiles.setTiles('water', 'rain');
Tiles.setTiles('sunshine', 'sun');

(function() {
	const myEvents = ['load', 'resize'];
	const grid = document.getElementById('grid-container');

	const responsiveHeight = () => {
	   let height = window.innerHeight;
	   let margin = (height - grid.clientHeight) / 2;
	   grid.style.margin = margin + 'px auto';
	};

	myEvents.forEach(function(event) {
	   window.addEventListener(event, responsiveHeight, false);
	});
}());
