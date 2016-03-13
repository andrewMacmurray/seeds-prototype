(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
const buildMap = () => {
	let rows = document.getElementsByClassName('row');
	rows = [].slice.call(rows);
	let map = [];

	rows.forEach(function (row, i) {
		let items = row.childNodes;
		items = [].slice.call(items);
		let itemMap = items.map(function (item, j) {
			let data = {};
			if (item.firstChild.className === 'item seed') data.type = 'seed';
			if (item.firstChild.className === 'item water') data.type = 'water';
			if (item.firstChild.className === 'item sunshine') data.type = 'sunshine';
			if (item.firstChild.className === 'item seedling') data.type = 'seedling';
			data.coordinates = [i, j];
			return data;
		});
		map.push(itemMap);
		items.forEach(function (item, j) {
			item.classList.add('id=' + i + '.' + (j + 1));
		});
	});
	return map;
};

module.exports = {
	buildMap: buildMap,
};

},{}],2:[function(require,module,exports){
// the seed board should

// make a board of 8 x 8
// each seed should have a unique id (potentially mapped to an array)
// make a random color
// append its contents to the DOM

function randomColor() {
	var random = Math.random();
	if (random < 0.1) return 'seed';
	else if (random >= 0.25 && random < 0.5) return 'water';
	else if (random >= 0.5 && random < 0.99) return 'seedling';
	else return 'sunshine';
}

function makeTile() {
	return '<div class="col-2"><div class="item ' + randomColor() + '"></div></div>';
}

function makeColumn() {
	var tiles = '';
	for (var i = 0; i < 8; i++) {
		tiles += makeTile();
	}
	return '<div class="row">' + tiles + '</div>';
}


function populateBoard() {
    var container = document.getElementById('grid-container');
    var columns = '';
	for (var i = 0; i < 8; i++) {
		columns += makeColumn();
	}
    container.innerHTML = columns;
}

// populateBoard();

module.exports = {
	populateBoard: populateBoard
};

},{}],3:[function(require,module,exports){
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

const playButton = document.getElementById('play');
const track = document.getElementById('music');
track.pause();
playButton.addEventListener('click', () => {
	if (track.paused) track.play();
	else track.pause();
});

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

},{"./board-map.js":1,"./board.js":2,"./mouse.js":4,"./tiles.js":5}],4:[function(require,module,exports){
"use strict";

const cursorUp = (columns) => {
	columns.forEach(column => {
		column.classList.remove('mouseDown');
	})
}

const cursorDown = (columns) => {
	columns.forEach(column => {
		column.classList.add('mouseDown');
	})
}
const setMouseIcons = () => {
	const columns = [].slice.call(document.getElementsByClassName('col-2'));
	columns.forEach(column => {
		column.addEventListener('mousedown', () => {cursorDown(columns)});
		column.addEventListener('mouseup', () => {cursorUp(columns)});
	})
}

module.exports = setMouseIcons;

},{}],5:[function(require,module,exports){
"use strict";
const setTiles = (type, color) => {
	let counter = 0;
	let isDragging = false;
	let allTiles = [].slice.call(document.getElementsByClassName(type));
	let tilesArray = [];

	const setDragging = (e) => {
		e.preventDefault();
		tilesArray.push(e.target);
		e.target.className += ' small';
		counter++;
		isDragging = true;
	};

	const stopDragging = () => {
		isDragging = false;
		allTiles.forEach((tile) => {
			tile.classList.remove('small');
		});
		tilesArray = [];
		counter = 0;
	};

	const addWater = (e) => {
		if (isDragging === true && e.target.firstChild.className.indexOf('small') < 0) {
			tilesArray.push(e.target);
			e.target.firstChild.className += ' small';
			counter++;
		}
		if (counter === 5) {
			tilesArray.forEach((tile) => {
				tile.style.opacity = 0;
				setTimeout(() => {
					tile.style.display = 'none';
					if (tile.parentNode && tile.parentNode.className.indexOf('col-2') > -1) {
						tile.parentNode.style.display = 'none';
					}
				}, 500)
			});
			tilesArray = [];
			counter = 0;
			isDragging = false;
			document.body.classList.add(color);
			setTimeout(function () {
				document.body.classList.remove(color);
			}, 3500);
		}
	};

	// console.log(allTiles);
	for (let i = 0; i < allTiles.length; i++) {
		let tileNode = allTiles[i].parentNode;
		tileNode.addEventListener('mousedown', setDragging);
		document.addEventListener('mouseup', stopDragging);
		tileNode.addEventListener('mouseenter', addWater);
	}
};

module.exports = {
  setTiles: setTiles
};

},{}]},{},[3]);
