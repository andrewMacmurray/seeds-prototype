(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
const buildMap = () => {
	var rows = document.getElementsByClassName('row');
	rows = [].slice.call(rows);
	var map = [];

	rows.forEach(function (row, i) {
		var items = row.childNodes;
		items = [].slice.call(items);
		var itemMap = items.map(function (item, j) {
			var data = {};
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

const setTiles = (type, color) => {
	var waterTotal = 0;
	var waterDragging = false;

	function setDragging(e) {
		e.target.className += ' small';
		waterTotal++;
		waterDragging = true;
	}

	function stopDragging() {
		waterDragging = false;
		waterTotal = 0;
	}

	function addWater(e) {
		if (waterDragging === true) {
			e.target.className += ' small';
			waterTotal++;
		}
		if (waterTotal === 5) {
			waterTotal = 0;
			document.body.style.backgroundColor = color;
			setTimeout(function () {
				document.body.style.backgroundColor = '#FFFCD5';
			}, 3500);
		}
	}

	var waterTiles = document.getElementsByClassName(type);
	for (var i = 0; i < waterTiles.length; i++) {
		var waterNode = waterTiles[i].parentNode;
		waterNode.addEventListener('mousedown', setDragging);
		waterNode.addEventListener('mouseup', stopDragging);
		waterNode.addEventListener('mouseenter', addWater);
	}
};

module.exports = {
	buildMap: buildMap,
	setTiles: setTiles
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

function makeRow() {
	var tiles = '';
	for (var i = 0; i < 8; i++) {
		tiles += makeTile();
	}
	return '<div class="row">' + tiles + '</div>';
}


function populateBoard() {
    var container = document.getElementById('grid-container');
    var rows = '';
	for (var i = 0; i < 8; i++) {
		rows += makeRow();
	}
    container.innerHTML = rows;
}

// populateBoard();

module.exports = {
	populateBoard: populateBoard
};

},{}],3:[function(require,module,exports){
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

},{"./board-map.js":1,"./board.js":2}]},{},[3]);
